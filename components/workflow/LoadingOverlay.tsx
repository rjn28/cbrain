/**
 * Composant overlay de chargement pendant la génération
 */

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-lg font-semibold text-gray-900">
          Génération de votre stratégie...
        </p>
        <p className="text-sm text-gray-600">Analyse en cours avec Mistral AI</p>
      </div>
    </div>
  )
}
