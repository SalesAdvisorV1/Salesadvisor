Refonte totale Sales Advisor niveau production SaaS 2024. Travaille de manière 100% autonome fichier par fichier. Git add + commit + push a la fin. Dis TAPE DEPLOY quand termine.

STYLE : fond blanc #ffffff et gris #f8f9fa, sidebar icones seules w-16 avec tooltips, header fixe h-14 avec breadcrumb + searchbar + avatar, cards blanches ombres subtiles rounded-2xl, animations fadeInUp sur tous les elements, accents noir #000.

ANIMATIONS - ajoute dans src/app/globals.css :
@keyframes fadeInUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
@keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
.animate-fade-up { animation: fadeInUp 0.5s ease forwards; }
.animation-delay-100 { animation-delay:100ms; }
.animation-delay-200 { animation-delay:200ms; }
.animation-delay-300 { animation-delay:300ms; }
.skeleton { background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; }

SIDEBAR - src/components/layout/sidebar.tsx :
Fixe w-16 bg-white border-r border-gray-100 shadow-sm h-screen z-50. Logo SA 40x40 bg-black rounded-xl text-white font-black en haut. Nav items : icones seules 40x40 rounded-xl, actif bg-black text-white, inactif text-gray-400 hover:bg-gray-100 hover:text-gray-900. Tooltip au hover : label a droite bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100. Items : Dashboard (grille), Prospect Finder (loupe), Assistance IA (etoile), Historique (horloge), Exports (download). Separateur puis Facturation et Parametres. Avatar V en bas.

HEADER - nouveau fichier src/components/layout/header.tsx :
Fixe top-0 left-16 right-0 h-14 bg-white border-b border-gray-100 shadow-sm z-40. Gauche : breadcrumb "Sales Advisor / NomPage". Centre : input recherche rapide bg-gray-50 border border-gray-200 rounded-xl pl-9. Droite : cloche notification avec point rouge + avatar Victor bg-black rounded-full.

APP-SHELL - src/components/layout/app-shell.tsx :
Import Header et Sidebar. Layout : sidebar fixe w-16 + div pl-16 avec Header fixe + main pt-14 p-8 bg-gray-50.

STAT-CARD - src/components/dashboard/stat-card.tsx :
bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all animate-fade-up. Icone coloree 40x40 rounded-xl en haut (search=bleu, users=vert, star=violet, credit=orange). Label text-sm text-gray-500 mt-4. Valeur text-3xl font-black text-gray-900. Badge tendance vert/rouge en bas si fourni. Supporte props : title, label, value, subtitle, sub, highlight, icon, trend.

ACTIVITY-FEED - src/components/dashboard/activity-feed.tsx :
bg-white border border-gray-100 rounded-2xl p-6 shadow-sm. Timeline verticale : ligne grise absolute gauche, points colores par type (bleu pour search). Header avec badge count. Supporte props items et activities.

CREDITS-OVERVIEW - src/components/dashboard/credits-overview.tsx :
bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white shadow-lg. Chiffre grand blanc. Barre blanche sur fond gris fonce. Grid 2x2 bg-white/10. Supporte props credits, totalCredits, plan, creditsRemaining, creditsTotal.

PRIORITY-PROSPECTS - src/components/dashboard/priority-prospects.tsx :
bg-white border border-gray-100 rounded-2xl p-6 shadow-sm. Avatar colore avec initiale (vert si score>85, orange si >70, rouge sinon). Nom bold, meta gris, badge score colore. Supporte props prospects et items.

SEARCH-HISTORY-PANEL - src/components/dashboard/search-history-panel.tsx :
bg-white border border-gray-100 rounded-2xl p-6 shadow-sm. Liste avec icone secteur, titre bold, meta gris, badge count noir. Supporte props searches et items.

DASHBOARD-HEADER - src/components/dashboard/dashboard-header.tsx :
Simple : titre text-2xl font-black text-gray-900 + sous-titre text-gray-500. Pas de header ici, c est dans app-shell. Garde prop userName.

PROSPECT-RESULT-CARD - src/components/prospect-finder/prospect-result-card.tsx :
bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200. Badge score colore (vert>85, orange>70, rouge sinon). Grid infos 2 colonnes. Liens email tel linkedin cliquables. Raison en italique gris en bas.

HISTORY-TABLE - src/components/history/history-table.tsx :
Pas de container. Lignes alternees : pair bg-white, impair bg-gray-50. Hover bg-blue-50. Actif bg-blue-50 border-l-2 border-blue-600. Badges tags arrondis gris. Supporte props entries, selectedId, onSelect. Types compatibles avec src/types/history.ts (country:string, radius:string, prospects:ProspectResult[]).

LANDING PAGE - src/app/page.tsx :
Hero : image fond unsplash https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920 avec overlay noir/60, titre blanc massif, 2 CTA. Stats strip blanc. Features avec 3 photos unsplash de personnes au travail (https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800, https://images.unsplash.com/photo-1551434678-e076c223a692?w=800, https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800). Section testimonials avec 3 faux avis et avatars unsplash. Pricing existant garde. Footer propre.

IMPORTANT : verifie que tous les types TypeScript sont compatibles avec les fichiers existants dans src/types/. Ne casse pas les props existantes, ajoute des props optionnelles si besoin. Build doit passer sans erreur TypeScript. Git add . && git commit -m "refonte radicale UI blanc animations photos" && git push origin master. Puis ecris exactement : TAPE DEPLOY
