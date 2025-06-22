# --- Built-in & external imports ---
import os
import base64
from dotenv import load_dotenv
import anthropic

from fastapi import FastAPI, Request, UploadFile, File, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from http import HTTPStatus
from pydantic import BaseModel

import requests

class Message(BaseModel):
    role: str
    content: str

# --- Load environment variables ---
load_dotenv()
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
print("🔑 API Key loaded:", ANTHROPIC_API_KEY[:6] if ANTHROPIC_API_KEY else "❌ NOT FOUND")

# --- FastAPI app setup ---
app = FastAPI()

# --- CORS middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Placeholder for detect_scam logic ---
def detect_scam(text):
    # Replace with real scam detection logic
    return {"is_scam": True, "type": "phishing", "explanation": "Fake link", "safe_script": "Never click unknown links."}

# --- Analyze plain email text ---
@app.post("/analyze")
async def analyze_email(request: Request):
    data = await request.json()
    email_text = data.get("email_text", "")
    result = detect_scam(email_text)
    return result

# --- Analyze image of email using Claude Vision ---
@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    print(f"📥 Received file: {file.filename}, type: {file.content_type}")
    image_bytes = await file.read()
    image_base64 = base64.b64encode(image_bytes).decode("utf-8")
    print(f"🧵 Base64 string length: {len(image_base64)}")

    try:
        client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        message = client.messages.create(
            model="claude-opus-4-20250514",
            max_tokens=1000,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": file.content_type,
                                "data": image_base64,
                            },
                        },
                        {
                            "type": "text",
                            "text": (
                                "This is a screenshot of an email. "
                                "Determine if it's a scam. "
                                "If it is, explain why, classify the type, and write:"
                                "\n1. is_scam: true/false"
                                "\n2. scam_type"
                                "\n3. explanation"
                                "\n4. scammer_script (scammy version)"
                                "\n5. safe_script (friendly explainer)"
                            )
                        }
                    ],
                }
            ],
        )

        print("📝 Claude response:", message.content[0].text)
        return {"claude_output": message.content[0].text}

    except Exception as e:
        print("❌ Error during Claude SDK call:", str(e))
        return {
            "error": "Failed to contact or parse response from Claude.",
            "raw_response": str(e)
        }

# --- WebSocket Client Store ---
clients = set()

# --- Broadcast helper ---
async def broadcast(msg: dict):
    disconnected = set()
    for ws in clients:
        try:
            await ws.send_json(msg)
        except Exception as e:
            print(f"WebSocket send error: {e}")
            disconnected.add(ws)
    clients.difference_update(disconnected)

# --- VAPI Webhook Handler ---
@app.post("/")
async def handle_vapi_webhook(request: Request):
    body = await request.json()
    message = body.get("message", {})
    call = message.get("call", {})
    call_id = call.get("id")

    if not call_id:
        return JSONResponse(status_code=HTTPStatus.BAD_REQUEST, content={})

    event_type = message.get("type")

    if event_type in ["conversation-update", "speech-update", "status-update"]:
        artifact = message.get("artifact", {})
        messages = artifact.get("messages", [])
        extracted = {
            msg["role"]: msg["message"]
            for msg in messages
            if msg.get("role") != "system"
        }

        print("📬 Received request:", extracted)
        requests.post(
            "http://38bf-2607-f140-6000-803a-a17f-9071-74cd-177b.ngrok-free.app/api/new-message",
            json=extracted,
            timeout=10
        )

        await broadcast(extracted)

    elif event_type == "end-of-call-report":
        summary = message.get("summary")
        print(f"✅ Summary for {call_id}:\n{summary}")
        await broadcast({
            "role": "bot",
            "content": f"📞 End-of-call summary:\n{summary}"
        })

    return JSONResponse(status_code=HTTPStatus.OK, content={})

# --- WebSocket Endpoint ---
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.add(websocket)
    try:
        while True:
            await websocket.receive_text()
    except Exception:
        clients.discard(websocket)

@app.post("/api/new-message")
async def new_message(request: Request):
    try:
        payload = await request.json()
        print("DEBUG: raw payload:", payload)

        # Optional: validate manually for now
        role = payload.get("role")
        content = payload.get("content")
        if not role or not content:
            return JSONResponse(status_code=400, content={"error": "Missing role or content"})

        # If you want to convert to Pydantic model:
        message = Message(role=role, content=content)
        print("Validated message:", message)

        return {"ok": True, "received": message.dict()}

    except Exception as e:
        print("Error in /api/new-message:", e)
        return JSONResponse(status_code=400, content={"error": str(e)})


print("✅ Backend server is running.")
