from slack_sdk import WebClient
import os
from dotenv import load_dotenv

load_dotenv()

SLACK_TOKEN = os.getenv("SLACK_TOKEN")
client = WebClient(token=SLACK_TOKEN)

def send_alert(message):
    response = client.chat_postMessage(channel="#security-alerts", text=message)
    return response
