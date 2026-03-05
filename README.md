# AMFPR - Amicale des Femmes de la Présidence de la République

Une plateforme web moderne pour l'Amicale des Femmes de la Présidence de la République du Sénégal. Ce projet permet de gérer les activités, les publications, et une galerie photo interactive, tout en offrant une interface d'administration complète.

## 🚀 Technologies utilisées

- **Framework** : [Next.js 15+](https://nextjs.org/) (App Router)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Base de données** : [PostgreSQL](https://www.postgresql.org/) avec [Prisma ORM](https://www.prisma.io/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Gestion d'images** : [Cloudinary](https://cloudinary.com/)
- **Composants UI** : [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)

## ✨ Fonctionnalités

### Site Public
- **Accueil** : Présentation dynamique avec Hero section animée.
- **À Propos** : Mot de la Présidente et historique de l'amicale.
- **Galerie** : Albums photos avec mise en page Masonry et Lightbox interactif.
- **Actualités** : Flux des dernières activités et publications.
- **Contact** : Formulaire de contact avec validation et Google Maps intégrée.

### Panneau Administration
- **Dashboard** : Vue d'ensemble des contenus.
- **Gestion des Galeries** : Création d'albums, upload multiple de photos, gestion du statut public.
- **Gestion des Articles** : Éditeur complet pour les actualités et publications.
- **Sécurité** : Interface protégée par authentification.

## 🛠️ Installation Locale

1. **Cloner le projet**
   ```bash
   git clone https://github.com/DS1003/amfpr.git
   cd amfpr
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   Créez un fichier `.env` à la racine et remplissez les variables suivantes :
   ```env
   DATABASE_URL="votre_url_postgresql"
   DIRECT_URL="votre_url_direct_postgresql"
   
   CLOUDINARY_CLOUD_NAME="vorte_name"
   CLOUDINARY_API_KEY="votre_key"
   CLOUDINARY_API_SECRET="votre_secret"
   
   AUTH_SECRET="un_code_secret_aleatoire"
   ```

4. **Initialiser la base de données**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

## 📦 Déploiement sur Vercel

Le projet est optimisé pour un déploiement en un clic sur **Vercel**.
Assurez-vous de configurer les variables d'environnement dans le tableau de bord Vercel et d'augmenter la limite de taille des Server Actions (`bodySizeLimit`) si nécessaire pour les gros uploads d'images.

---
© 2026 AFPR — Amicale des Femmes de la Présidence de la République SENEGAL.
