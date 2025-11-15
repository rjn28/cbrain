#!/usr/bin/env python
"""
Mistral API wrapper for reasoning and report generation
"""
import os
from typing import Dict, Any
from dotenv import load_dotenv
from mistralai import Mistral

load_dotenv()

MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
MISTRAL_MODEL = os.getenv("MISTRAL_MODEL", "mistral-large-latest")


def get_mistral_client() -> Mistral:
    """Initialize and return Mistral client"""
    if not MISTRAL_API_KEY:
        raise ValueError("MISTRAL_API_KEY must be set in .env")
    
    return Mistral(api_key=MISTRAL_API_KEY)


def generate_report_analysis(
    collected_data: Dict[str, Any],
    user_idea: str
) -> Dict[str, Any]:
    """
    Use Mistral to analyze collected data and generate strategic insights
    Returns structured JSON matching the template format
    """
    client = get_mistral_client()
    
    # Format collected data for the prompt
    companies_info = []
    for company in collected_data.get('companies', []):
        company_str = f"""
Company: {company.get('name', 'Unknown')}
YC Description: {company.get('yc_listing', {}).get('description', 'N/A')}
Landing Page Hero: {company.get('landing_page', {}).get('hero_section', 'N/A')}
Value Proposition: {company.get('landing_page', {}).get('value_proposition', 'N/A')}
Strategic Insights: {len(company.get('google_insights', []))} articles found
"""
        companies_info.append(company_str)
    
    prompt = f"""You are an expert in business strategy and startup creation.

USER'S IDEA: "{user_idea}"

SIMILAR YC COMPANIES ANALYZED:
{''.join(companies_info)}

Based on this information about similar YC startups, generate a complete strategy in JSON format for the user's idea.

You must return ONLY a valid JSON object with this EXACT structure:

{{
  "vision": {{
    "problem": "Problem solved (15-20 words)",
    "solution": "Proposed solution (15-20 words)",
    "uniqueValue": "Unique value proposition (15-20 words)",
    "targetAudience": "Target audience (15-20 words)",
    "positioning": "Positioning vs competition (15-20 words)"
  }},
  "market": {{
    "marketSize": "Estimated market size (1-2 sentences)",
    "directCompetitors": ["Competitor 1", "Competitor 2", "Competitor 3"],
    "competitorWeaknesses": "Weaknesses of identified competitors (2-3 sentences)",
    "trends": "Relevant market trends (2-3 sentences)"
  }},
  "businessModel": {{
    "revenueModel": "Proposed revenue model (1-2 sentences)",
    "pricing": "Proposed pricing with justification (1-2 sentences)",
    "initialCosts": "Estimated initial costs (1-2 sentences)",
    "breakEvenPoint": "Estimated break-even point (1-2 sentences)"
  }},
  "product": {{
    "coreFeatures": ["Feature 1", "Feature 2", "Feature 3"],
    "userFlow": ["Step 1", "Step 2", "Step 3"],
    "design": "Design approach (1-2 sentences)",
    "techStack": "Recommended tech stack (1-2 sentences)"
  }},
  "planning": {{
    "step1": "First step (10-15 words)",
    "step2": "Second step (10-15 words)",
    "step3": "Third step (10-15 words)"
  }},
  "acquisition": {{
    "socialMedia": "Social media strategy (2-3 sentences)",
    "seo": "SEO strategy (2-3 sentences)",
    "partnerships": "Partnership strategy (2-3 sentences)",
    "advertising": "Advertising strategy (2-3 sentences)"
  }},
  "metrics": {{
    "keyMetrics": ["Metric 1", "Metric 2", "Metric 3"],
    "tools": ["Tool 1", "Tool 2"],
    "successThresholds": "Success thresholds defined (2-3 sentences)"
  }},
  "similarCompanies": [
    {{
      "name": "Name of similar YC company",
      "insights": "Key insights from this company (2-3 sentences)",
      "lessonsLearned": "Lessons learned applicable to our idea (2-3 sentences)"
    }}
  ]
}}

IMPORTANT:
- Return ONLY the JSON, nothing else
- Be concrete, actionable and professional
- Draw inspiration from similar YC companies but adapt to the specific idea
- The similarCompanies array must contain all 3 analyzed companies
- Write all content in English
"""
    
    try:
        # Use chat completion API
        # Try to use JSON mode if available (some Mistral models support it)
        try:
            response = client.chat.complete(
                model=MISTRAL_MODEL,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                response_format={"type": "json_object"}
            )
        except TypeError:
            # If response_format not supported, use regular call
            response = client.chat.complete(
                model=MISTRAL_MODEL,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
        
        content = response.choices[0].message.content
        
        # Clean content (remove markdown code blocks if present)
        import json
        import re
        
        # Remove markdown code blocks
        clean_content = re.sub(r'```json\n?', '', content)
        clean_content = re.sub(r'```\n?', '', clean_content)
        clean_content = clean_content.strip()
        
        # Remove control characters that break JSON parsing
        # Keep newlines and tabs but remove other control chars
        clean_content = re.sub(r'[\x00-\x08\x0b-\x0c\x0e-\x1f]', '', clean_content)
        
        # Try to find JSON object in the content if there's extra text
        json_match = re.search(r'\{.*\}', clean_content, re.DOTALL)
        if json_match:
            clean_content = json_match.group(0)
        
        try:
            return json.loads(clean_content)
        except json.JSONDecodeError as json_error:
            # If JSON parsing fails, try to fix common issues
            print(f"JSON parsing error: {json_error}")
            print(f"Content preview (first 500 chars): {clean_content[:500]}")
            
            # Try to fix escaped quotes and other common issues
            try:
                # Replace escaped newlines with actual newlines in strings
                fixed_content = clean_content.replace('\\n', '\n').replace('\\t', '\t')
                # Try parsing again
                return json.loads(fixed_content)
            except:
                # If still fails, raise original error with more context
                raise ValueError(f"Failed to parse JSON from Mistral response. Error: {json_error}. Content length: {len(clean_content)}")
        
    except Exception as e:
        print(f"Error generating report: {e}")
        raise

