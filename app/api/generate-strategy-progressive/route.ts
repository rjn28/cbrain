import { NextRequest } from "next/server"
import {
  getProjectSummaryPrompt,
  getVisionPrompt,
  getSolutionPrompt,
  getModelPrompt,
  getGrowthPrompt,
  getUnicornPrompt,
  getQdrantThinkingPrompt,
} from "@/lib/prompts/category-prompts"

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY
const MISTRAL_MODEL = "mistral-large-latest"

/**
 * Appelle Mistral AI avec un prompt donné
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function callMistral(prompt: string): Promise<any> {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: MISTRAL_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 8000,
    }),
  })

  if (!response.ok) {
    throw new Error(`Mistral API error: ${response.statusText}`)
  }

  const data = await response.json()
  const content = data.choices[0]?.message?.content

  if (!content) {
    throw new Error("No content in Mistral response")
  }

  // Nettoyer et parser le JSON
  let cleanContent = content
    .replace(/```json\n?/gi, "")  // Case insensitive
    .replace(/```\n?/g, "")
    .replace(/^```/g, "")  // Au début
    .replace(/```$/g, "")  // À la fin
    .trim()

  // Supprimer les caractères markdown dans les valeurs JSON
  cleanContent = cleanContent.replace(/\*\*/g, "")
  cleanContent = cleanContent.replace(/\*/g, "")
  cleanContent = cleanContent.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Liens markdown

  // Corriger les erreurs JSON courantes
  cleanContent = cleanContent.replace(/"\s*\n\s*"/g, '",\n"')
  cleanContent = cleanContent.replace(/}\s*\n\s*"/g, '},\n"')
  cleanContent = cleanContent.replace(/\]\s*\n\s*"/g, '],\n"')

  try {
    return JSON.parse(cleanContent)
  } catch (parseError) {
    console.error("JSON Parse Error:")
    console.error("Raw content (first 1000 chars):", content.substring(0, 1000))
    console.error("Cleaned content (first 1000 chars):", cleanContent.substring(0, 1000))
    console.error("Full cleaned content length:", cleanContent.length)
    // Afficher les derniers caractères pour voir si le JSON est complet
    console.error("Last 200 chars:", cleanContent.substring(Math.max(0, cleanContent.length - 200)))
    throw new Error(`Failed to parse JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`)
  }
}

/**
 * API route avec streaming pour génération progressive
 */
export async function POST(request: NextRequest) {
  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const { idea } = await request.json()

        if (!idea || typeof idea !== "string") {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Invalid idea" })}\n\n`))
          controller.close()
          return
        }

        if (!MISTRAL_API_KEY) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Mistral API key not configured" })}\n\n`))
          controller.close()
          return
        }

        console.log("Generating strategy progressively for:", idea)

        // Étape 1 : Envoyer le résumé du projet immédiatement
        const summary = await callMistral(getProjectSummaryPrompt(idea))
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "summary", data: summary })}\n\n`))

        const projectName = summary.projectName

        // Étape 2 : Lancer les appels en parallèle et envoyer dès qu'ils arrivent
        const categories = [
          { name: "vision", prompt: getVisionPrompt(idea, projectName) },
          { name: "solution", prompt: getSolutionPrompt(idea, projectName) },
          { name: "model", prompt: getModelPrompt(idea, projectName) },
          { name: "growth", prompt: getGrowthPrompt(idea, projectName) },
          { name: "unicorn", prompt: getUnicornPrompt(idea, projectName) },
          { name: "qdrantThinking", prompt: getQdrantThinkingPrompt(idea, projectName) },
        ]

        // Lancer tous les appels en parallèle
        await Promise.all(
          categories.map(async (category) => {
            try {
              console.log(`Generating ${category.name}...`)
              const data = await callMistral(category.prompt)
              console.log(`✓ ${category.name} generated successfully`)
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type: category.name, data })}\n\n`)
              )
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : String(error)
              const errorStack = error instanceof Error ? error.stack : undefined
              console.error(`✗ Error generating ${category.name}:`, errorMessage)
              if (errorStack) console.error('Stack:', errorStack)
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ 
                  type: "error", 
                  category: category.name, 
                  error: errorMessage,
                  details: errorStack 
                })}\n\n`)
              )
            }
          })
        )

        // Envoyer le signal de fin
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "complete" })}\n\n`))
        controller.close()
      } catch (error) {
        console.error("Stream error:", error)
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", error: String(error) })}\n\n`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  })
}
