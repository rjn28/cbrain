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
        { error: 'Message et titre du nœud requis' },
        { status: 400 }
      )
    }

    if (!MISTRAL_API_KEY) {
      return NextResponse.json(
        { error: 'Clé API Mistral manquante' },
        { status: 500 }
      )
    }

    // Construire le contexte pour Mistral
    const systemPrompt = `Tu es un expert en stratégie business qui aide à affiner et améliorer des éléments de stratégie.

Contexte actuel :
- Élément : ${nodeTitle}
- Contenu actuel : ${nodeContent}

Ta mission :
- Répondre de manière concise et actionnable (2-3 phrases max)
- Proposer des améliorations concrètes
- Poser des questions pertinentes pour affiner la stratégie
- Être constructif et encourageant

Réponds en français de manière professionnelle mais accessible.`

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
      console.error('Erreur Mistral:', error)
      return NextResponse.json(
        { error: `Erreur Mistral (${response.status})` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'Pas de réponse de Mistral' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: assistantMessage })

  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
