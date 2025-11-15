/**
 * Composant barre de recherche pour saisir l'idée
 */

import React, { useState } from "react"
import { ArrowUp } from "lucide-react"

interface SearchBarProps {
  onSubmit: (idea: string) => void
}

export function SearchBar({ onSubmit }: SearchBarProps) {
  const [idea, setIdea] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!idea.trim()) return
    onSubmit(idea)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Décrivez votre idée... (ex: un site pour mon restaurant)"
        className="w-full px-6 py-4 pr-32 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!idea.trim()}
      >
        Générer
        <ArrowUp className="w-4 h-4 ml-2" />
      </button>
    </form>
  )
}
