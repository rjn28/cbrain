#!/usr/bin/env python
"""
Google search script to find strategic insights about companies
"""
import sys
import json
from pathlib import Path

# Add parent directory to path to import lib
sys.path.insert(0, str(Path(__file__).parent.parent))

from lib.google_search import search_strategic_insights

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/4_google_search.py '<company_name>' [num_results]")
        print('Example: python scripts/4_google_search.py "DoorDash" 5')
        sys.exit(1)
    
    company_name = sys.argv[1]
    num_results = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    
    print(f"Searching for strategic insights about: '{company_name}'...")
    
    try:
        results = search_strategic_insights(company_name, num_results=num_results)
        
        if not results:
            print("No results found.")
            sys.exit(0)
        
        print(f"\nFound {len(results)} strategic insights:\n")
        for i, result in enumerate(results, 1):
            print(f"{i}. {result['title']}")
            print(f"   URL: {result['url']}")
            print(f"   Snippet: {result['snippet'][:200]}...")
            print(f"   Query: {result['query']}")
            print()
        
        # Also output as JSON
        print("\nJSON output:")
        print(json.dumps(results, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

