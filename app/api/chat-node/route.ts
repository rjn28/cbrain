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

    // Appel à l'API Mistral
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages,
        temperature: 0.7,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Mistral error:', error)
      return NextResponse.json(
        { error: `Mistral error (${response.status})` },
        { status: response.status }
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
