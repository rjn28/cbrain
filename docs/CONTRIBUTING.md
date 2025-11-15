# 🤝 Guide de contribution

## 📋 Conventions de code

### Structure des fichiers

```typescript
/**
 * Description du fichier
 */

// 1. Imports externes (React, Next.js, etc.)
import React from "react"

// 2. Imports internes (types, config, etc.)
import type { MistralStrategyData } from "@/types/strategy"
import { MAIN_NODE_IDS } from "@/config/nodes"

// 3. Imports de composants
import { HomeHeader } from "./home/HomeHeader"

// 4. Types/Interfaces
interface ComponentProps {
  // ...
}

// 5. Constantes locales
const LOCAL_CONSTANT = "value"

// 6. Composant principal
export function Component({ props }: ComponentProps) {
  // ...
}
```

### Nommage

#### Fichiers
- Composants : `PascalCase.tsx` (ex: `HomeHeader.tsx`)
- Utilitaires : `kebab-case.ts` (ex: `mistral-strategy-parser.ts`)
- Configuration : `kebab-case.ts` (ex: `animation.ts`)
- Types : `kebab-case.ts` (ex: `strategy.ts`)

#### Variables et fonctions
```typescript
// Composants React
export function MyComponent() {}

// Fonctions utilitaires
export function createNodesFromMistral() {}

// Constantes
export const ANIMATION_DURATION = 3200

// Variables d'état
const [isLoading, setIsLoading] = useState(false)

// Handlers
const handleSubmit = () => {}
const onNodeClick = () => {}
```

#### Types
```typescript
// Interfaces
interface MistralStrategyData {}

// Types
type NodeId = string

// Props
interface ComponentProps {}
```

### Documentation

#### JSDoc obligatoire pour :
- Fonctions exportées
- Composants complexes
- Utilitaires

```typescript
/**
 * Crée les nœuds React Flow à partir de la stratégie Mistral
 * @param strategy - Données de stratégie générées par Mistral
 * @returns Liste des nœuds pour React Flow
 */
export function createNodesFromMistral(strategy: MistralStrategyData): Node[] {
  // ...
}
```

#### Commentaires inline
```typescript
// Commentaire court pour une ligne
const value = calculate()

/**
 * Commentaire multi-lignes
 * pour expliquer une logique complexe
 */
const complexLogic = () => {
  // ...
}
```

### Organisation des composants

#### Composant simple
```typescript
interface Props {
  title: string
  onClose: () => void
}

export function SimpleComponent({ title, onClose }: Props) {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
```

#### Composant avec état
```typescript
export function StatefulComponent({ initialValue }: Props) {
  // 1. États
  const [value, setValue] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)

  // 2. Refs
  const inputRef = useRef<HTMLInputElement>(null)

  // 3. Callbacks
  const handleSubmit = useCallback(() => {
    // ...
  }, [dependencies])

  // 4. Effects
  useEffect(() => {
    // ...
  }, [dependencies])

  // 5. Render
  return <div>...</div>
}
```

### TypeScript

#### Types stricts
```typescript
// ✅ Bon
interface User {
  id: string
  name: string
  email: string
}

// ❌ Éviter
interface User {
  id: any
  name: string
  email?: string | null | undefined
}
```

#### Typage des props
```typescript
// ✅ Bon
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  // ...
}

// ❌ Éviter
export function Button(props: any) {
  // ...
}
```

### Gestion des erreurs

```typescript
// ✅ Bon
try {
  const data = await fetchData()
  return data
} catch (error) {
  console.error("Erreur lors du fetch:", error)
  throw new Error("Impossible de récupérer les données")
}

// ❌ Éviter
try {
  const data = await fetchData()
  return data
} catch (e) {
  console.log(e)
}
```

### Performance

#### useCallback pour les handlers
```typescript
// ✅ Bon
const handleClick = useCallback(() => {
  doSomething()
}, [dependencies])

// ❌ Éviter (re-création à chaque render)
const handleClick = () => {
  doSomething()
}
```

#### Éviter les re-renders inutiles
```typescript
// ✅ Bon - Composant séparé
function ExpensiveComponent({ data }: Props) {
  return <div>{/* ... */}</div>
}

// ❌ Éviter - Inline dans le parent
function Parent() {
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{/* ... */}</div>
      ))}
    </div>
  )
}
```

## 🧪 Tests

### Avant de commit
```bash
# Build
npm run build

# Vérifier les types
npx tsc --noEmit

# Linter (si configuré)
npm run lint
```

## 📦 Ajout de fonctionnalités

### 1. Nouveau composant
1. Créer le fichier dans le bon dossier (`components/home/`, `components/workflow/`, etc.)
2. Ajouter JSDoc
3. Exporter le composant
4. Importer dans le composant parent
5. Tester le build

### 2. Nouvelle configuration
1. Créer le fichier dans `config/`
2. Exporter les constantes
3. Documenter dans `ARCHITECTURE.md`

### 3. Nouveau type
1. Ajouter dans `types/`
2. Exporter le type
3. Utiliser dans les composants

## 🎨 Style

### Tailwind CSS
- Utiliser les classes utilitaires
- Éviter les styles inline
- Grouper les classes par catégorie

```typescript
// ✅ Bon
<div className="
  flex items-center justify-center
  px-4 py-2
  bg-blue-600 hover:bg-blue-700
  text-white font-medium
  rounded-lg shadow-lg
  transition-all duration-300
">
  Button
</div>

// ❌ Éviter
<div className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300">
  Button
</div>
```

## 🚀 Déploiement

### Checklist avant déploiement
- [ ] Build réussi (`npm run build`)
- [ ] Pas d'erreurs TypeScript
- [ ] Variables d'environnement configurées sur Netlify
- [ ] Tests manuels effectués
- [ ] Documentation mise à jour

### Commande de déploiement
```bash
netlify deploy --prod
```

## 📝 Commit messages

Format : `type: description`

Types :
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `refactor`: Refactoring
- `docs`: Documentation
- `style`: Formatage
- `perf`: Performance
- `test`: Tests

Exemples :
```
feat: add detail panel animation
fix: resolve node click handler issue
refactor: extract HomeHeader component
docs: update ARCHITECTURE.md
```

## 🐛 Debugging

### Outils
- React DevTools
- Network tab (requêtes API)
- Console (logs)
- Netlify logs (production)

### Logs utiles
```typescript
// Development
console.log("Debug:", data)

// Production (à retirer avant commit)
console.error("Erreur critique:", error)
```

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Flow Documentation](https://reactflow.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
