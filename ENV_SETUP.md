# Configuration de l'environnement

## Variables d'environnement requises

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```bash
# Clé API Mistral AI
MISTRAL_API_KEY=votre_cle_api_mistral_ici
```

## Obtenir une clé API Mistral

1. Allez sur [https://console.mistral.ai/](https://console.mistral.ai/)
2. Créez un compte ou connectez-vous
3. Allez dans "API Keys"
4. Créez une nouvelle clé API
5. Copiez la clé et ajoutez-la dans votre fichier `.env.local`

## Test de l'intégration

Une fois la clé configurée, l'application utilisera automatiquement Mistral AI pour générer les stratégies.

En cas d'erreur (clé manquante ou invalide), l'application utilisera des données de démonstration.
