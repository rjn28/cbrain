"use client"

/**
 * Composant principal du canvas cbrain - Version 5 Carrés
 * Approche expert conseil en développement d'idées
 */

import React, { useState, useCallback } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { strategyToNodesV2 } from "@/lib/strategy-to-nodes-v2"
import type { ComprehensiveStrategy } from "@/types/strategy-v2"
import { MAIN_SQUARE_IDS, DEFAULT_VIEWPORT, ZOOM_LIMITS } from "@/config/nodes-v2"

import { HomeHeader } from "./home/HomeHeader"
import { FloatingPromptBar } from "./workflow/FloatingPromptBar"
import { LoadingOverlay } from "./workflow/LoadingOverlay"
import { ExportButton } from "./workflow/ExportButton"
import { DetailPanelV2 } from "./detail-panel-v2"

interface CbrainCanvasV2Props {
  onGenerate?: (idea: string) => void
  strategyData?: ComprehensiveStrategy
}

export function CbrainCanvasV2({ onGenerate, strategyData }: CbrainCanvasV2Props) {
  const [idea, setIdea] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showWorkflow, setShowWorkflow] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [selectedNode, setSelectedNode] = useState<{ title: string; detail: Record<string, string> } | null>(null)

  /**
   * Gère la soumission d'une nouvelle idée
   */
  const handleSubmit = async (newIdea: string) => {
    setIdea(newIdea)
    setIsGenerating(true)
    setShowWorkflow(true)
    await onGenerate?.(newIdea)
  }

  /**
   * Gère le clic sur un nœud pour afficher les détails
   */
  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    // Ignorer les nœuds principaux (carrés)
    if (node.data.isMain) return

    // Afficher le détail si disponible
    if (node.data.detail && typeof node.data.detail === "object") {
      const title = typeof node.data.label === "string" ? node.data.label : String(node.data.label)
      setSelectedNode({ title, detail: node.data.detail as Record<string, string> })
    }
  }, [])

  /**
   * Gère la connexion entre nœuds
   */
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  /**
   * Anime l'arbre quand les données arrivent
   */
  React.useEffect(() => {
    if (!strategyData) return

    const { nodes: strategyNodes, edges: strategyEdges } = strategyToNodesV2(strategyData)

    // Animation progressive
    const totalNodes = strategyNodes.length
    const animationDuration = 3000 // 3 secondes
    const delayPerNode = animationDuration / totalNodes

    strategyNodes.forEach((node, index) => {
      setTimeout(() => {
        setNodes((prevNodes) => [...prevNodes, node])
        
        // Ajouter les edges correspondants
        const nodeEdges = strategyEdges.filter(edge => edge.target === node.id)
        setEdges((prevEdges) => [...prevEdges, ...nodeEdges])
      }, index * delayPerNode)
    })

    // Arrêter le loading
    setTimeout(() => {
      setIsGenerating(false)
    }, animationDuration + 500)
  }, [strategyData, setNodes, setEdges])

  /**
   * Réinitialise le canvas
   */
  const handleReset = () => {
    setShowWorkflow(false)
    setNodes([])
    setEdges([])
    setIdea("")
    setSelectedNode(null)
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {!showWorkflow ? (
        <HomeHeader isVisible={true} onSubmit={handleSubmit} />
      ) : (
        <>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            defaultViewport={DEFAULT_VIEWPORT}
            minZoom={ZOOM_LIMITS.min}
            maxZoom={ZOOM_LIMITS.max}
            fitView
            className="bg-gradient-to-br from-slate-50 to-slate-100"
          >
            <Background />
            <Controls />
          </ReactFlow>

          <FloatingPromptBar
            isVisible={true}
            initialIdea={idea}
            onSubmit={handleSubmit}
          />

          {/* Export button - to be implemented for v2 */}

          {isGenerating && <LoadingOverlay />}

          {selectedNode && (
            <DetailPanelV2
              title={selectedNode.title}
              detail={selectedNode.detail}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </>
      )}
    </div>
  )
}
