"use client"

/**
 * Composant principal du canvas cbrain
 * Gère l'affichage de l'arbre stratégique avec React Flow
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

import { createNodesProgressively, createEdgesProgressively } from "@/lib/mistral-strategy-parser-progressive"
import { createSkeletonNodes, createSkeletonEdges } from "@/lib/skeleton-tree"
import type { ComprehensiveStrategy } from "@/types/strategy-v2"
import { MAIN_NODE_IDS, DEFAULT_VIEWPORT, ZOOM_LIMITS } from "@/config/nodes"

import { HomeHeader } from "./home/HomeHeader"
import { FloatingPromptBar } from "./workflow/FloatingPromptBar"
import { LoadingOverlay } from "./workflow/LoadingOverlay"
import { ExportButton } from "./workflow/ExportButton"
import { DetailPanel } from "./detail-panel"

interface CbrainCanvasProps {
  onGenerate?: (idea: string) => void
  mistralStrategyData?: ComprehensiveStrategy
}

export function CbrainCanvas({ onGenerate, mistralStrategyData }: CbrainCanvasProps) {
  const [idea, setIdea] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showWorkflow, setShowWorkflow] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [selectedNode, setSelectedNode] = useState<{ title: string; detail: string } | null>(null)

  /**
   * Gère la soumission d'une nouvelle idée
   */
  const handleSubmit = async (newIdea: string) => {
    setIdea(newIdea)
    setIsGenerating(true)
    setShowWorkflow(true)
    
    // Afficher l'arbre skeleton immédiatement
    const skeletonNodes = createSkeletonNodes()
    const skeletonEdges = createSkeletonEdges()
    setNodes(skeletonNodes)
    setEdges(skeletonEdges)
    
    await onGenerate?.(newIdea)
  }

  /**
   * Gère le clic sur un nœud pour afficher les détails
   */
  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    if (MAIN_NODE_IDS.includes(node.id as typeof MAIN_NODE_IDS[number])) return

    if (node.data.detail && typeof node.data.detail === "string") {
      const title = typeof node.data.label === "string" ? node.data.label : String(node.data.label)
      setSelectedNode({ title, detail: node.data.detail })
    }
  }, [])

  /**
   * Gère la connexion entre nœuds (drag & drop)
   */
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  /**
   * Construit l'arbre progressivement quand les données arrivent
   */
  React.useEffect(() => {
    if (!mistralStrategyData) return

    setShowWorkflow(true)
    
    // Créer les nœuds et edges progressivement
    const strategyNodes = createNodesProgressively(mistralStrategyData)
    const strategyEdges = createEdgesProgressively(strategyNodes)
    
    // Mettre à jour immédiatement
    setNodes(strategyNodes)
    setEdges(strategyEdges)
    
    // Arrêter le loading si on a au moins le nom du projet
    if (mistralStrategyData.projectName) {
      setIsGenerating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mistralStrategyData])

  return (
    <div className="relative w-full h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header d'accueil */}
      <HomeHeader isVisible={!showWorkflow} onSubmit={handleSubmit} />

      {/* Canvas React Flow */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          showWorkflow ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
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
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls />
        </ReactFlow>

        {/* Panneau de détails */}
        <DetailPanel
          isOpen={!!selectedNode}
          onClose={() => setSelectedNode(null)}
          title={selectedNode?.title || ""}
          detail={selectedNode?.detail || ""}
        />
      </div>

      {/* Barre de prompt flottante */}
      <FloatingPromptBar
        isVisible={showWorkflow}
        initialIdea={idea}
        onSubmit={handleSubmit}
      />

      {/* Bouton d'export */}
      <ExportButton
        isVisible={showWorkflow && !isGenerating}
        strategyData={mistralStrategyData}
      />

      {/* Overlay de chargement */}
      {isGenerating && <LoadingOverlay />}
    </div>
  )
}
