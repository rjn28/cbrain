/**
 * Composant barre de prompt flottante en bas de l'écran
 */

import React, { useState } from "react"
import { ArrowUp } from "lucide-react"

interface FloatingPromptBarProps {
  isVisible: boolean
  initialIdea: string
  onSubmit: (idea: string) => void
}

export function FloatingPromptBar({ isVisible, initialIdea, onSubmit }: FloatingPromptBarProps) {
  const [idea, setIdea] = useState(initialIdea)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!idea.trim()) return
    onSubmit(idea)
  }

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
      }`}
      style={{ zIndex: 50 }}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-3 w-[700px] max-w-[90vw]">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Modifier votre idée..."
            rows={2}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = "auto"
              target.style.height = target.scrollHeight + "px"
            }}
            className="w-full px-5 py-3 pr-40 text-sm text-gray-900 placeholder-gray-400 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white transition-all resize-none overflow-y-auto min-h-[60px] max-h-[150px]"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 px-4 py-2.5 flex items-center justify-center bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 whitespace-nowrap"
            disabled={!idea.trim()}
          >
            <span className="mr-1.5">Régénérer</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
