'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">

      {/* Header fixe */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shrink-0">
              <span className="text-black text-xs font-black leading-none">SA</span>
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">Sales Advisor</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors duration-200">Fonctionnalités</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-200">Tarifs</a>
            <a href="#stats" className="hover:text-white transition-colors duration-200">À propos</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hidden sm:block">
              Se connecter
            </Link>
            <Link
              href="/dashboard"
              className="text-sm bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-sm"
            >
              Commencer →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-44 pb-36 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 text-xs text-gray-400 mb-10 bg-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block"></span>
            Propulsé par GPT-4o · Données B2B en temps réel
          </div>

          <h1 className="text-[72px] leading-[1.05] font-black tracking-tight mb-6 text-white">
            Prospectez plus vite,<br />
            <span className="text-gray-400">vendez mieux.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Sales Advisor combine recherche B2B et intelligence artificielle pour identifier, qualifier et approcher les bons prospects en quelques secondes.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/dashboard"
              className="bg-white text-black px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all duration-200 shadow-md"
            >
              Commencer gratuitement
            </Link>
            <a
              href="#pricing"
              className="border border-white/15 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/5 hover:border-white/30 transition-all duration-200"
            >
              Voir les tarifs
            </a>
          </div>

          <p className="text-xs text-gray-600 mt-5">Pas de carte bancaire requise · Accès immédiat</p>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="border-y border-white/8 py-16 bg-white/[0.015]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/8">
            {[
              ['2 000+', 'Prospects par mois'],
              ['95 %', 'Précision des données'],
              ['< 5 s', 'Temps de recherche'],
              ['GPT-4o', 'Modèle IA utilisé'],
            ].map(([value, label]) => (
              <div key={label} className="text-center px-8 py-4">
                <p className="text-3xl font-black text-white mb-1">{value}</p>
                <p className="text-xs text-gray-500 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-medium">Fonctionnalités</p>
            <h2 className="text-5xl font-black tracking-tight text-white mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-gray-400 text-base max-w-md mx-auto">Un outil complet conçu pour les équipes commerciales modernes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '◈',
                tag: 'Prospection',
                title: 'Prospect Finder',
                desc: 'Trouvez vos prospects B2B qualifiés en quelques secondes. Filtrez par secteur, taille d\'entreprise, ville et poste ciblé.',
                detail: 'Données vérifiées · Export CSV',
              },
              {
                icon: '✦',
                tag: 'Intelligence Artificielle',
                title: 'Assistance IA',
                desc: 'Générez des pitchs sur-mesure, préparez vos appels et obtenez des fiches de synthèse complètes sur chaque prospect.',
                detail: 'Propulsé par GPT-4o',
              },
              {
                icon: '▣',
                tag: 'Analytics',
                title: 'Dashboard & Suivi',
                desc: 'Visualisez vos performances, suivez vos crédits et analysez toute votre activité depuis un tableau de bord centralisé.',
                detail: 'Historique complet · Statistiques',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group border border-white/10 rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                <div className="text-xl text-gray-300 mb-5 font-mono">{f.icon}</div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-semibold">{f.tag}</p>
                <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{f.desc}</p>
                <div className="mt-6 pt-5 border-t border-white/8">
                  <span className="text-xs text-gray-600">{f.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-36 px-6 border-t border-white/8 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-medium">Tarifs</p>
            <h2 className="text-5xl font-black tracking-tight text-white mb-4">Simple et transparent</h2>
            <p className="text-gray-400 text-base max-w-md mx-auto">Choisissez le plan adapté à votre activité. Sans engagement.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: 'Starter',
                price: '9',
                desc: 'Pour démarrer',
                credits: '100 crédits / mois',
                features: ['Prospect Finder', 'Assistance IA', 'Export CSV', 'Support email'],
                highlight: false,
              },
              {
                name: 'Pro',
                price: '39',
                desc: 'Pour les commerciaux actifs',
                credits: '500 crédits / mois',
                features: ['Tout Starter', 'Pitchs personnalisés', 'Préparation d\'appel', 'Support prioritaire'],
                highlight: true,
              },
              {
                name: 'Business',
                price: '129',
                desc: 'Pour les équipes',
                credits: '2 000 crédits / mois',
                features: ['Tout Pro', 'Multi-utilisateurs', 'Accès API', 'Intégrations CRM'],
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border flex flex-col relative ${
                  plan.highlight
                    ? 'bg-white text-black border-white shadow-2xl scale-[1.02]'
                    : 'bg-white/[0.02] border-white/10 text-white'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 whitespace-nowrap">
                    Le plus populaire
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-xl font-black mb-1 ${plan.highlight ? 'text-black' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlight ? 'text-black/50' : 'text-gray-500'}`}>{plan.desc}</p>
                </div>

                <div className="mb-6">
                  <span className={`text-5xl font-black ${plan.highlight ? 'text-black' : 'text-white'}`}>
                    {plan.price}€
                  </span>
                  <span className={`text-sm ml-1 ${plan.highlight ? 'text-black/50' : 'text-gray-500'}`}>/mois</span>
                  <p className={`text-xs mt-1.5 ${plan.highlight ? 'text-black/50' : 'text-gray-600'}`}>
                    {plan.credits}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-center gap-2.5 ${plan.highlight ? 'text-black' : 'text-gray-300'}`}>
                      <span className={`text-xs font-bold ${plan.highlight ? 'text-black/50' : 'text-gray-500'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/dashboard"
                  className={`block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-black text-white hover:bg-gray-900'
                      : 'bg-white/8 text-white border border-white/15 hover:bg-white/15 hover:border-white/25'
                  }`}
                >
                  Choisir {plan.name}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-600 mt-10">
            Tous les plans incluent 14 jours d'essai gratuit · Résiliez à tout moment
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-36 px-6 border-t border-white/8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl font-black tracking-tight text-white mb-5">Prêt à prospecter autrement ?</h2>
          <p className="text-gray-400 mb-10 text-base leading-relaxed">
            Rejoignez les commerciaux qui utilisent Sales Advisor pour trouver et convertir leurs prospects plus rapidement.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-white text-black px-9 py-4 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all duration-200 shadow-lg"
          >
            Commencer gratuitement →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
              <span className="text-black text-[9px] font-black leading-none">SA</span>
            </div>
            <span className="font-medium text-gray-400">Sales Advisor</span>
          </div>

          <p className="text-xs">© 2025 Sales Advisor. Tous droits réservés.</p>

          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">CGU</a>
            <a href="mailto:contact@salesadvisor.io" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
