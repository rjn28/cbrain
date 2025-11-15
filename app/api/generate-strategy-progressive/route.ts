import { NextRequest } from "next/server"
import {
  getProjectSummaryPrompt,
  getVisionPrompt,
  getSolutionPrompt,
  getModelPrompt,
  getGrowthPrompt,
  getUnicornPrompt,
} from "@/lib/prompts/category-prompts"

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY
const MISTRAL_MODEL = "mistral-large-latest"

/**
 * Appelle Mistral AI avec un prompt donné
 */
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
      max_tokens: 4000,
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
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim()

  // Corriger les erreurs JSON courantes
  cleanContent = cleanContent.replace(/"\s*\n\s*"/g, '",\n"')
  cleanContent = cleanContent.replace(/}\s*\n\s*"/g, '},\n"')
  cleanContent = cleanContent.replace(/\]\s*\n\s*"/g, '],\n"')

  return JSON.parse(cleanContent)
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
        ]

        // Lancer tous les appels en parallèle
        await Promise.all(
          categories.map(async (category) => {
            try {
              const data = await callMistral(category.prompt)
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type: category.name, data })}\n\n`)
              )
            } catch (error) {
              console.error(`Error generating ${category.name}:`, error)
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type: "error", category: category.name, error: String(error) })}\n\n`)
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
