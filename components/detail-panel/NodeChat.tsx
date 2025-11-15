/**
 * Composant de chat contextuel pour itérer sur un nœud
 */

import React, { useState, useRef, useEffect } from "react"
import { Send, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  rating?: "up" | "down"
}

interface NodeChatProps {
  nodeTitle: string
  nodeContent: string
}

export function NodeChat({ nodeTitle, nodeContent }: NodeChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat-node", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nodeTitle,
          nodeContent,
          userMessage: input,
          conversationHistory: messages.map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!response.ok) throw new Error("Erreur API")

      const data = await response.json()
      const assistantMessage: Message = { role: "assistant", content: data.message }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Erreur:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Désolé, une erreur s'est produite. Réessayez.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRating = (index: number, rating: "up" | "down") => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, rating: msg.rating === rating ? undefined : rating } : msg
      )
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 max-h-[300px]">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">
            💬 Posez une question pour affiner cet élément avec Mistral AI
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>

                {/* Boutons de vote pour les réponses de l'assistant */}
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                    <button
                      onClick={() => handleRating(index, "up")}
                      className={`p-1 rounded transition-colors ${
                        message.rating === "up"
                          ? "bg-green-100 text-green-600"
                          : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                      }`}
                      title="Bonne réponse"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleRating(index, "down")}
                      className={`p-1 rounded transition-colors ${
                        message.rating === "down"
                          ? "bg-red-100 text-red-600"
                          : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                      }`}
                      title="Mauvaise réponse"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
              <span className="text-sm text-gray-600">Mistral réfléchit...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez une question ou demandez des améliorations..."
            rows={2}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="shrink-0 p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            title="Envoyer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Appuyez sur Entrée pour envoyer, Shift+Entrée pour une nouvelle ligne
        </p>
      </div>
    </div>
  )
}
