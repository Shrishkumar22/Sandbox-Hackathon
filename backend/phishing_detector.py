import pickle
import torch
from backend.utils.preprocess import preprocess_email

MODEL_PATH = "models/phishing_model.pkl"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def predict_email(content: str):
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    processed_content = preprocess_email(content)
    prediction = model.predict([processed_content])
    return prediction[0] == 1