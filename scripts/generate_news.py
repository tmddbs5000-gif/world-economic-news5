import os
import json
import datetime
import google.generativeai as genai

# Setup
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-pro')

def get_kst_today():
    # Return date in YYYY-MM-DD format for KST
    now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9)))
    return now.strftime("%Y-%m-%d")

def generate_news():
    today = get_kst_today()
    
    # Read existing data to provide context
    with open('news-data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if today in data:
        print(f"News for {today} already exists. Skipping.")
        return

    # Prepare prompt
    recent_dates = sorted(data.keys(), reverse=True)[:3]
    recent_context = {date: data[date] for date in recent_dates}
    
    prompt = f"""
    You are an expert economic journalist. Generate world economic news for {today} in both Korean ('ko') and English ('en').
    The news should be realistic for the year 2026, following the narrative of the recent news provided below.
    
    Recent news context:
    {json.dumps(recent_context, ensure_ascii=False, indent=2)}
    
    Output format must be a JSON object for the single date {today} only, like this:
    {{
        "{today}": {{
            "ko": [
                {{
                    "category": "category_name",
                    "date": "{today}",
                    "title": "title",
                    "summary": "summary",
                    "insight": "strategic_insight",
                    "readTime": "X min read",
                    "glossary": {{ "term": "definition" }}
                }},
                ... (provide exactly 3 items)
            ],
            "en": [
                ... (same 3 items in English)
            ]
        }}
    }}
    
    Categories: 거시경제(Macro), 기술/산업(Tech), 에너지/ESG(Energy), 금융시장(Finance), 글로벌 무역(Trade), 주식 시장(Stocks), 부동산(Real Estate).
    Ensure the latest news is relevant and insightful.
    Return ONLY the raw JSON object.
    """
    
    response = model.generate_content(prompt)
    try:
        # Clean response text in case it includes markdown backticks
        json_text = response.text.strip()
        if json_text.startswith("```json"):
            json_text = json_text[7:-3].strip()
        elif json_text.startswith("```"):
            json_text = json_text[3:-3].strip()
            
        new_entry = json.loads(json_text)
        
        # Merge data (Prepend today's news)
        updated_data = {**new_entry, **data}
        
        with open('news-data.json', 'w', encoding='utf-8') as f:
            json.dump(updated_data, f, ensure_ascii=False, indent=4)
            
        print(f"Successfully updated news for {today}")
        
    except Exception as e:
        print(f"Error parsing or saving news: {e}")
        print("Response was:", response.text)

if __name__ == "__main__":
    generate_news()
