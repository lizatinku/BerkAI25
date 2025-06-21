# --- Built-in & external imports ---
import os
import base64
from dotenv import load_dotenv
import httpx

from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

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

    # Claude Vision prompt
    payload = {
        "model": "claude-3-sonnet-20240229",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": file.content_type,
                            "data": image_base64
                        }
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
                ]
            }
        ],
        "max_tokens": 1000,
    }

    headers = {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
    }

    print("🔑 API Key present:", bool(ANTHROPIC_API_KEY))
    print("📦 Sending request to Claude...")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.anthropic.com/v1/messages",
                json=payload,
                headers=headers
            )

        print("✅ Response status:", response.status_code)
        print("🪵 Raw response text (truncated):", response.text[:500])

        claude_reply = response.json()
        text = claude_reply["content"][0]["text"]
        print("🎯 Parsed response:\n", text)

        return {"claude_output": text}

    except Exception as e:
        print("❌ Error during Claude request or parsing:", str(e))
        return {
            "error": "Failed to contact or parse response from Claude.",
            "raw_response": response.text if 'response' in locals() else "No response"
        }
    
print("DONE")
