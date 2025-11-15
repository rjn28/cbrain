import { NextRequest, NextResponse } from 'next/server'
import { getStrategyPrompt } from './prompt'
import { getDemoStrategy } from '@/lib/demo-data'

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY
const USE_DEMO_DATA = process.env.USE_DEMO_DATA === 'true'

// Retry logic with exponential backoff
async function callMistralWithRetry(prompt: string, maxRetries = 3) {
  let lastError
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'open-mistral-7b', // Faster and cheaper model
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3, // Lower for faster, more focused responses
          max_tokens: 3000, // Reduced for faster responses
        }),
      })

      if (response.ok) {
        return response
      }

      // If 429 (rate limit), wait and retry
      if (response.status === 429) {
        const waitTime = Math.pow(2, attempt) * 1000 // 1s, 2s, 4s
        console.log(`Rate limit hit, waiting ${waitTime}ms before retry ${attempt + 1}/${maxRetries}`)
        await new Promise(resolve => setTimeout(resolve, waitTime))
        lastError = await response.text()
        continue
      }

      // For other errors, return immediately
      return response
      
    } catch (error) {
      lastError = error
      if (attempt < maxRetries - 1) {
        const waitTime = Math.pow(2, attempt) * 1000
        console.log(`Error occurred, waiting ${waitTime}ms before retry ${attempt + 1}/${maxRetries}`)
        await new Promise(resolve => setTimeout(resolve, waitTime))
      }
    }
  }
  
  throw new Error(`Failed after ${maxRetries} attempts: ${lastError}`)
}

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json()

    if (!idea) {
      return NextResponse.json(
        { error: 'Idea missing' },
        { status: 400 }
      )
    }

    // Use demo data if configured or if API key is missing
    if (USE_DEMO_DATA || !MISTRAL_API_KEY) {
      console.log('Using demo data...')
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay
      return NextResponse.json(getDemoStrategy(idea))
    }

    // Structured prompt for Mistral
    const prompt = getStrategyPrompt(idea)

    // Call Mistral API with retry logic
    console.log('Calling Mistral with retry logic...')
    
    let response
    try {
      response = await callMistralWithRetry(prompt)
    } catch (error) {
      console.error('All retry attempts failed, falling back to demo data:', error)
      return NextResponse.json(getDemoStrategy(idea))
    }

    if (!response.ok) {
      const error = await response.text()
      console.error('Mistral error:', error)
      console.error('Status:', response.status)
      
      // User-friendly error messages
      let errorMessage = `Mistral error (${response.status})`
      if (response.status === 429) {
        errorMessage = 'Service temporarily overloaded. Please try again in a few moments.'
      }
      
      return NextResponse.json(
        { error: errorMessage, details: error },
        { status: response.status }
      )
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'No response from Mistral' },
        { status: 500 }
      )
    }

    // Parse Mistral JSON
    let strategy
    try {
      // Clean content (remove markdown code blocks if present)
      let cleanContent = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      
      // Try to fix incomplete JSON by adding closing braces
      const openBraces = (cleanContent.match(/{/g) || []).length
      const closeBraces = (cleanContent.match(/}/g) || []).length
      
      if (openBraces > closeBraces) {
        console.warn('Incomplete JSON detected, attempting to fix...')
        cleanContent += '}'.repeat(openBraces - closeBraces)
      }
      
      strategy = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Parsing error:', parseError)
      console.error('Received content length:', content.length)
      console.error('First 500 chars:', content.substring(0, 500))
      console.error('Last 500 chars:', content.substring(content.length - 500))
      return NextResponse.json(
        { error: 'Invalid response format. The response may be too long or incomplete.', content: content.substring(0, 1000) },
        { status: 500 }
      )
    }

    return NextResponse.json(strategy)

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
