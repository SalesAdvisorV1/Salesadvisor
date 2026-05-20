Tu es un senior fullstack developer. Refais entièrement l'interface de Sales Advisor de manière autonome et professionnelle. Travaille fichier par fichier sans t'arreter. Commit et push a la fin. Dis TAPE DEPLOY.

DECISIONS DESIGN FINALES :
- Fond blanc #ffffff, surfaces #f9fafb
- Sidebar w-64 avec icones ET labels (pas w-16)
- Header fixe avec breadcrumb et avatar
- Cards blanches avec border #e5e7eb et shadow-sm
- Boutons primaires bg-gray-900 text-white
- Inputs bg-white border-gray-300 rounded-lg
- Textes : gray-900 principal, gray-500 secondaire
- Animations fadeInUp sur les sections
- Graphiques sur le dashboard (recharts)
- Zero fond sombre dans l'app sauf widget credits

FICHIERS A MODIFIER :

1. src/components/layout/sidebar.tsx
Sidebar fixe w-64 bg-white border-r border-gray-200. Header : logo SA 32x32 bg-gray-900 rounded-xl + "Sales Advisor" font-bold + "Prospection B2B" text-gray-400. Section labels "NAVIGATION" text-xs uppercase tracking-wider text-gray-400 mb-2. Items nav flex gap-3 px-3 py-2.5 rounded-xl text-sm font-medium. Actif bg-gray-900 text-white. Inactif text-gray-600 hover:bg-gray-50 hover:text-gray-900. Icones SVG 18px. Logo SA = Link href="/" pour retour landing. Items : Dashboard, Prospect Finder, Assistance IA, Historique, Exports. Separateur. Facturation, Parametres. Widget credits en bas bg-gray-50 border border-gray-200 rounded-xl p-3 : badge PRO bg-gray-900 text-white, chiffre 92 text-xl font-bold, barre bg-gray-200 h-1.5 fill bg-gray-900.

2. src/components/layout/app-shell.tsx
Sidebar fixe w-64 + header fixe h-14 + contenu pl-64 pt-14 bg-gray-50.

3. src/components/layout/header.tsx
Fixe top-0 left-64 right-0 h-14 bg-white border-b border-gray-200 z-40. Breadcrumb gauche. Search centre bg-gray-50 border border-gray-200 rounded-xl. Avatar droite + cloche.

4. src/components/dashboard/stat-card.tsx
bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all. Icone coloree 36x36 rounded-lg. Label text-xs text-gray-500 uppercase tracking-wider mb-1. Valeur text-2xl font-bold text-gray-900. Sous-texte text-xs text-gray-400. Props : title, label, value, subtitle, sub, highlight, icon, trend.

5. src/components/dashboard/dashboard-view.tsx
Ajoute un graphique recharts LineChart sous les stat-cards montrant les recherches des 7 derniers jours (donnees fictives mais credibles). Import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'. Donnees : [{ day: 'Lun', recherches: 2 }, { day: 'Mar', recherches: 5 }, ...etc]. Card bg-white border border-gray-200 rounded-xl p-5 shadow-sm.

6. src/components/dashboard/activity-feed.tsx
bg-white border border-gray-200 rounded-xl p-5 shadow-sm. Timeline avec ligne grise gauche et points colores. Icone rond 32x32 bg-blue-50 text-blue-600 pour recherches. Titre text-sm font-medium text-gray-900. Meta text-xs text-gray-500. Date text-xs text-gray-400 ml-auto. Props items et activities.

7. src/components/dashboard/credits-overview.tsx
bg-gray-900 text-white rounded-xl p-5 shadow-sm. Badge PRO bg-white text-gray-900 text-xs px-2 py-0.5 rounded-full font-bold. Chiffre text-4xl font-black. Barre bg-white/20 h-2 fill bg-white. Grid 2x2 bg-white/10 rounded-lg p-3. Props credits, totalCredits, plan, creditsRemaining, creditsTotal.

8. src/components/dashboard/priority-prospects.tsx
bg-white border border-gray-200 rounded-xl p-5 shadow-sm. Avatar 32x32 rounded-lg avec initiale. Score badge colore vert si >85 orange si >70. Props prospects et items.

