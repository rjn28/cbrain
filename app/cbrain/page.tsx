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
      // Appeler l'API Mistral
      const response = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Generation error')
      }

      const data = await response.json()
      console.log("Strategy generated:", data)
      setStrategyData(data)
      
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      // L'API retourne déjà des données de démo v2 en cas d'erreur
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
