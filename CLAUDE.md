# Sales Advisor — Contexte pour Claude Code

## Produit
Plateforme SaaS de prospection commerciale assistee par IA.
Inspiree de Lusha / Apollo mais plus legere et simple.
Cible : commerciaux, SDR, freelances, petites equipes B2B.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + Shadcn/ui
- Supabase (base de donnees + auth)
- Zustand (state management)
- OpenAI API (IA)
- PM2 (process manager)
- VPS Hostinger 72.62.185.69

## Projet
- Code : /var/www/salesadvisor
- GitHub : https://github.com/SalesAdvisorV1/salesadvisor
- App : http://72.62.185.69:3000

## Modules
1. Dashboard (stats, credits, historique)
2. Prospect Finder (recherche B2B)
3. Assistance IA (resume, pitch, prep appel)
4. Historique des recherches
5. Billing + credits
6. Auth Supabase

## Regles
- MVP d'abord, perfection ensuite
- Apres chaque modif : npm run build + pm2 restart salesadvisor
- Pusher sur GitHub apres chaque session
- Ne pas demander de validation a chaque etape

## Utilisateur
Victor — commercial, non developpeur, pilote via instructions.
