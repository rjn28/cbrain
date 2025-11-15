"use client"

import React, { useEffect, useState } from "react"
import { X, Sparkles, User, AlertCircle, Target, Lightbulb, Star, Code, Wrench, Users, Calendar, Bot, MessageSquare } from "lucide-react"
import { NodeChat } from "./detail-panel/NodeChat"

interface DetailPanelProps {
  isOpen: boolean
  onClose: () => void
  title: string
  detail: string
}

// Fonction pour extraire l'icône selon le titre
function getIconForTitle(title: string) {
  const lowerTitle = title.toLowerCase()
  
  if (lowerTitle.includes('persona')) return <User className="w-5 h-5" />
  if (lowerTitle.includes('problème') || lowerTitle.includes('problem')) return <AlertCircle className="w-5 h-5" />
  if (lowerTitle.includes('objectif') || lowerTitle.includes('goal')) return <Target className="w-5 h-5" />
  if (lowerTitle.includes('concept')) return <Lightbulb className="w-5 h-5" />
  if (lowerTitle.includes('feature')) return <Star className="w-5 h-5" />
  if (lowerTitle.includes('frontend')) return <Code className="w-5 h-5" />
  if (lowerTitle.includes('backend')) return <Wrench className="w-5 h-5" />
  if (lowerTitle.includes('partenaire')) return <Users className="w-5 h-5" />
  if (lowerTitle.includes('étape') || lowerTitle.includes('step')) return <Calendar className="w-5 h-5" />
  if (lowerTitle.includes('mistral') || lowerTitle.includes('fal') || lowerTitle.includes('eleven') || lowerTitle.includes('qdrant')) return <Bot className="w-5 h-5" />
  
  return <Sparkles className="w-5 h-5" />
}

// Fonction pour extraire la couleur selon le titre
function getColorForTitle(title: string) {
  const lowerTitle = title.toLowerCase()
  
  if (lowerTitle.includes('persona') || lowerTitle.includes('problème') || lowerTitle.includes('objectif')) {
    return { bg: 'from-blue-500 to-blue-600', text: 'text-blue-600', border: 'border-blue-200', bgLight: 'bg-blue-50' }
  }
  if (lowerTitle.includes('concept') || lowerTitle.includes('feature')) {
    return { bg: 'from-purple-500 to-purple-600', text: 'text-purple-600', border: 'border-purple-200', bgLight: 'bg-purple-50' }
  }
  if (lowerTitle.includes('frontend') || lowerTitle.includes('backend') || lowerTitle.includes('partenaire')) {
    return { bg: 'from-green-500 to-green-600', text: 'text-green-600', border: 'border-green-200', bgLight: 'bg-green-50' }
  }
  if (lowerTitle.includes('étape') || lowerTitle.includes('step')) {
    return { bg: 'from-orange-500 to-orange-600', text: 'text-orange-600', border: 'border-orange-200', bgLight: 'bg-orange-50' }
  }
  if (lowerTitle.includes('mistral') || lowerTitle.includes('fal') || lowerTitle.includes('eleven') || lowerTitle.includes('qdrant')) {
    return { bg: 'from-pink-500 to-pink-600', text: 'text-pink-600', border: 'border-pink-200', bgLight: 'bg-pink-50' }
  }
  
  return { bg: 'from-gray-500 to-gray-600', text: 'text-gray-600', border: 'border-gray-200', bgLight: 'bg-gray-50' }
}

export function DetailPanel({ isOpen, onClose, title, detail }: DetailPanelProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const icon = getIconForTitle(title)
  const colors = getColorForTitle(title)

  useEffect(() => {
    // Animation d'entrée avec délai
    if (isOpen) {
      const timeoutId = setTimeout(() => setIsAnimating(true), 10)
      return () => clearTimeout(timeoutId)
    }
    // Animation de sortie immédiate
    setIsAnimating(false)
    return undefined
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(onClose, 300)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-md z-40 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 w-[650px] max-w-[90vw] max-h-[85vh] bg-white z-50 rounded-2xl transition-all duration-300 ease-out overflow-hidden ${
          isAnimating ? '-translate-y-1/2 opacity-100 scale-100 shadow-[0_20px_60px_rgba(0,0,0,0.3)]' : '-translate-y-[45%] opacity-0 scale-95 shadow-none'
        }`}
      >
        {/* Header */}
        <div className="relative">
          <div className="relative px-8 py-6 border-b border-gray-200/50 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {/* Icon Badge */}
                <div className={`shrink-0 w-12 h-12 rounded-xl bg-linear-to-br ${colors.bg} flex items-center justify-center text-white shadow-lg`}>
                  {icon}
                </div>
                
                {/* Title */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-1">
                    {title.split('\n')[0]}
                  </h2>
                  {title.split('\n')[1] && (
                    <p className="text-sm text-gray-500 font-medium">
                      {title.split('\n')[1]}
                    </p>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="shrink-0 p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 group hover:scale-105 active:scale-95"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            </div>

            {/* Decorative line */}
            <div className="mt-4 flex items-center gap-2">
              <div className={`h-1 w-12 rounded-full bg-linear-to-r ${colors.bg}`} />
              <div className="h-0.5 flex-1 bg-linear-to-r from-gray-200 to-transparent" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative max-h-[calc(85vh-200px)] overflow-y-auto px-8 py-8 custom-scrollbar">
          {!showChat ? (
            <div className="space-y-6">
              {detail.split('\n\n').map((paragraph, index) => (
                <div key={index} className="group">
                  {/* Paragraph number badge */}
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-8 h-8 rounded-lg ${colors.bgLight} ${colors.border} border flex items-center justify-center mt-1`}>
                      <span className={`text-sm font-bold ${colors.text}`}>
                        {index + 1}
                      </span>
                    </div>
                    
                    {/* Paragraph content */}
                    <div className="flex-1">
                      <p className="text-[15px] text-gray-700 leading-relaxed font-normal text-justify">
                        {paragraph}
                      </p>
                    </div>
                  </div>

                  {/* Separator (except for last paragraph) */}
                  {index < detail.split('\n\n').length - 1 && (
                    <div className="mt-6 ml-12 h-px bg-linear-to-r from-gray-200 via-gray-100 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <NodeChat nodeTitle={title} nodeContent={detail} />
          )}
        </div>

        {/* Footer avec toggle chat */}
        <div className="px-8 py-4 border-t border-gray-200/50 flex items-center justify-between gap-4">
          <div className={`flex-1 px-4 py-2.5 rounded-xl ${colors.bgLight} ${colors.border} border backdrop-blur-sm flex items-center justify-center`}>
            <span className={`text-xs font-semibold ${colors.text}`}>
              Generated by Mistral AI
            </span>
          </div>
          
          <button
            onClick={() => setShowChat(!showChat)}
            className={`shrink-0 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 ${
              showChat
                ? `${colors.border} bg-linear-to-r ${colors.bg} text-white`
                : `border-gray-300 bg-white text-gray-700 hover:border-gray-400`
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs font-semibold">
              {showChat ? "View details" : "Chat"}
            </span>
          </button>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #d1d5db, #9ca3af);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9ca3af, #6b7280);
        }
      `}</style>
    </>
  )
}
