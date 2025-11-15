#!/bin/bash

# Script d'automatisation pour créer le repo GitHub
# Usage: ./scripts/setup-github.sh

set -e

echo "🚀 Configuration du repo GitHub pour cbrain"
echo "============================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier si Git est installé
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git n'est pas installé${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Étape 1: Vérification du repo local${NC}"
if [ -d .git ]; then
    echo -e "${GREEN}✅ Repo Git déjà initialisé${NC}"
else
    echo "Initialisation du repo Git..."
    git init
    echo -e "${GREEN}✅ Repo Git initialisé${NC}"
fi

echo ""
echo -e "${BLUE}📝 Étape 2: Ajout des fichiers${NC}"
git add .
echo -e "${GREEN}✅ Fichiers ajoutés${NC}"

echo ""
echo -e "${BLUE}💾 Étape 3: Création du commit${NC}"
git commit -m "feat: initial commit - cbrain strategy generator with Mistral AI" || echo "Commit déjà créé ou rien à commiter"
echo -e "${GREEN}✅ Commit créé${NC}"

echo ""
echo -e "${BLUE}🌐 Étape 4: Configuration du remote${NC}"
echo ""
echo "Entrez votre nom d'utilisateur GitHub:"
read -r GITHUB_USERNAME

REPO_NAME="cbrain-strategy-generator"
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Vérifier si le remote existe déjà
if git remote | grep -q "^origin$"; then
    echo "Remote 'origin' existe déjà. Voulez-vous le remplacer? (y/n)"
    read -r REPLACE
    if [ "$REPLACE" = "y" ]; then
        git remote remove origin
        git remote add origin "$REPO_URL"
        echo -e "${GREEN}✅ Remote mis à jour${NC}"
    fi
else
    git remote add origin "$REPO_URL"
    echo -e "${GREEN}✅ Remote ajouté${NC}"
fi

echo ""
echo -e "${BLUE}🚀 Étape 5: Push vers GitHub${NC}"
echo ""
echo "⚠️  Assurez-vous d'avoir créé le repo sur GitHub:"
echo "   https://github.com/new"
echo ""
echo "Nom du repo: $REPO_NAME"
echo "Description: 🧠 AI-powered strategy generator with Mistral AI"
echo ""
echo "Appuyez sur Entrée quand le repo est créé..."
read -r

git branch -M main
git push -u origin main

echo ""
echo -e "${GREEN}✅ Repo poussé vers GitHub!${NC}"
echo ""
echo "🎉 Configuration terminée!"
echo ""
echo "Votre repo est disponible à:"
echo "https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""
echo "Prochaines étapes:"
echo "1. Configurer les secrets GitHub (MISTRAL_API_KEY)"
echo "2. Configurer le déploiement automatique Netlify"
echo "3. Ajouter des badges au README"
