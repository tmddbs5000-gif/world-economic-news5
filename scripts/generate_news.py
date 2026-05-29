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
    
    # Prepare prompt
    recent_dates = sorted(data.keys(), reverse=True)[:5]
    recent_context = {date: data[date] for date in recent_dates}
    
    prompt = f"""
    You are a Lead Economic Strategist and Chief Editor for 'Global EcoNews', a premium financial intelligence platform.
    Generate 3 highly sophisticated world economic news reports for {today} in both Korean ('ko') and English ('en').
    
    THESE REPORTS MUST EXCEED STANDARD NEWS AGGREGATION QUALITY.
    
    CRITICAL CONTENT REQUIREMENTS:
    1. SUMMARY: Minimum 350-400 characters. Must include specific (hypothetical 2026) metrics, percentages, and institutional names (e.g., 'The ECB's Governing Council', 'NVIDIA's Blackwell-2 roadmap').
    2. EXPERT INSIGHT: This is NOT a summary. It is a 'Strategic Alpha' commentary. Explain the structural implications, potential second-order effects on global liquidity, and specific sector rotations for portfolio managers.
    3. MARKET IMPACT: Assign a score from 1-10 for 'Volatility Potential' and a 'Directional Bias' (Bullish/Bearish/Neutral).
    4. GLOSSARY: Provide 2 advanced financial terms with rigorous definitions.
    
    Context of recent events:
    {json.dumps(recent_context, ensure_ascii=False, indent=2)}
    
    Output format: JSON object for {today} only.
    {{
        "{today}": {{
            "ko": [
                {{
                    "category": "Macro|Tech|Energy|Finance|Trade|Stocks|RealEstate",
                    "date": "{today}",
                    "title": "Sophisticated Headline",
                    "summary": "Deep contextual summary...",
                    "insight": "High-level strategic analysis...",
                    "impact": {{ "score": 8, "bias": "Bearish", "label": "Volatility Alert" }},
                    "readTime": "8 min read",
                    "glossary": {{ "Term": "Advanced Definition" }}
                }},
                ... (exactly 3 items)
            ],
            "en": [ ... same 3 items ... ]
        }}
    }}
    
    Return ONLY the raw JSON object.
    """
    
    response = model.generate_content(prompt)
    try:
        json_text = response.text.strip()
        if json_text.startswith("```json"):
            json_text = json_text[7:-3].strip()
        elif json_text.startswith("```"):
            json_text = json_text[3:-3].strip()
            
        new_entry = json.loads(json_text)
        
        # Merge data (Overwrite today's entry to ensure high quality)
        data.update(new_entry)
        
        # Sort by date descending
        sorted_data = dict(sorted(data.items(), key=lambda x: x[0], reverse=True))
        
        with open('news-data.json', 'w', encoding='utf-8') as f:
            json.dump(sorted_data, f, ensure_ascii=False, indent=4)
            
        print(f"Successfully generated high-value intelligence for {today}")
        
    except Exception as e:
        print(f"Error: {e}")
        print("Response was:", response.text)

if __name__ == "__main__":
    generate_news()
