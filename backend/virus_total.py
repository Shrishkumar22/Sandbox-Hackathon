import requests
VIRUSTOTAL_API_KEY = "6aa94383ffaf2cde2b3bfda32d1b6e368abf7f29126af880857c14861533124c"

def check_url(url: str):
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    response = requests.get(f"https://www.virustotal.com/api/v3/urls/{url}", headers=headers)
    return response.json()