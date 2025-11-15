import { NextRequest, NextResponse } from 'next/server'

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json()

    if (!idea) {
      return NextResponse.json(
        { error: 'Idée manquante' },
        { status: 400 }
      )
    }

    if (!MISTRAL_API_KEY) {
      return NextResponse.json(
        { error: 'Clé API Mistral manquante' },
        { status: 500 }
      )
    }

    // Prompt structuré pour Mistral
    const prompt = `Tu es un expert en stratégie business et création de startups. 
À partir de l'idée suivante, génère une stratégie complète au format JSON.

IDÉE: "${idea}"

Tu dois retourner UNIQUEMENT un objet JSON valide (pas de markdown, pas de texte avant ou après) avec cette structure EXACTE:

{
  "titreProjet": "Nom court du projet (2-4 mots max)",
  "ideeCourte": "Description courte de l'idée (15-20 mots max)",
  "strategie": {
    "persona": "Description du persona cible (15-20 mots)",
    "personaDetail": "Explication détaillée du persona : démographie, comportements, besoins, motivations, freins (2-3 paragraphes)",
    "probleme": "Problème résolu (15-20 mots)",
    "problemeDetail": "Analyse approfondie du problème : contexte, impact, conséquences, pourquoi c'est important (2-3 paragraphes)",
    "objectif": "Objectif principal (15-20 mots)",
    "objectifDetail": "Détails de l'objectif : métriques, timeline, impact attendu, vision long terme (2-3 paragraphes)"
  },
  "produit": {
    "concept": "Concept du produit (15-20 mots)",
    "conceptDetail": "Description complète du concept : valeur ajoutée, différenciation, positionnement marché (2-3 paragraphes)",
    "feature1": "Fonctionnalité clé 1 (10-15 mots)",
    "feature1Detail": "Explication détaillée de la feature 1 : fonctionnement, bénéfices utilisateur, implémentation (2-3 paragraphes)",
    "feature2": "Fonctionnalité clé 2 (10-15 mots)",
    "feature2Detail": "Explication détaillée de la feature 2 : fonctionnement, bénéfices utilisateur, implémentation (2-3 paragraphes)"
  },
  "stack": {
    "frontend": "Technologies frontend (5-10 mots)",
    "frontendDetail": "Justification du choix frontend : avantages, écosystème, scalabilité, expérience développeur (2-3 paragraphes)",
    "backend": "Technologies backend (5-10 mots)",
    "backendDetail": "Justification du choix backend : performance, sécurité, maintenance, intégrations (2-3 paragraphes)",
    "partenaires": "Partenaires clés (5-10 mots)",
    "partenairesDetail": "Rôle des partenaires : intégrations spécifiques, valeur ajoutée, synergies (2-3 paragraphes)"
  },
  "planning": {
    "etape1": "Première étape (10-15 mots)",
    "etape1Detail": "Détails de l'étape 1 : tâches, livrables, ressources nécessaires, risques (2-3 paragraphes)",
    "etape2": "Deuxième étape (10-15 mots)",
    "etape2Detail": "Détails de l'étape 2 : tâches, livrables, ressources nécessaires, risques (2-3 paragraphes)",
    "etape3": "Troisième étape (10-15 mots)",
    "etape3Detail": "Détails de l'étape 3 : tâches, livrables, ressources nécessaires, risques (2-3 paragraphes)"
  },
  "agents": {
    "mistral": "Usage de Mistral AI (10-15 mots)",
    "mistralDetail": "Cas d'usage détaillés de Mistral : fonctionnalités IA, intégration, bénéfices (2-3 paragraphes)",
    "fal": "Usage de Fal.ai (10-15 mots)",
    "falDetail": "Cas d'usage détaillés de Fal : génération d'images, intégration, bénéfices (2-3 paragraphes)",
    "elevenlabs": "Usage de ElevenLabs (10-15 mots)",
    "elevenlabsDetail": "Cas d'usage détaillés de ElevenLabs : voix synthétique, intégration, bénéfices (2-3 paragraphes)",
    "qdrant": "Usage de Qdrant (10-15 mots)",
    "qdrantDetail": "Cas d'usage détaillés de Qdrant : recherche vectorielle, intégration, bénéfices (2-3 paragraphes)"
  }
}

IMPORTANT: 
- Réponds UNIQUEMENT avec le JSON, rien d'autre
- Les textes courts doivent être COURTS (max 20 mots)
- Les textes "Detail" doivent être LONGS et DÉTAILLÉS (2-3 paragraphes de 3-4 phrases chacun)
- Sois concret, actionnable et professionnel
- Utilise les partenaires du hackathon (Mistral, Fal, ElevenLabs, Qdrant, N8n, Lovable)`

    // Appel à l'API Mistral
    console.log('Appel à Mistral avec la clé:', MISTRAL_API_KEY?.substring(0, 10) + '...')
    
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
      console.error('Erreur Mistral:', error)
      console.error('Status:', response.status)
      return NextResponse.json(
        { error: `Erreur Mistral (${response.status}): ${error}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'Pas de réponse de Mistral' },
        { status: 500 }
      )
    }

    // Parser le JSON de Mistral
    let strategy
    try {
      // Nettoyer le contenu (enlever les markdown code blocks si présents)
      const cleanContent = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      
      strategy = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error('Erreur de parsing:', parseError)
      console.error('Contenu reçu:', content)
      return NextResponse.json(
        { error: 'Format de réponse invalide', content },
        { status: 500 }
      )
    }

    // Trouver les concurrents en parallèle
    console.log('Recherche de concurrents...')
    let competitors: Array<{ 
      name: string
      description: string
      url?: string | null
      pitch?: string
      positioning?: string
    }> = []
    
    try {
      const contextText = `
CONTEXTE:
- Persona: ${strategy.strategie?.persona || 'Non spécifié'}
- Problème résolu: ${strategy.strategie?.probleme || 'Non spécifié'}
- Produit: ${strategy.produit?.concept || 'Non spécifié'}
`

      const competitorPrompt = `Tu es un expert en analyse concurrentielle et recherche de marché.
À partir de l'idée suivante, trouve 4 à 10 concurrents directs ou indirects pertinents.

IDÉE: "${idea}"
${contextText}

Tu dois retourner UNIQUEMENT un objet JSON valide avec cette structure EXACTE:
{
  "competitors": [
    {
      "name": "Nom du concurrent (ex: 'Notion', 'Figma', 'Stripe')",
      "description": "Description courte du concurrent et pourquoi il est pertinent (15-25 mots)",
      "url": "URL de la landing page principale (ex: https://notion.so, https://figma.com) - peut être null si non trouvée",
      "pitch": "Court pitch expliquant ce que fait ce concurrent et leur proposition de valeur (20-30 mots)",
      "positioning": "Stratégie de positionnement : comment se différencier ou se positionner par rapport à ce concurrent (15-20 mots)"
    }
  ]
}

IMPORTANT:
- Trouve entre 4 et 10 concurrents HIGHLY RELEVANTS
- Inclus des concurrents directs (même problème) et indirects (problème similaire)
- Les URLs doivent être les landing pages principales (homepage), valides ou null
- Le pitch doit expliquer clairement ce que fait le concurrent
- Le positioning doit être actionnable et stratégique
- Réponds UNIQUEMENT avec le JSON, rien d'autre`

      const competitorResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
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
              content: competitorPrompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 3000,
        }),
      })

      if (competitorResponse.ok) {
        const competitorData = await competitorResponse.json()
        const competitorContent = competitorData.choices[0]?.message?.content

        if (competitorContent) {
          const cleanCompetitorContent = competitorContent
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim()

          const parsedCompetitors = JSON.parse(cleanCompetitorContent)
          competitors = parsedCompetitors.competitors || []

          // Limiter à 10 concurrents maximum
          if (competitors.length > 10) {
            competitors = competitors.slice(0, 10)
          }
        }
      } else {
        console.warn('Erreur lors de la recherche de concurrents, continuation sans concurrents')
      }
    } catch (competitorError) {
      console.error('Erreur lors de la recherche de concurrents:', competitorError)
      // Continue même si la recherche de concurrents échoue
    }

    // Transformer les concurrents en format attendu (competitor1, competitor2, etc.)
    const competitorsObject: Record<string, string> = {}
    competitors.forEach((comp, index) => {
      const num = index + 1
      const shortLabel = comp.name.length > 30 ? comp.name.substring(0, 27) + '...' : comp.name
      competitorsObject[`competitor${num}`] = `${shortLabel} - ${comp.description}`
      
      // Construire le détail avec toutes les informations
      let detailText = `**${comp.name}**\n\n${comp.description}\n\n`
      
      if (comp.pitch) {
        detailText += `**Pitch:** ${comp.pitch}\n\n`
      }
      
      if (comp.url) {
        detailText += `**Landing page:** [${comp.url}](${comp.url})\n\n`
      }
      
      if (comp.positioning) {
        detailText += `**Positionnement:** ${comp.positioning}`
      }
      
      competitorsObject[`competitor${num}Detail`] = detailText.trim()
    })

    // S'assurer d'avoir au moins 4 concurrents (générer des placeholders si nécessaire)
    while (competitors.length < 4) {
      const num = competitors.length + 1
      competitorsObject[`competitor${num}`] = `Concurrent ${num} - À analyser`
      competitorsObject[`competitor${num}Detail`] = `**Concurrent ${num}**\n\nÀ analyser en détail.`
      competitors.push({ 
        name: `Concurrent ${num}`, 
        description: 'À analyser', 
        url: null,
        pitch: undefined,
        positioning: undefined
      })
    }

    // Ajouter les concurrents à la stratégie
    strategy.competitors = competitorsObject

    return NextResponse.json(strategy)

  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
