#!/usr/bin/env python
"""
Debug script to test Qdrant search functionality
"""
import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import Document

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "yc_companies")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "BAAI/bge-small-en")
VECTOR_NAME = f"fast-{EMBEDDING_MODEL.split('/')[-1].lower()}"

def test_collection_info():
    """Check collection info"""
    print("=" * 60)
    print("Collection Info")
    print("=" * 60)
    
    client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY, prefer_grpc=True)
    
    if not client.collection_exists(collection_name=COLLECTION_NAME):
        print(f"❌ Collection '{COLLECTION_NAME}' does not exist!")
        return False
    
    info = client.get_collection(COLLECTION_NAME)
    print(f"✅ Collection exists")
    print(f"   Points: {info.points_count}")
    print(f"   Vectors: {info.vectors_count}")
    print(f"   Status: {info.status}")
    print(f"   Vector name: {VECTOR_NAME}")
    
    # Get a sample point
    scroll_result = client.scroll(collection_name=COLLECTION_NAME, limit=1, with_payload=True)
    if scroll_result[0]:
        sample = scroll_result[0][0]
        print(f"\n   Sample point:")
        print(f"   - ID: {sample.id}")
        print(f"   - Name: {sample.payload.get('name', 'N/A')}")
        print(f"   - Description: {sample.payload.get('description', 'N/A')[:80]}...")
    
    client.close()
    return True


def test_search():
    """Test search with debugging"""
    print("\n" + "=" * 60)
    print("Testing Search")
    print("=" * 60)
    
    client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY, prefer_grpc=True)
    
    query_text = "AI-powered CRM for startups"
    print(f"Query: '{query_text}'")
    print(f"Model: {EMBEDDING_MODEL}")
    print(f"Vector name: {VECTOR_NAME}")
    
    try:
        query_doc = Document(text=query_text, model=EMBEDDING_MODEL)
        print("\nQuerying...")
        
        results = client.query_points(
            collection_name=COLLECTION_NAME,
            query=query_doc,
            using=VECTOR_NAME,
            limit=5
        )
        
        print(f"\nResults type: {type(results)}")
        print(f"Has 'points' attr: {hasattr(results, 'points')}")
        
        if hasattr(results, 'points'):
            print(f"Points count: {len(results.points) if results.points else 0}")
            
            if results.points:
                print("\n✅ Found results:")
                for i, point in enumerate(results.points[:3], 1):
                    print(f"\n{i}. Score: {point.score:.4f}")
                    print(f"   Name: {point.payload.get('name', 'N/A')}")
                    print(f"   Description: {point.payload.get('description', 'N/A')[:100]}...")
            else:
                print("\n⚠️  No points in results")
                # Try alternative search method
                print("\nTrying alternative search method...")
                try:
                    search_results = client.search(
                        collection_name=COLLECTION_NAME,
                        query_vector=query_doc,
                        limit=5
                    )
                    print(f"Search results: {len(search_results)}")
                    if search_results:
                        for i, result in enumerate(search_results[:3], 1):
                            print(f"{i}. Score: {result.score}, ID: {result.id}")
                except Exception as e:
                    print(f"Alternative search failed: {e}")
        else:
            print(f"Results attributes: {dir(results)}")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        client.close()


if __name__ == "__main__":
    if test_collection_info():
        test_search()

