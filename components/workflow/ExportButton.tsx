/**
 * Bouton d'export de la stratégie vers Lovable
 */

import React, { useState } from "react"
import { Check } from "lucide-react"
import Image from "next/image"
import type { MistralStrategyData } from "@/types/strategy"
import { generateMarkdown, downloadMarkdown, sanitizeFilename } from "@/lib/markdown-exporter"

interface ExportButtonProps {
  isVisible: boolean
  strategyData?: MistralStrategyData
}

export function ExportButton({ isVisible, strategyData }: ExportButtonProps) {
  const [isExported, setIsExported] = useState(false)

  const handleExport = () => {
    if (!strategyData) return

    const markdown = generateMarkdown(strategyData)
    const filename = sanitizeFilename(strategyData.titreProjet)
    downloadMarkdown(markdown, filename)

    // Animation de confirmation
    setIsExported(true)
    setTimeout(() => setIsExported(false), 2000)
  }

  if (!isVisible || !strategyData) return null

  return (
    <div
      className={`fixed bottom-8 right-8 transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
      }`}
      style={{ zIndex: 50 }}
    >
      <button
        onClick={handleExport}
        className={`
          group relative
          px-5 py-3 
          flex items-center gap-3
          bg-white hover:bg-gray-50
          border-2 border-gray-200 hover:border-purple-500
          rounded-xl shadow-lg hover:shadow-xl
          transition-all duration-300
          ${isExported ? "bg-green-50 border-green-500" : ""}
        `}
        title="Export strategy to Lovable"
      >
        {/* Lovable Logo or Check */}
        <div className={`
          w-5 h-5 flex items-center justify-center
          transition-all duration-300
        `}>
          {isExported ? (
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
          ${isExported ? "text-green-600" : "text-gray-700 group-hover:text-purple-600"}
        `}>
          {isExported ? "Exported!" : "Export to Lovable"}
        </span>
      </button>
    </div>
  )
}
