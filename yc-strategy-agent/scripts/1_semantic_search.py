#!/usr/bin/env python
"""
Semantic search script to find 3 most relevant YC companies
"""
import sys
import json
from pathlib import Path

# Add parent directory to path to import lib
sys.path.insert(0, str(Path(__file__).parent.parent))

from lib.qdrant_client import search_similar_companies

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/1_semantic_search.py '<idea_pitch>'")
        print('Example: python scripts/1_semantic_search.py "AI-powered CRM for startups"')
        sys.exit(1)
    
    idea_pitch = sys.argv[1]
    
    print(f"Searching for companies similar to: '{idea_pitch}'...")
    
    try:
        results = search_similar_companies(idea_pitch, limit=3)
        
        if not results:
            print("No similar companies found.")
            sys.exit(0)
        
        print(f"\nFound {len(results)} similar companies:\n")
        for i, company in enumerate(results, 1):
            print(f"{i}. {company['name']}")
            print(f"   Description: {company['description']}")
            print(f"   Industry: {company['main_industry']}")
            print(f"   YC URL: {company['url']}")
            print(f"   Similarity Score: {company['similarity_score']:.4f}")
            print()
        
        # Also output as JSON for programmatic use
        print("\nJSON output:")
        print(json.dumps(results, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

