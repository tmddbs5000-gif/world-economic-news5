import os
import json
import datetime
import google.generativeai as genai

# Setup
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("Error: GEMINI_API_KEY is not set in environment variables.")
    exit(1)

genai.configure(api_key=api_key)
# Use gemini-1.5-flash for better availability and speed
model = genai.GenerativeModel('gemini-1.5-flash')

def get_kst_today():
    # Return date in YYYY-MM-DD format for KST
    now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9)))
    return now.strftime("%Y-%m-%d")

def generate_news():
    today = get_kst_today()
    
    # Read existing data
    try:
        with open('news-data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error reading news-data.json: {e}")
        exit(1)
    
    # Prepare prompt
    recent_dates = sorted(data.keys(), reverse=True)[:5]
    recent_context = {date: data[date] for date in recent_dates}
    
    prompt = f"""
    Generate 3 world economic news reports for {today} in both Korean ('ko') and English ('en').
    Output format: JSON object for {today} only.
    Return ONLY the raw JSON object.
    """
    
    try:
        response = model.generate_content(prompt)
        if not response.text:
            print("Error: Empty response from Gemini API.")
            exit(1)
            
        json_text = response.text.strip()
        if json_text.startswith("```json"):
            json_text = json_text[7:-3].strip()
        elif json_text.startswith("```"):
            json_text = json_text[3:-3].strip()
            
        new_entry = json.loads(json_text)
        data.update(new_entry)
        sorted_data = dict(sorted(data.items(), key=lambda x: x[0], reverse=True))
        
        with open('news-data.json', 'w', encoding='utf-8') as f:
            json.dump(sorted_data, f, ensure_ascii=False, indent=4)
            
        print(f"Successfully generated news for {today}")
        
    except Exception as e:
        print(f"Error during news generation: {e}")
        if hasattr(e, 'message'): print(e.message)
        exit(1)

if __name__ == "__main__":
    generate_news()
