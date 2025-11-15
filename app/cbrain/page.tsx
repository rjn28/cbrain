"use client"

import { useState } from "react"
import { CbrainCanvas } from "@/components/cbrain-canvas"
import type { MistralStrategyData } from "@/types/strategy"

export default function CbrainPage() {
  const [strategyData, setStrategyData] = useState<MistralStrategyData | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleGenerate = async (idea: string) => {
    console.log("Génération pour:", idea)
    setError(undefined)
    
    try {
      // Appeler l'API Mistral
      const response = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la génération')
      }

      const data = await response.json()
      console.log("Stratégie générée:", data)
      setStrategyData(data)
      
    } catch (err) {
      console.error("Erreur:", err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      
      // En cas d'erreur, utiliser des données de démonstration
      setStrategyData({
        titreProjet: "Projet Demo",
        ideeCourte: idea,
        strategie: {
          persona: "Utilisateurs cibles",
          personaDetail: "Détails du persona : démographie, comportements, besoins et motivations des utilisateurs cibles. Ces informations permettent de mieux comprendre qui sont les utilisateurs et comment les servir efficacement.\n\nLe persona représente l'archétype de l'utilisateur idéal, avec ses caractéristiques démographiques, ses habitudes et ses attentes. Cette compréhension approfondie guide toutes les décisions de conception et de développement.\n\nEn analysant les besoins et les freins du persona, nous pouvons créer une expérience utilisateur optimale qui répond précisément à leurs attentes et résout leurs problèmes de manière efficace.",
          probleme: "Problème à résoudre",
          problemeDetail: "Analyse détaillée du problème : contexte, impact et conséquences. Ce problème affecte significativement les utilisateurs et nécessite une solution innovante et efficace.\n\nLe problème identifié représente un point de friction majeur dans le quotidien des utilisateurs. Son impact se mesure en termes de temps perdu, de frustration et de coûts associés.\n\nEn résolvant ce problème, nous apportons une valeur ajoutée significative qui améliore la qualité de vie des utilisateurs et crée un avantage compétitif durable.",
          objectif: "Objectif principal",
          objectifDetail: "Détails de l'objectif : métriques de succès, timeline et impact attendu. L'objectif vise à transformer la manière dont les utilisateurs interagissent avec le service.\n\nNous visons des résultats mesurables à court et moyen terme, avec des indicateurs clés de performance clairement définis. La timeline est réaliste et permet une mise en œuvre progressive.\n\nL'impact attendu se mesure en termes d'adoption utilisateur, de satisfaction client et de croissance du business. La vision long terme positionne le projet comme un leader dans son domaine."
        },
        produit: {
          concept: "Concept du produit",
          conceptDetail: "Description complète du concept : valeur ajoutée unique, différenciation par rapport aux concurrents et positionnement marché stratégique.\n\nLe concept repose sur une approche innovante qui combine technologie de pointe et expérience utilisateur exceptionnelle. Cette combinaison crée une proposition de valeur difficile à reproduire.\n\nLe positionnement marché est clairement défini, ciblant un segment spécifique avec des besoins non satisfaits. La différenciation s'appuie sur des fonctionnalités uniques et une exécution supérieure.",
          feature1: "Fonctionnalité 1",
          feature1Detail: "Explication détaillée de la fonctionnalité 1 : mécanisme de fonctionnement, bénéfices directs pour l'utilisateur et approche d'implémentation technique.\n\nCette fonctionnalité résout un besoin critique des utilisateurs en offrant une solution intuitive et performante. L'interface est conçue pour minimiser la courbe d'apprentissage.\n\nL'implémentation technique s'appuie sur des technologies éprouvées, garantissant fiabilité et scalabilité. Les tests utilisateurs ont validé l'approche et confirmé la valeur ajoutée.",
          feature2: "Fonctionnalité 2",
          feature2Detail: "Explication détaillée de la fonctionnalité 2 : mécanisme de fonctionnement, bénéfices directs pour l'utilisateur et approche d'implémentation technique.\n\nCette seconde fonctionnalité complète la première en ajoutant une dimension collaborative et sociale. Elle encourage l'engagement et la rétention des utilisateurs.\n\nL'architecture technique permet une intégration fluide avec les systèmes existants. La performance est optimisée pour garantir une expérience utilisateur rapide et réactive."
        },
        stack: {
          frontend: "React + Next.js",
          frontendDetail: "Justification du choix frontend : React et Next.js offrent un écosystème mature avec d'excellentes performances et une expérience développeur optimale.\n\nNext.js apporte le rendu côté serveur, l'optimisation automatique des images et un routing intuitif. Ces fonctionnalités accélèrent le développement et améliorent les performances.\n\nL'écosystème React est riche en bibliothèques et composants réutilisables. La scalabilité est garantie par l'architecture modulaire et les bonnes pratiques établies.",
          backend: "Node.js + PostgreSQL",
          backendDetail: "Justification du choix backend : Node.js offre des performances exceptionnelles pour les applications temps réel, tandis que PostgreSQL garantit la fiabilité des données.\n\nL'architecture backend est conçue pour la scalabilité horizontale, permettant de gérer une croissance importante du trafic. La sécurité est intégrée à tous les niveaux.\n\nPostgreSQL offre des fonctionnalités avancées comme les transactions ACID et les requêtes complexes. La maintenance est simplifiée grâce à une communauté active et une documentation exhaustive.",
          partenaires: "Partenaires clés",
          partenairesDetail: "Rôle des partenaires : les intégrations avec Mistral, Fal, ElevenLabs et Qdrant apportent des capacités IA avancées sans nécessiter de développement from scratch.\n\nChaque partenaire apporte une expertise spécifique : génération de contenu, création d'images, synthèse vocale et recherche vectorielle. Ces synergies créent une expérience utilisateur enrichie.\n\nLes APIs des partenaires sont bien documentées et fiables, facilitant l'intégration. Le modèle de pricing est transparent et scalable avec la croissance du projet."
        },
        planning: {
          etape1: "Étape 1: Design",
          etape1Detail: "Détails de l'étape Design : création des maquettes, définition de l'architecture et validation avec les utilisateurs. Durée estimée : 4 semaines.\n\nLes tâches incluent la recherche utilisateur, le wireframing, le design système et les tests d'utilisabilité. Les livrables comprennent les maquettes finales et le guide de style.\n\nLes ressources nécessaires incluent un designer UX/UI senior et des outils de prototypage. Les risques principaux sont les retards dans la validation utilisateur.",
          etape2: "Étape 2: Développement",
          etape2Detail: "Détails de l'étape Développement : implémentation du frontend et backend, intégration des APIs et tests unitaires. Durée estimée : 8 semaines.\n\nLes tâches incluent le setup de l'infrastructure, le développement des fonctionnalités core et l'intégration continue. Les livrables comprennent le MVP fonctionnel et la documentation technique.\n\nLes ressources nécessaires incluent 2 développeurs fullstack et un DevOps. Les risques principaux sont les dépendances techniques et les bugs critiques.",
          etape3: "Étape 3: Lancement",
          etape3Detail: "Détails de l'étape Lancement : déploiement en production, monitoring et support utilisateur. Durée estimée : 4 semaines.\n\nLes tâches incluent les tests de charge, le déploiement progressif et la formation des utilisateurs. Les livrables comprennent l'application en production et les métriques de performance.\n\nLes ressources nécessaires incluent l'équipe complète et un budget marketing. Les risques principaux sont les problèmes de scalabilité et l'adoption utilisateur."
        },
        agents: {
          mistral: "Génération de contenu",
          mistralDetail: "Cas d'usage détaillés de Mistral AI : génération automatique de descriptions, suggestions personnalisées et modération de contenu. L'intégration se fait via l'API REST.\n\nMistral permet de créer du contenu de qualité à grande échelle, réduisant le temps de production de 80%. Les modèles sont fine-tunés pour le domaine spécifique du projet.\n\nLes bénéfices incluent une meilleure expérience utilisateur grâce à des suggestions pertinentes et une réduction des coûts opérationnels. La performance est optimale avec des temps de réponse inférieurs à 2 secondes.",
          fal: "Génération d'images",
          falDetail: "Cas d'usage détaillés de Fal.ai : création automatique de visuels, personnalisation d'images et génération de variations. L'intégration utilise l'API Fal avec des webhooks.\n\nFal.ai permet de générer des images de haute qualité en quelques secondes, éliminant le besoin de designers pour les assets standards. Les styles sont cohérents avec l'identité visuelle.\n\nLes bénéfices incluent une réduction des coûts de production graphique de 70% et une capacité à tester rapidement différentes variations. La qualité des images générées est comparable à celle de designers professionnels.",
          elevenlabs: "Synthèse vocale",
          elevenlabsDetail: "Cas d'usage détaillés de ElevenLabs : création de voix synthétiques naturelles, narration automatique et accessibilité audio. L'intégration se fait via l'API REST avec streaming.\n\nElevenLabs offre des voix d'une qualité exceptionnelle, indiscernables de voix humaines. Le support multilingue permet de toucher une audience internationale.\n\nLes bénéfices incluent une meilleure accessibilité pour les utilisateurs malvoyants et une expérience audio premium. Les coûts sont réduits de 90% par rapport à des enregistrements studio.",
          qdrant: "Recherche sémantique",
          qdrantDetail: "Cas d'usage détaillés de Qdrant : recherche vectorielle avancée, recommandations personnalisées et clustering de contenu. L'intégration utilise l'API gRPC pour des performances optimales.\n\nQdrant permet de trouver du contenu similaire avec une précision exceptionnelle, améliorant la découvrabilité de 300%. Les embeddings sont générés avec des modèles state-of-the-art.\n\nLes bénéfices incluent une meilleure rétention utilisateur grâce à des recommandations pertinentes et une réduction du temps de recherche. La scalabilité est garantie jusqu'à des milliards de vecteurs."
        }
      })
    }
  }

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <p className="font-bold">Erreur</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-1">Utilisation des données de démonstration</p>
        </div>
      )}
      <CbrainCanvas onGenerate={handleGenerate} mistralStrategyData={strategyData} />
    </>
  )
}
