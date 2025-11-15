#!/usr/bin/env python
"""
Google Custom Search API wrapper for finding strategic insights
"""
import os
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
from googleapiclient.discovery import build
import time

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_SEARCH_ENGINE_ID = os.getenv("GOOGLE_SEARCH_ENGINE_ID")


def get_google_service():
    """Initialize Google Custom Search API service"""
    if not GOOGLE_API_KEY or not GOOGLE_SEARCH_ENGINE_ID:
        raise ValueError("GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID must be set in .env")
    
    return build("customsearch", "v1", developerKey=GOOGLE_API_KEY)


def search_strategic_insights(company_name: str, num_results: int = 5) -> List[Dict[str, Any]]:
    """
    Search for strategic insights about a company using Google Custom Search
    
    Searches for:
    - Go-to-market strategy
    - Growth strategy
    - How they started/launched
    - Business model insights
    """
    if not GOOGLE_API_KEY or not GOOGLE_SEARCH_ENGINE_ID:
        raise ValueError("Google API credentials not configured")
    
    service = get_google_service()
    
    # Search queries to find strategic insights
    search_queries = [
        f'"{company_name}" go-to-market strategy',
        f'"{company_name}" growth strategy',
        f'"{company_name}" how they started',
        f'"{company_name}" launch story',
        f'"{company_name}" business model'
    ]
    
    all_results = []
    seen_urls = set()
    
    for query in search_queries[:3]:  # Limit to 3 queries to avoid rate limits
        try:
            # Execute search
            result = service.cse().list(
                q=query,
                cx=GOOGLE_SEARCH_ENGINE_ID,
                num=min(num_results, 10)  # Google API max is 10 per request
            ).execute()
            
            # Process results
            if 'items' in result:
                for item in result['items']:
                    url = item.get('link', '')
                    # Avoid duplicates
                    if url not in seen_urls:
                        seen_urls.add(url)
                        all_results.append({
                            'title': item.get('title', ''),
                            'url': url,
                            'snippet': item.get('snippet', ''),
                            'query': query
                        })
            
            # Rate limiting - be respectful
            time.sleep(1)
            
        except Exception as e:
            print(f"Error searching for '{query}': {e}")
            continue
    
    # Limit total results
    return all_results[:num_results]


def extract_article_summary(url: str, mistral_client=None) -> Optional[str]:
    """
    Optionally fetch and summarize article content using Mistral
    This requires fetching the article HTML first
    """
    # This is optional - can be implemented later if needed
    # For now, we'll rely on Google snippets
    return None

