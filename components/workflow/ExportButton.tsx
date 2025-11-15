/**
 * Boutons d'export de la stratégie vers Lovable et Figma
 */

import React, { useState } from "react"
import { Check } from "lucide-react"
import Image from "next/image"
import type { ComprehensiveStrategy } from "@/types/strategy-v2"
import { generateMarkdownV2, downloadMarkdown, sanitizeFilename } from "@/lib/markdown-exporter"

interface ExportButtonProps {
  isVisible: boolean
  strategyData?: ComprehensiveStrategy
}

export function ExportButton({ isVisible, strategyData }: ExportButtonProps) {
  const [isLovableExported, setIsLovableExported] = useState(false)
  const [isFigmaExported, setIsFigmaExported] = useState(false)

  const handleLovableExport = () => {
    if (!strategyData) return

    const markdown = generateMarkdownV2(strategyData)
    const filename = sanitizeFilename(strategyData.projectName)
    downloadMarkdown(markdown, filename)

    // Animation de confirmation
    setIsLovableExported(true)
    setTimeout(() => setIsLovableExported(false), 2000)
  }

  const handleFigmaExport = () => {
    if (!strategyData) return

    const markdown = generateMarkdownV2(strategyData)
    const filename = sanitizeFilename(strategyData.projectName)
    downloadMarkdown(markdown, filename)

    // Animation de confirmation
    setIsFigmaExported(true)
    setTimeout(() => setIsFigmaExported(false), 2000)
  }

  if (!isVisible || !strategyData) return null

  return (
    <div
      className={`fixed bottom-8 right-8 flex flex-col gap-3 transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
      }`}
      style={{ zIndex: 50 }}
    >
      {/* Bouton Lovable */}
      <button
        onClick={handleLovableExport}
        className={`
          group relative
          px-5 py-3 
          flex items-center gap-3
          bg-white hover:bg-gray-50
          border-2 border-gray-200 hover:border-purple-500
          rounded-xl shadow-lg hover:shadow-xl
          transition-all duration-300
          ${isLovableExported ? "bg-green-50 border-green-500" : ""}
        `}
        title="Export strategy to Lovable"
      >
        {/* Lovable Logo or Check */}
        <div className={`
          w-5 h-5 flex items-center justify-center
          transition-all duration-300
        `}>
          {isLovableExported ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <Image
              src="/lovable-logo-icon.svg"
              alt="Lovable"
              width={20}
              height={20}
              className="w-5 h-5 group-hover:scale-110 transition-transform"
            />
          )}
        </div>

        {/* Text */}
        <span className={`
          text-sm font-semibold
          transition-all duration-300
          ${isLovableExported ? "text-green-600" : "text-gray-700 group-hover:text-purple-600"}
        `}>
          {isLovableExported ? "Exported!" : "Export to Lovable"}
        </span>
      </button>

      {/* Bouton Figma */}
      <button
        onClick={handleFigmaExport}
        className={`
          group relative
          px-5 py-3 
          flex items-center gap-3
          bg-white hover:bg-gray-50
          border-2 border-gray-200 hover:border-blue-500
          rounded-xl shadow-lg hover:shadow-xl
          transition-all duration-300
          ${isFigmaExported ? "bg-green-50 border-green-500" : ""}
        `}
        title="Export strategy to Figma"
      >
        {/* Figma Logo or Check */}
        <div className={`
          w-5 h-5 flex items-center justify-center
          transition-all duration-300
        `}>
          {isFigmaExported ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <svg 
              className="w-5 h-5 group-hover:scale-110 transition-transform" 
              viewBox="0 0 38 57" 
              fill="none"
            >
              <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
              <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
              <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
              <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
              <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
            </svg>
          )}
        </div>

        {/* Text */}
        <span className={`
          text-sm font-semibold
          transition-all duration-300
          ${isFigmaExported ? "text-green-600" : "text-gray-700 group-hover:text-blue-600"}
        `}>
          {isFigmaExported ? "Exported!" : "Export to Figma"}
        </span>
      </button>
    </div>
  )
}
