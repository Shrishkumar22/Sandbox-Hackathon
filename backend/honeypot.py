def log_honeypot_attempt(sender: str, content: str):
    with open("logs/honeypot_attempts.log", "a") as f:
        f.write(f"Sender: {sender}\nContent: {content}\n\n")