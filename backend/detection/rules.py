import re

# Define some basic regex-based scam indicators
SCAM_PATTERNS = [
    {
        "pattern": r"(gift\s?card|crypto|wire\s?transfer|western\s?union)",
        "scam_type": "Payment Request Scam",
        "reason": "Mentions untraceable payment methods like gift cards or crypto.",
    },
    {
        "pattern": r"(micorsoft|gooogle|netfliix|applejobs@|hr@paypal-careers\.net)",
        "scam_type": "Fake Company/Domain Scam",
        "reason": "Uses fake brand names or scammy-looking email domains.",
    },
    {
        "pattern": r"(urgent|act\s?now|final\s?notice|limited\s?time)",
        "scam_type": "Urgency Scam",
        "reason": "Tries to pressure you with urgency or deadlines.",
    },
    {
        "pattern": r"(selected|shortlisted|you['’]?ve\s+been\s+chosen|guaranteed\s+job)",
        "scam_type": "Job Offer Scam",
        "reason": "Claims you've been selected or guaranteed a job.",
    },
    {
        "pattern": r"(background\s?check\s?fee|processing\s?fee|registration\s?payment)",
        "scam_type": "Application Fee Scam",
        "reason": "Asks for payment during hiring or application.",
    },
]

def detect_scam(email_text: str) -> dict:
    email_text_lower = email_text.lower()
    
    for rule in SCAM_PATTERNS:
        if re.search(rule["pattern"], email_text_lower):
            return {
                "is_scam": True,
                "scam_type": rule["scam_type"],
                "explanation": rule["reason"],
                "scammer_script": generate_scammer_voice(email_text),
                "safe_script": generate_safe_explainer(rule["reason"]),
            }

    return {
        "is_scam": False,
        "scam_type": None,
        "explanation": "No common scam patterns detected.",
        "scammer_script": "",
        "safe_script": "",
    }

def generate_scammer_voice(text: str) -> str:
    return f"Hello, this is HR from a prestigious company. {text.strip()} Please respond quickly!"

def generate_safe_explainer(reason: str) -> str:
    return f"This message appears to be a scam. Why? {reason} Always verify the sender and never send money or personal info in response to unsolicited emails."