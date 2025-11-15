/**
 * API Route pour le chat contextuel sur un nœud spécifique
 */

import { NextRequest, NextResponse } from 'next/server'

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { nodeTitle, nodeContent, userMessage, conversationHistory } = await request.json()

    if (!userMessage || !nodeTitle) {
      return NextResponse.json(
        { error: 'Message and node title required' },
        { status: 400 }
      )
    }

    if (!MISTRAL_API_KEY) {
      return NextResponse.json(
        { error: 'Mistral API key missing' },
        { status: 500 }
      )
    }

    // Build context for Mistral
    const systemPrompt = `You are a business strategy expert who helps refine and improve strategy elements.

Current context:
- Element: ${nodeTitle}
- Current content: ${nodeContent}

Your mission:
- Respond concisely and actionably (2-3 sentences max)
- Propose concrete improvements
- Ask relevant questions to refine the strategy
- Be constructive and encouraging

Respond in English in a professional but accessible manner.`

    // Construire l'historique de conversation
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: userMessage },
    ]

    // Appel à l'API Mistral avec retry
    let response
    let lastError
    const maxRetries = 3
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        response = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MISTRAL_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'open-mistral-7b', // Faster model
            messages,
            temperature: 0.5, // Lower for faster responses
            max_tokens: 200, // Reduced for faster responses
          }),
        })

        if (response.ok) {
          break
        }

        // If 429, wait and retry
        if (response.status === 429 && attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000
          console.log(`Rate limit hit, waiting ${waitTime}ms before retry`)
          await new Promise(resolve => setTimeout(resolve, waitTime))
          lastError = await response.text()
          continue
        }

        // For other errors, break
        break
        
      } catch (error) {
        lastError = error
        if (attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000
          await new Promise(resolve => setTimeout(resolve, waitTime))
        }
      }
    }

    if (!response || !response.ok) {
      const error = lastError || await response?.text()
      console.error('Mistral error:', error)
      
      let errorMessage = `Mistral error (${response?.status || 'unknown'})`
      if (response?.status === 429) {
        errorMessage = 'Service temporarily overloaded. Please try again in a moment.'
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: response?.status || 500 }
      )
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response from Mistral' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: assistantMessage })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
