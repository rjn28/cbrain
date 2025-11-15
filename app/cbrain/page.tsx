"use client"

import { useState } from "react"
import { CbrainCanvas } from "@/components/cbrain-canvas"
import type { ComprehensiveStrategy } from "@/types/strategy-v2"

export default function CbrainPage() {
  const [strategyData, setStrategyData] = useState<ComprehensiveStrategy | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleGenerate = async (idea: string) => {
    console.log("Generating for:", idea)
    setError(undefined)
    
    try {
      // Appeler l'API avec streaming
      const response = await fetch('/api/generate-strategy-progressive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      })

      if (!response.ok) {
        throw new Error('Generation error')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No reader available')
      }

      // Construire progressivement la stratégie
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const partialStrategy: any = {}

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6)
            try {
              const event = JSON.parse(jsonStr)
              
              if (event.type === 'summary') {
                partialStrategy.projectName = event.data.projectName
                partialStrategy.tagline = event.data.tagline
                // Mettre à jour immédiatement avec le nom du projet
                setStrategyData({ ...partialStrategy } as ComprehensiveStrategy)
              } else if (event.type === 'vision' || event.type === 'solution' || 
                         event.type === 'model' || event.type === 'growth' || 
                         event.type === 'unicorn' || event.type === 'qdrantThinking') {
                partialStrategy[event.type] = event.data
                // Mettre à jour progressivement
                setStrategyData({ ...partialStrategy } as ComprehensiveStrategy)
              } else if (event.type === 'complete') {
                console.log("✓ Strategy generation complete!")
              } else if (event.type === 'error') {
                console.error(`✗ Error in category "${event.category}":`, event.error)
                if (event.details) {
                  console.error('Error details:', event.details)
                }
              }
            } catch (parseErr) {
              console.error("Parse error:", parseErr)
            }
          }
        }
      }
      
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      // Fallback vers l'ancienne API en cas d'erreur
      try {
        const fallbackResponse = await fetch('/api/generate-strategy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idea }),
        })
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json()
          setStrategyData(fallbackData)
        }
      } catch (fallbackErr) {
        console.error("Fallback also failed:", fallbackErr)
      }
    }
  }

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <p className="font-bold">Error</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-1">Using demo data</p>
        </div>
      )}
      <CbrainCanvas onGenerate={handleGenerate} mistralStrategyData={strategyData} />
    </>
  )
}
