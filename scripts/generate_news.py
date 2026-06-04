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
    You are a Lead Economic Strategist and Chief Editor for 'Global EcoNews'.
    Generate exactly 3 highly sophisticated world economic news reports for {today} in both Korean ('ko') and English ('en').
    
    CRITICAL CONTENT REQUIREMENTS:
    1. SUMMARY: Minimum 350-400 characters.
    2. EXPERT INSIGHT: Strategic Alpha commentary explaining structural implications.
    3. MARKET IMPACT: Score (1-10), Directional Bias, and Label.
    4. GLOSSARY: 2 advanced financial terms with definitions.
    
    Context: {json.dumps(recent_context, ensure_ascii=False)}
    
    Output format:
    {{
        "{today}": {{
            "ko": [
                {{
                    "category": "Macro|Tech|Energy|Finance|Trade|Stocks|RealEstate",
                    "date": "{today}",
                    "title": "Headline",
                    "summary": "Deep summary...",
                    "insight": "Strategic analysis...",
                    "impact": {{ "score": 8, "bias": "Bearish", "label": "Volatility Alert" }},
                    "readTime": "8 min read",
                    "glossary": {{ "Term": "Definition" }}
                }},
                ... (exactly 3 items)
            ],
            "en": [ ... same 3 items ... ]
        }}
    }}
    Return ONLY the raw JSON object.
    """
    
    # Diagnostic: List available models
    print("--- DIAGNOSTIC: AVAILABLE MODELS START ---")
    try:
        available_models = []
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"Available: {m.name}")
                available_models.append(m.name.replace('models/', ''))
        
        # If our list is empty, let's use what we found
        if available_models:
            models_to_try = available_models
    except Exception as diag_e:
        print(f"Could not list models: {diag_e}")
    print("--- DIAGNOSTIC: AVAILABLE MODELS END ---")
    
    response = None
    success_model = None
    
    for model_name in models_to_try:
        try:
            print(f"Attempting with model: {model_name}...")
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(prompt)
            if response and response.text:
                success_model = model_name
                break
        except Exception as e:
            print(f"Model {model_name} failed or not found. Trying next...")
            continue
            
    if not response or not success_model:
        print("Error: All attempted models failed. Please check your API key permissions.")
        exit(1)

    try:
        print(f"Successfully generated news using {success_model}")
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
        import traceback
        print("--- ERROR DETAIL START ---")
        print(f"Error Type: {type(e).__name__}")
        print(f"Error Message: {e}")
        traceback.print_exc()
        print("--- ERROR DETAIL END ---")
        exit(1)

if __name__ == "__main__":
    generate_news()
