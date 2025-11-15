#!/usr/bin/env python
"""
Qdrant operations wrapper for YC companies semantic search
"""
import os
import time
from typing import List, Dict, Any, Optional
from concurrent.futures import ThreadPoolExecutor, as_completed
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import Document, PointStruct, VectorParams, CollectionStatus
from fastembed import TextEmbedding
import hashlib

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "yc_companies")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "BAAI/bge-small-en")
VECTOR_SIZE = int(os.getenv("VECTOR_SIZE", "384"))
DISTANCE_METRIC = os.getenv("DISTANCE_METRIC", "Cosine")
VECTOR_NAME = f"fast-{EMBEDDING_MODEL.split('/')[-1].lower()}"


def get_qdrant_client() -> QdrantClient:
    """Initialize and return Qdrant client"""
    return QdrantClient(
        url=QDRANT_URL,
        api_key=QDRANT_API_KEY,
        prefer_grpc=True,
        timeout=30
    )


def create_collection(client: QdrantClient, collection_name: str = COLLECTION_NAME, recreate: bool = False):
    """Create Qdrant collection if it doesn't exist"""
    if client.collection_exists(collection_name=collection_name):
        if recreate:
            print(f"Deleting existing collection '{collection_name}'...")
            client.delete_collection(collection_name=collection_name)
        else:
            print(f"Collection '{collection_name}' already exists")
            return
    
    vectors_config = {
        VECTOR_NAME: VectorParams(size=int(VECTOR_SIZE), distance=DISTANCE_METRIC)
    }
    client.create_collection(
        collection_name=collection_name,
        vectors_config=vectors_config
    )
    print(f"Created collection '{collection_name}' with vector '{VECTOR_NAME}'")


def hash_company_name(name: str) -> int:
    """Generate consistent integer ID from company name"""
    return int(hashlib.md5(name.encode()).hexdigest()[:8], 16)


def create_points_from_chunk(chunk_rows: List[Dict[str, str]], embedding_model: TextEmbedding) -> List[PointStruct]:
    """Create PointStructs from a chunk of rows with batched embedding generation"""
    points = []
    
    # Extract texts and filter empty ones
    texts = []
    valid_rows = []
    for row in chunk_rows:
        text = row.get('description', '').strip()
        if text:
            texts.append(text)
            valid_rows.append(row)
    
    if not texts:
        return []
    
    # Generate embeddings in batch (more efficient)
    embeddings = list(embedding_model.embed(texts))
    
    # Create points with embeddings
    for row, embedding in zip(valid_rows, embeddings):
        point_id = hash_company_name(row['name'])
        points.append(PointStruct(
            id=point_id,
            payload={
                'name': row['name'],
                'description': row['description'],
                'main_industry': row.get('main_industry', ''),
                'sub_industry': row.get('sub_industry', ''),
                'batch': row.get('batch', ''),
                'url': row.get('url', '')
            },
            vector={VECTOR_NAME: embedding.tolist()}
        ))
    
    return points


def upload_companies_from_csv(
    csv_path: str, 
    collection_name: str = COLLECTION_NAME,
    batch_size: int = 256,  # Increased batch size for better performance
    max_workers: int = 8,    # Parallel workers for processing
    recreate: bool = True    # Recreate collection to ensure clean state
):
    """Load companies from CSV and upload to Qdrant with parallelization"""
    import csv
    
    client = get_qdrant_client()
    create_collection(client, collection_name, recreate=recreate)
    
    # Step 1: Read all rows from CSV
    print("Reading CSV file...")
    rows = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = [row for row in reader if row.get('description', '').strip()]
    
    print(f"Found {len(rows)} companies to process")
    
    # Initialize embedding model once (shared across threads)
    print(f"Initializing embedding model: {EMBEDDING_MODEL}...")
    embedding_model = TextEmbedding(model_name=EMBEDDING_MODEL)
    
    # Step 2: Create points in parallel batches with batched embedding generation
    print(f"Creating points with {max_workers} workers...")
    points = []
    
    # Process in chunks - each chunk will generate embeddings in batch
    chunk_size = 200  # Process 200 rows at a time for embedding generation
    chunks = [rows[i:i + chunk_size] for i in range(0, len(rows), chunk_size)]
    
    # Process chunks in parallel
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # Submit all chunks
        futures = [executor.submit(create_points_from_chunk, chunk, embedding_model) for chunk in chunks]
        
        # Collect results as they complete
        for i, future in enumerate(as_completed(futures)):
            chunk_points = future.result()
            points.extend(chunk_points)
            print(f"Processed chunk {i+1}/{len(chunks)} ({len(points)} points so far)...")
    
    print(f"Created {len(points)} points, uploading to Qdrant...")
    print(f"Using vector name: {VECTOR_NAME}")
    
    # Step 3: Upload all points at once with parallel parameter
    # Qdrant's upload_points handles parallelization internally
    start_time = time.time()
    try:
        client.upload_points(
            collection_name=collection_name,
            points=points,
            batch_size=batch_size,
            parallel=16  # Qdrant internal parallelization
        )
    except Exception as e:
        client.close()
        raise ValueError(f"Error uploading points: {e}")
    
    upload_time = time.time() - start_time
    
    print(f"Upload completed in {upload_time:.2f} seconds")
    
    # Wait for collection to be ready
    print("Waiting for collection to be ready...")
    while client.get_collection(collection_name).status != CollectionStatus.GREEN:
        time.sleep(1.0)
    
    # Verify upload
    collection_info = client.get_collection(collection_name)
    actual_points = collection_info.points_count
    
    if actual_points == 0:
        print(f"⚠️  Warning: Collection shows 0 points after upload!")
        print(f"   Expected: {len(points)}")
        print(f"   This might indicate a vector name mismatch or upload issue")
    else:
        print(f"✅ Successfully uploaded {actual_points} companies to Qdrant")
        print(f"   Average: {actual_points/upload_time:.1f} points/second")
    
    client.close()


def search_similar_companies(
    idea_pitch: str,
    limit: int = 3,
    collection_name: str = COLLECTION_NAME
) -> List[Dict[str, Any]]:
    """Search for similar companies using semantic search"""
    client = get_qdrant_client()
    
    if not client.collection_exists(collection_name=collection_name):
        raise ValueError(f"Collection '{collection_name}' does not exist. Run setup script first.")
    
    # Generate embedding explicitly for the query
    embedding_model = TextEmbedding(model_name=EMBEDDING_MODEL)
    query_embedding = list(embedding_model.embed([idea_pitch]))[0].tolist()
    
    # Search using query_points with explicit vector
    try:
        results = client.query_points(
            collection_name=collection_name,
            query=query_embedding,
            using=VECTOR_NAME,
            limit=limit
        )
    except Exception as e:
        client.close()
        raise ValueError(f"Error querying Qdrant: {e}")
    
    # Check if we got results
    if not hasattr(results, 'points') or not results.points:
        client.close()
        return []
    
    # Format results
    similar_companies = []
    for point in results.points:
        similar_companies.append({
            'name': point.payload.get('name', ''),
            'description': point.payload.get('description', ''),
            'main_industry': point.payload.get('main_industry', ''),
            'sub_industry': point.payload.get('sub_industry', ''),
            'batch': point.payload.get('batch', ''),
            'url': point.payload.get('url', ''),
            'similarity_score': point.score
        })
    
    client.close()
    return similar_companies

