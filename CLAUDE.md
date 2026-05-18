# Sales Advisor — Contexte pour Claude Code

## Produit
Plateforme SaaS de prospection commerciale assistée par IA.
Inspirée de Lusha / Apollo mais plus légère et simple.
Cible : commerciaux, SDR, freelances, petites équipes B2B.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Shadcn/ui
- Supabase (base de données + auth)
- Zustand (state management)
- React Query (data fetching)
- OpenAI API (IA)
- Vercel (déploiement)

## Modules à construire dans cet ordre
1. Dashboard utilisateur (sidebar, stats, crédits restants, historique)
2. Prospect Finder (recherche entreprise + enrichissement données)
3. Assistance IA (résumé prospect, génération pitch, préparation appel)
4. Historique des recherches
5. Système de crédits + authentification

## Règles de développement
- MVP d'abord, perfectionnement ensuite
- Pas de complexité inutile
- Composants dans /components
- Pages dans /app
- API routes dans /app/api
- Types dans /types
- UI avec Shadcn/ui + Tailwind uniquement
- TypeScript strict partout

## Philosophie
Aller vite, livrer quelque chose de fonctionnel, améliorer ensuite.
L'utilisateur n'est pas développeur — le code doit être propre et autonome.