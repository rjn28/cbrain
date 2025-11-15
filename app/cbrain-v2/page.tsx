"use client"

/**
 * Page principale CBrain V2 - Structure en 5 Carrés
 * Approche expert conseil en développement d'idées
 */

import { useState } from "react"
import { CbrainCanvasV2 } from "@/components/cbrain-canvas-v2"
import type { ComprehensiveStrategy } from "@/types/strategy-v2"

export default function CbrainV2Page() {
  const [strategyData, setStrategyData] = useState<ComprehensiveStrategy | undefined>()

  const handleGenerate = async (idea: string) => {
    try {
      const response = await fetch("/api/generate-strategy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("API Error:", errorData)
        throw new Error(errorData.error || "Failed to generate strategy")
      }

      const data = await response.json()
      setStrategyData(data)
    } catch (error) {
      console.error("Error generating strategy:", error)
      alert(error instanceof Error ? error.message : "An error occurred")
    }
  }

  return (
    <main className="w-full h-screen">
      <CbrainCanvasV2 onGenerate={handleGenerate} strategyData={strategyData} />
    </main>
  )
}
