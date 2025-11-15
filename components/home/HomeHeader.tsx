/**
 * Composant header de la page d'accueil avec fond animé
 */

import React from "react"
import { IntegrationIcons } from "./IntegrationIcons"
import { SearchBar } from "./SearchBar"

interface HomeHeaderProps {
  isVisible: boolean
  onSubmit: (idea: string) => void
}

export function HomeHeader({ isVisible, onSubmit }: HomeHeaderProps) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 overflow-hidden ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Fond avec formes géométriques */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Cercles décoratifs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-linear-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl" />

        {/* Formes géométriques SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#6366f1" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
          <line x1="0" y1="0" x2="200" y2="200" stroke="#8b5cf6" strokeWidth="2" opacity="0.2" />
          <line x1="100%" y1="0" x2="80%" y2="200" stroke="#ec4899" strokeWidth="2" opacity="0.2" />
          <line x1="0" y1="100%" x2="200" y2="80%" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />
          <circle cx="10%" cy="20%" r="100" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.2" />
          <circle cx="90%" cy="80%" r="120" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.2" />
          <circle cx="50%" cy="50%" r="150" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.15" />
          <polygon points="80,20 100,60 60,60" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.2" />
          <polygon points="1800,100 1700,140 1740,140" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>

      <div className="relative max-w-4xl w-full px-4 space-y-8 z-10">
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-6xl font-bold text-gray-900">cbrain</h1>
          <p className="text-xl text-gray-600">
            Transform your idea into a complete strategy
          </p>
        </div>

        {/* Integration Icons */}
        <IntegrationIcons />

        {/* Search Bar */}
        <SearchBar onSubmit={onSubmit} />
      </div>
    </div>
  )
}
