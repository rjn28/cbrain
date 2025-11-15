/**
 * Composant overlay de chargement pendant la génération
 */

"use client"

import { useEffect, useState } from "react"

export function LoadingOverlay() {
  const [visibleSquares, setVisibleSquares] = useState(1)

  useEffect(() => {
    // Ajouter progressivement des carrés
    const interval = setInterval(() => {
      setVisibleSquares(prev => (prev < 15 ? prev + 1 : prev))
    }, 400)

    return () => clearInterval(interval)
  }, [])

  // Configuration des carrés avec leurs couleurs
  const squares = [
    { color: "#3b82f6", label: "🎯", delay: 0 },
    { color: "#8b5cf6", label: "💡", delay: 1 },
    { color: "#10b981", label: "💼", delay: 2 },
    { color: "#f59e0b", label: "📈", delay: 3 },
    { color: "#ec4899", label: "🦄", delay: 4 },
    { color: "#3b82f6", label: "📊", delay: 5 },
    { color: "#8b5cf6", label: "⭐", delay: 6 },
    { color: "#10b981", label: "💰", delay: 7 },
    { color: "#f59e0b", label: "🚀", delay: 8 },
    { color: "#ec4899", label: "🤖", delay: 9 },
    { color: "#3b82f6", label: "🎨", delay: 10 },
    { color: "#8b5cf6", label: "⚙️", delay: 11 },
    { color: "#10b981", label: "📱", delay: 12 },
    { color: "#f59e0b", label: "💪", delay: 13 },
    { color: "#ec4899", label: "✨", delay: 14 },
  ]

  return (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Grille de carrés */}
        <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
          {squares.map((square, index) => (
            <div
              key={index}
              className="transition-all duration-500"
              style={{
                opacity: index < visibleSquares ? 1 : 0,
                transform: index < visibleSquares ? "scale(1)" : "scale(0.3)",
              }}
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                style={{
                  backgroundColor: square.color,
                  animation: index < visibleSquares ? `pulse 2s ease-in-out infinite ${square.delay * 0.1}s` : "none",
                }}
              >
                {square.label}
              </div>
            </div>
          ))}
        </div>

        {/* Texte */}
        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-900">
            Generating your strategy...
          </p>
          <p className="text-sm text-gray-600">Analysis in progress with Mistral AI</p>
        </div>
      </div>
    </div>
  )
}
