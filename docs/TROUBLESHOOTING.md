# Guide de Dépannage

## Erreur 429 : Service Capacity Exceeded

### Qu'est-ce que c'est ?
L'erreur 429 signifie que l'API Mistral a atteint sa limite de capacité. Cela peut arriver quand :
- Trop de requêtes sont envoyées en peu de temps
- Le service Mistral est sous forte charge
- Votre plan API a atteint sa limite de requêtes

### Solutions Automatiques Implémentées

✅ **Retry automatique** : Le système réessaie automatiquement 3 fois avec des délais croissants (1s, 2s, 4s)

✅ **Fallback vers données de démo** : Si toutes les tentatives échouent, le système utilise des données de démonstration

### Solutions Manuelles

#### 1. Attendre et réessayer
La solution la plus simple : attendez 30-60 secondes et réessayez votre requête.

#### 2. Utiliser le mode démo (développement)
Ajoutez dans votre fichier `.env.local` :
```bash
USE_DEMO_DATA=true
```

Puis redémarrez le serveur :
```bash
npm run dev
```

#### 3. Vérifier votre clé API
Assurez-vous que votre clé API Mistral est valide :
```bash
# Dans .env.local
MISTRAL_API_KEY=votre_cle_api_ici
```

#### 4. Espacer vos requêtes
Si vous testez l'application, attendez quelques secondes entre chaque génération de stratégie.

## Autres Erreurs Courantes

### Erreur : "Mistral API key missing"
**Cause** : La variable d'environnement `MISTRAL_API_KEY` n'est pas définie

**Solution** :
1. Créez un fichier `.env.local` à la racine du projet
2. Ajoutez : `MISTRAL_API_KEY=votre_cle_api`
3. Redémarrez le serveur

### Erreur : "Invalid response format"
**Cause** : La réponse de Mistral n'est pas au format JSON attendu

**Solution** : Cette erreur est généralement temporaire. Le système tente automatiquement de corriger le JSON. Si l'erreur persiste, réessayez.

### L'arbre ne s'affiche pas
**Causes possibles** :
- Erreur API non gérée
- Données mal formatées
- Problème de connexion

**Solutions** :
1. Ouvrez la console du navigateur (F12)
2. Regardez les erreurs dans l'onglet Console
3. Vérifiez l'onglet Network pour voir les requêtes API
4. Activez le mode démo pour tester sans API

### Réponses trop lentes
**Optimisations déjà implémentées** :
- Modèle plus rapide (`open-mistral-7b`)
- Tokens réduits (3000 au lieu de 6000)
- Température basse (0.3) pour réponses plus rapides

**Si toujours lent** :
- Vérifiez votre connexion internet
- Essayez à un moment différent (moins de charge sur l'API)
- Utilisez le mode démo pour le développement

## Logs et Debugging

### Voir les logs en développement
```bash
npm run dev
```
Les logs s'affichent dans le terminal

### Voir les logs en production (Netlify)
1. Allez sur [Netlify Dashboard](https://app.netlify.com)
2. Sélectionnez votre site
3. Cliquez sur "Functions" dans le menu
4. Consultez les logs de chaque fonction

### Activer les logs détaillés
Dans vos fichiers API, les logs sont déjà activés :
- Tentatives de retry
- Erreurs API
- Temps de réponse

## Contacter le Support

Si le problème persiste :
1. Vérifiez que vous utilisez la dernière version du code
2. Consultez les [issues GitHub](https://github.com/rjn28/cbrain/issues)
3. Créez une nouvelle issue avec :
   - Description du problème
   - Message d'erreur complet
   - Étapes pour reproduire
   - Logs pertinents

## Ressources Utiles

- [Documentation Mistral AI](https://docs.mistral.ai/)
- [Limites de l'API Mistral](https://docs.mistral.ai/platform/limits/)
- [Status Mistral](https://status.mistral.ai/)
