#!/usr/bin/env python
"""
Quick test script to verify Qdrant collection and search functionality
"""
import sys
from pathlib import Path

# Add parent directory to path to import lib
sys.path.insert(0, str(Path(__file__).parent.parent))

from lib.qdrant_client import get_qdrant_client, COLLECTION_NAME

def test_collection():
    """Test that collection exists and has data"""
    print("=" * 60)
    print("Testing Qdrant Collection")
    print("=" * 60)
    
    client = get_qdrant_client()
    
    # Check if collection exists
    if not client.collection_exists(collection_name=COLLECTION_NAME):
        print(f"❌ Collection '{COLLECTION_NAME}' does not exist!")
        return False
    
    print(f"✅ Collection '{COLLECTION_NAME}' exists")
    
    # Get collection info
    collection_info = client.get_collection(COLLECTION_NAME)
    print(f"   Points count: {collection_info.points_count}")
    print(f"   Vectors count: {collection_info.vectors_count}")
    print(f"   Status: {collection_info.status}")
    
    if collection_info.points_count == 0:
        print("⚠️  Collection is empty!")
        return False
    
    # Try to retrieve a few points
    print("\nFetching sample points...")
    try:
        scroll_result = client.scroll(
            collection_name=COLLECTION_NAME,
            limit=3,
            with_payload=True,
            with_vectors=False
        )
        
        print(f"\nSample points ({len(scroll_result[0])}):")
        for i, point in enumerate(scroll_result[0], 1):
            print(f"\n{i}. ID: {point.id}")
            print(f"   Name: {point.payload.get('name', 'N/A')}")
            print(f"   Description: {point.payload.get('description', 'N/A')[:100]}...")
            print(f"   Industry: {point.payload.get('main_industry', 'N/A')}")
    except Exception as e:
        print(f"❌ Error fetching points: {e}")
        return False
    
    client.close()
    return True


def test_search():
    """Test semantic search functionality"""
    print("\n" + "=" * 60)
    print("Testing Semantic Search")
    print("=" * 60)
    
    from lib.qdrant_client import search_similar_companies
    
    test_queries = [
        "AI-powered CRM for startups",
        "CRM",
        "customer relationship management",
        "AI",
        "startup"
    ]
    
    for query in test_queries:
        print(f"\n🔍 Query: '{query}'")
        try:
            results = search_similar_companies(query, limit=3)
            if results:
                print(f"   Found {len(results)} results:")
                for i, company in enumerate(results, 1):
                    print(f"   {i}. {company['name']} (score: {company['similarity_score']:.4f})")
                    print(f"      {company['description'][:80]}...")
            else:
                print("   ⚠️  No results found")
        except Exception as e:
            print(f"   ❌ Error: {e}")
            import traceback
            traceback.print_exc()


if __name__ == "__main__":
    print("\n🧪 Qdrant Collection Test\n")
    
    # Test collection
    collection_ok = test_collection()
    
    if collection_ok:
        # Test search
        test_search()
    else:
        print("\n⚠️  Skipping search test - collection issues detected")
    
    print("\n" + "=" * 60)
    print("Test Complete")
    print("=" * 60)

