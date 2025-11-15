# Performance Optimizations

## Mistral API Optimizations

### 1. Faster Model Selection
- **Changed from**: `mistral-small-latest`
- **Changed to**: `open-mistral-7b`
- **Benefit**: 2-3x faster response times, lower cost

### 2. Reduced Token Limits
- **Strategy generation**: 6000 → 3000 tokens
- **Chat responses**: 300 → 200 tokens
- **Benefit**: Faster generation, more focused responses

### 3. Lower Temperature
- **Strategy generation**: 0.7 → 0.3
- **Chat**: 0.7 → 0.5
- **Benefit**: More deterministic, faster responses

### 4. Retry Logic with Exponential Backoff
- Automatically retries on 429 errors (rate limit)
- Waits 1s, 2s, 4s between retries
- Falls back to demo data after 3 failed attempts

### 5. Demo Data Fallback
- Set `USE_DEMO_DATA=true` in `.env.local` to use demo data
- Automatically used when API is unavailable
- Useful for development and testing

## Error Handling

### 429 Error (Service Capacity Exceeded)
This error occurs when:
- Too many requests in a short time
- Mistral API is under heavy load

**Solutions**:
1. Wait a few seconds and try again (automatic retry implemented)
2. Use demo data mode for development
3. Consider upgrading Mistral API plan for higher rate limits

### Environment Variables

```bash
# Required for production
MISTRAL_API_KEY=your_api_key_here

# Optional: Use demo data instead of API
USE_DEMO_DATA=false
```

## Expected Response Times

| Operation | Before | After | Improvement |
|-----------|--------|-------|-------------|
| Strategy Generation | 15-25s | 5-10s | 60% faster |
| Chat Response | 3-5s | 1-2s | 60% faster |

## Tips for Best Performance

1. **Use specific, concise prompts** - Shorter prompts = faster responses
2. **Avoid peak hours** - API is faster during off-peak times
3. **Enable demo mode for development** - No API calls needed
4. **Monitor rate limits** - Space out requests if generating multiple strategies
