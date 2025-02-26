from transformers import pipeline

nlp_model = pipeline("text-classification", model="mrm8488/bert-mini-finetuned-phishing")

def analyze_email(email_subject: str):
    prediction = nlp_model(email_subject)
    return {"email": email_subject, "prediction": prediction}
