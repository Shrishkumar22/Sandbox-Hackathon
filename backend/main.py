from fastapi import FastAPI, HTTPException
import imaplib, email, re, os
import requests
from email.header import decode_header
from transformers import pipeline
from dotenv import load_dotenv
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

load_dotenv()  # Load API keys

app = FastAPI()

# Load environment variables
IMAP_SERVER = os.getenv("IMAP_SERVER")
IMAP_EMAIL = os.getenv("IMAP_EMAIL")
IMAP_PASSWORD = os.getenv("IMAP_PASSWORD")
VIRUSTOTAL_API_KEY = os.getenv("VIRUSTOTAL_API_KEY")
SLACK_BOT_TOKEN = os.getenv("SLACK_BOT_TOKEN")
SLACK_CHANNEL_ID = os.getenv("SLACK_CHANNEL_ID")

# Initialize AI Model (Hugging Face NLP for Phishing Detection)
phishing_detector = pipeline("text-classification", model="textattack/bert-base-uncased-imdb")

# Initialize Slack Client
slack_client = WebClient(token=SLACK_BOT_TOKEN)

# IMAP Email Fetching Function
def fetch_latest_email():
    try:
        mail = imaplib.IMAP4_SSL(IMAP_SERVER)
        mail.login(IMAP_EMAIL, IMAP_PASSWORD)
        mail.select("inbox")
        
        _, messages = mail.search(None, "ALL")
        latest_email_id = messages[0].split()[-1]
        
        _, msg_data = mail.fetch(latest_email_id, "(RFC822)")
        raw_email = msg_data[0][1]
        
        msg = email.message_from_bytes(raw_email)
        subject, encoding = decode_header(msg["Subject"])[0]
        if isinstance(subject, bytes):
            subject = subject.decode(encoding or "utf-8")
        
        sender = msg.get("From")
        body = ""
        
        if msg.is_multipart():
            for part in msg.walk():
                content_type = part.get_content_type()
                if "text/plain" in content_type:
                    body = part.get_payload(decode=True).decode()
                    break
        else:
            body = msg.get_payload(decode=True).decode()
        
        mail.logout()
        return {"subject": subject, "sender": sender, "body": body}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# URL Scanner (VirusTotal)
def scan_url(url):
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    response = requests.get(f"https://www.virustotal.com/api/v3/urls/{url}", headers=headers)
    if response.status_code == 200:
        return response.json()
    return {"error": "Unable to scan URL"}

# Threat Detection Route
@app.get("/analyze_email")
def analyze_email():
    email_data = fetch_latest_email()
    
    phishing_result = phishing_detector(email_data["body"])
    confidence = phishing_result[0]["score"]

    # Extract URLs
    urls = re.findall(r'(https?://\S+)', email_data["body"])
    url_reports = [scan_url(url) for url in urls]

    threat_report = {
        "email_subject": email_data["subject"],
        "email_sender": email_data["sender"],
        "phishing_confidence": confidence,
        "urls": urls,
        "url_analysis": url_reports
    }

    # Send to Slack
    slack_message = f"""
    🚨 **Phishing Alert** 🚨
    - **Subject:** {email_data["subject"]}
    - **Sender:** {email_data["sender"]}
    - **Confidence:** {confidence * 100:.2f}%
    - **URLs Found:** {", ".join(urls) if urls else "None"}
    """
    try:
        slack_client.chat_postMessage(channel=SLACK_CHANNEL_ID, text=slack_message)
    except SlackApiError as e:
        print(f"Slack API Error: {e}")

    return threat_report
