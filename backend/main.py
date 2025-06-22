# --- Built-in & external imports ---
import os
import base64
from dotenv import load_dotenv
import anthropic

from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import JSONResponse
from grpc import StatusCode as Status

# --- Internal logic import ---
from detection.rules import detect_scam

# --- Load environment variables ---
load_dotenv()
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
print("🔑 API Key loaded:", ANTHROPIC_API_KEY[:6] if ANTHROPIC_API_KEY else "❌ NOT FOUND")

# --- FastAPI app setup ---
app = FastAPI()

# --- CORS middleware (for frontend to talk to backend) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Route: Analyze plain email text ---
print("Now analyzing text")
@app.post("/analyze")
async def analyze_email(request: Request):
    data = await request.json()
    email_text = data.get("email_text", "")
    result = detect_scam(email_text)
    return result

# --- Route: Analyze image of email (Claude Vision) ---
print("Now looking at image")
@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    print(f"📥 Received file: {file.filename}, type: {file.content_type}")

    # Read and encode image to base64
    image_bytes = await file.read()
    image_base64 = base64.b64encode(image_bytes).decode("utf-8")
    print(f"🧵 Base64 string length: {len(image_base64)}")

    print("🔑 API Key present:", bool(ANTHROPIC_API_KEY))

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

@app.post("/")
async def handle_vapi_webhook(request: Request):
    body = await request.json()
    message = body.get("message", {})
    call = message.get("call", {})
    call_id = call.get("id")

    if not call_id:
        return JSONResponse(status_code=Status.HTTP_400_BAD_REQUEST, content={})

    event_type = body.get("type")

    if event_type in ["conversation-update", "speech-update", "status-update"]:
        artifact = message.get("artifact", {})
        messages = artifact.get("messages", [])
        extracted = [
            {"role": msg.get("role"), "context": msg.get("message")}
            for msg in messages
        ]
        print("📬 Received request:", extracted)

    elif event_type == "end-of-call-report":
        summary = message.get("summary")
        print(f"✅ Summary for {call_id}:\n{summary}")

    return JSONResponse(status_code=Status, content={})

print("DONE")