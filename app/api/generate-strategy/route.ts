import { NextRequest, NextResponse } from 'next/server'
import { getStrategyPrompt } from './prompt'

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json()

    if (!idea) {
      return NextResponse.json(
        { error: 'Idea missing' },
        { status: 400 }
      )
    }

    if (!MISTRAL_API_KEY) {
      return NextResponse.json(
        { error: 'Mistral API key missing' },
        { status: 500 }
      )
    }

    // Structured prompt for Mistral
    const prompt = getStrategyPrompt(idea)

    // Call Mistral API
    console.log('Calling Mistral with key:', MISTRAL_API_KEY?.substring(0, 10) + '...')
    
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Mistral error:', error)
      console.error('Status:', response.status)
      return NextResponse.json(
        { error: `Mistral error (${response.status}): ${error}` },
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
      const cleanContent = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      
      strategy = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Parsing error:', parseError)
      console.error('Received content:', content)
      return NextResponse.json(
        { error: 'Invalid response format', content },
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