9. src/components/dashboard/search-history-panel.tsx
bg-white border border-gray-200 rounded-xl p-5 shadow-sm. Items avec hover:bg-gray-50. Badge count bg-gray-100 text-gray-700 rounded-full. Props searches et items.

10. src/components/dashboard/dashboard-header.tsx
Simple div flex justify-between. Titre text-2xl font-bold text-gray-900. Bouton "Nouvelle recherche" bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800.

11. src/components/prospect-finder/prospect-search-form.tsx
Tous inputs bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 focus:outline-none. Select pareil. Labels text-xs font-medium text-gray-700 uppercase tracking-wider mb-1.5. Bouton submit bg-gray-900 text-white rounded-xl py-3.5 font-semibold hover:bg-gray-800 w-full transition-all.

12. src/components/prospect-finder/prospect-finder-view.tsx
Supprime "Module 2". Layout bg-white border border-gray-200 rounded-xl shadow-sm pour les deux panels. Zone prospection : fond blanc avec grille de points gris clair, point pulsant central.

13. src/components/prospect-finder/prospect-result-card.tsx
bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all. Badge score vert si >85 orange si >70 rouge sinon. Grid 2 colonnes pour infos. Liens cliquables hover:text-gray-900.

14. src/components/ai-assistant/ai-assistant-view.tsx
Supprime "Module 3". Panels bg-white border border-gray-200 rounded-xl shadow-sm. Tous les inputs bg-white border border-gray-300. Bouton bg-gray-900 text-white.

15. src/components/ai-assistant/prospect-input-form.tsx
Memes corrections inputs. Bouton bg-gray-900 text-white rounded-xl.

16. src/components/ai-assistant/ai-result-card.tsx
bg-white border border-gray-200 rounded-xl p-5. Sections Points forts bg-green-50 border border-green-100 rounded-xl. Opportunites bg-blue-50 border border-blue-100 rounded-xl.

17. src/components/history/history-view.tsx
Supprime "Module 4". Layout bg-white border border-gray-200 rounded-xl shadow-sm.

18. src/components/history/history-table.tsx
Lignes alternees blanc/gray-50. Hover bg-gray-50. Actif bg-gray-900 text-white rounded-xl. Badges tags bg-gray-100 text-gray-600 rounded-full text-xs. Types compatibles avec src/types/history.ts.

19. src/components/history/history-detail.tsx
bg-white border border-gray-200 rounded-xl p-5. Prospect cards bg-gray-50 rounded-lg. Bouton relancer bg-gray-900 text-white.

20. src/components/exports/exports-view.tsx
Garde logique fetch/CSV. bg-white border border-gray-200 rounded-xl. Items hover:bg-gray-50. Bouton CSV bg-gray-900 text-white rounded-lg. Telechargé bg-green-50 text-green-700 border border-green-200.

21. src/components/settings/settings-view.tsx
Sections bg-white border border-gray-200 rounded-xl p-6 shadow-sm. Inputs bg-white border border-gray-300 rounded-xl. Bouton save bg-gray-900 text-white. Toggles bg-gray-900 quand actifs.

22. src/components/billing/billing-view.tsx
Plans en cards bg-white border border-gray-200 rounded-xl p-6. Plan Pro bg-gray-900 text-white. Features avec checkmarks verts. Boutons bg-gray-900 text-white.

23. src/app/page.tsx
Hero : image fond unsplash https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920 overlay noir/60. Titre blanc massif. CTAs. Stats strip bg-white. Features 3 cards bg-white shadow-sm avec photos unsplash de personnes au travail. Testimonials 3 cards avec avatars. Pricing : Starter bg-white, Pro bg-gray-900 text-white, Business bg-white. Footer bg-gray-900 text-white. Header : logo SA bg-gray-900 + nav + boutons. Logo = Link href="/" retour accueil.

IMPORTANT : recharts est deja installe. Verifie compatibilite TypeScript avec src/types/. Ne casse pas les props existantes. Build doit passer. git add . && git commit -m "refonte complete UI finale" && git push origin master. Puis ecris : TAPE DEPLOY
