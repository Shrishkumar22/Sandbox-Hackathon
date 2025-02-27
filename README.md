# AI-Powered Honeypot for Phishing Attacks

## Overview
This project is an AI-driven honeypot designed to detect phishing attacks in real-time. It integrates email monitoring, phishing detection using AI, and honeypot email traps to capture malicious attempts. The project is developed as a prototype for the SANDBOX national-level cybersecurity hackathon hosted by Aegis.

## Features
- **Real-time Email Analysis**: Fetches emails via IMAP and analyzes them for phishing threats.
- **AI-Based Phishing Detection**: Uses a deep learning model (DCNN + LSTM + SVM + Random Forest) for classification.
- **Honeypot Email Trap**: Identifies targeted phishing attempts and logs them for analysis.
- **VirusTotal API Integration**: Checks suspicious links and attachments.
- **Slack/Telegram Bot Notifications**: Alerts security teams with actionable threat reports.
- **Web Dashboard**: Provides insights into phishing attempts and threat intelligence.

## Tech Stack
- **Backend**: Python, FastAPI
- **Machine Learning**: TensorFlow, Hugging Face
- **Email Processing**: IMAP API
- **Threat Intelligence**: VirusTotal API
- **Database**: PostgreSQL / Supabase
- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Deployment**: Docker, AWS/GCP (Optional)

## Installation
### **1. Clone the repository**
```sh
git clone https://github.com/your-repo/sandbox-hackathon.git
cd sandbox-hackathon
```
### **2. Set up virtual environment (Backend)**
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
### **3. Configure Environment Variables**
Create a `.env` file in the root directory and add:
```env
IMAP_SERVER=imap.gmail.com
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
VIRUSTOTAL_API_KEY=your-api-key
DATABASE_URL=your-database-url
```

### **4. Run the Backend**
```sh
uvicorn app.main:app --reload
```

### **5. Set up and Run Frontend**
```sh
cd frontend
npm install
npm run dev
```

## Usage
- Monitor phishing emails in real-time.
- Receive alerts on suspicious emails.
- View reports on the web dashboard.

## Contributing
1. Fork the repository
2. Create a new branch (`feature-name`)
3. Commit your changes
4. Push to your branch and submit a PR

## License
MIT License

## Contact
For queries, reach out to `your-email@example.com`

