'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('@/components/landing/hero-canvas'), { ssr: false });

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
              <span className="text-black text-xs font-black leading-none">SA</span>
            </div>
            <span className="font-bold text-white text-sm tracking-tight">Sales Advisor</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#pricing"  className="hover:text-white transition-colors">Tarifs</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Témoignages</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block">
              Se connecter
            </Link>
            <Link
              href="/dashboard"
              className="text-sm bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200"
            >
              Commencer →
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <HeroCanvas />

        {/* Radial glow behind globe */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
          <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 text-xs text-white/60 mb-10 bg-white/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
            Propulsé par GPT-4o · Données B2B en temps réel
          </div>

          <h1 className="text-[72px] leading-[1.04] font-black tracking-tight mb-6 text-white">
            Prospectez plus vite,<br />
            <span className="text-white/40">vendez mieux.</span>
          </h1>

          <p className="text-lg text-white/55 max-w-xl mx-auto mb-10 leading-relaxed">
            Sales Advisor combine recherche B2B et intelligence artificielle pour identifier,
            qualifier et approcher les bons prospects en quelques secondes.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/dashboard"
              className="bg-white text-black px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg"
            >
              Commencer gratuitement
            </Link>
            <a
              href="#pricing"
              className="border border-white/20 text-white/80 px-7 py-3.5 rounded-xl font-semibold text-sm hover:border-white/40 hover:text-white transition-all duration-200"
            >
              Voir les tarifs
            </a>
          </div>

          <p className="text-xs text-white/30 mt-5">Pas de carte bancaire requise · Accès immédiat</p>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────────────────── */}
      <section className="bg-[#111] border-y border-white/10 py-14">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {[
              ['2 000+', 'Prospects par mois'],
              ['95 %',   'Précision des données'],
              ['< 5 s',  'Temps de recherche'],
              ['GPT-4o', 'Modèle IA utilisé'],
            ].map(([value, label]) => (
              <div key={label} className="text-center px-8 py-4">
                <p className="text-3xl font-black text-white mb-1">{value}</p>
                <p className="text-xs text-white/40 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-4 font-semibold">Fonctionnalités</p>
            <h2 className="text-4xl font-black tracking-tight text-white mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-white/40 text-base max-w-md mx-auto">Un outil complet conçu pour les équipes commerciales modernes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: '⚡',
                tag: 'Prospection',
                title: 'Prospect Finder',
                desc: "Trouvez vos prospects B2B qualifiés en quelques secondes. Filtrez par secteur, taille d'entreprise, ville et poste ciblé.",
                detail: 'Données vérifiées · Export CSV',
              },
              {
                icon: '🤖',
                tag: 'Intelligence Artificielle',
                title: 'Assistance IA',
                desc: 'Générez des pitchs sur-mesure, préparez vos appels et obtenez des fiches de synthèse complètes sur chaque prospect.',
                detail: 'Propulsé par GPT-4o',
              },
              {
                icon: '📊',
                tag: 'Analytics',
                title: 'Dashboard & Suivi',
                desc: 'Visualisez vos performances, suivez vos crédits et analysez toute votre activité depuis un tableau de bord centralisé.',
                detail: 'Historique complet · Statistiques',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-[#111] rounded-2xl border border-white/10 p-8 flex flex-col hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-6">
                  {f.icon}
                </div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3 font-semibold">{f.tag}</p>
                <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed flex-1">{f.desc}</p>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <span className="text-xs text-white/30">{f.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-28 px-6 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-4 font-semibold">Témoignages</p>
            <h2 className="text-4xl font-black tracking-tight text-white mb-4">Ce qu&apos;ils en pensent</h2>
            <p className="text-white/40 text-base max-w-md mx-auto">Des commerciaux qui ont transformé leur prospection grâce à Sales Advisor.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                initials: 'TR',
                name: 'Thomas Renard',
                role: 'SDR @ TechCorp',
                quote: "En 2 semaines, j'ai trouvé plus de prospects qualifiés qu'en 3 mois avec mes méthodes habituelles. Les pitchs IA sont bluffants.",
              },
              {
                initials: 'SM',
                name: 'Sophie Martin',
                role: 'Freelance B2B',
                quote: "L'outil idéal pour un freelance. Je peux cibler exactement les décideurs que je cherche et préparer chaque appel avec un brief complet.",
              },
              {
                initials: 'ML',
                name: 'Marc Leblanc',
                role: 'Directeur Commercial @ StartupXYZ',
                quote: "On a équipé toute l'équipe commerciale. Le ROI est immédiat : moins de temps de recherche, plus de temps de vente.",
              },
            ].map((t) => (
              <div key={t.name} className="bg-[#111] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-200">
                <p className="text-white/50 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white/70">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/35">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 px-6 bg-black border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-4 font-semibold">Tarifs</p>
            <h2 className="text-4xl font-black tracking-tight text-white mb-4">Simple et transparent</h2>
            <p className="text-white/40 text-base max-w-md mx-auto">Choisissez le plan adapté à votre activité. Sans engagement.</p>
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
                features: ['Tout Starter', 'Pitchs personnalisés', "Préparation d'appel", 'Support prioritaire'],
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
                className={`rounded-2xl p-8 border flex flex-col relative transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-white text-black border-white shadow-2xl shadow-white/10 scale-[1.02]'
                    : 'bg-[#111] border-white/10 text-white hover:border-white/20'
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
                  <p className={`text-sm ${plan.highlight ? 'text-black/50' : 'text-white/40'}`}>{plan.desc}</p>
                </div>

                <div className="mb-6">
                  <span className={`text-5xl font-black ${plan.highlight ? 'text-black' : 'text-white'}`}>
                    {plan.price}€
                  </span>
                  <span className={`text-sm ml-1 ${plan.highlight ? 'text-black/50' : 'text-white/40'}`}>/mois</span>
                  <p className={`text-xs mt-1.5 ${plan.highlight ? 'text-black/40' : 'text-white/30'}`}>
                    {plan.credits}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-center gap-2.5 ${plan.highlight ? 'text-black/70' : 'text-white/55'}`}>
                      <span className={`text-xs font-bold ${plan.highlight ? 'text-black/40' : 'text-white/30'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/dashboard"
                  className={`block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-black text-white hover:bg-black/85'
                      : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
                  }`}
                >
                  Choisir {plan.name}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-white/25 mt-10">
            Tous les plans incluent 14 jours d&apos;essai gratuit · Résiliez à tout moment
          </p>
        </div>
      </section>

      {/* ── CTA final ───────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#0a0a0a] border-t border-white/10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight text-white mb-5">Prêt à prospecter autrement ?</h2>
          <p className="text-white/40 mb-10 text-base leading-relaxed">
            Rejoignez les commerciaux qui utilisent Sales Advisor pour trouver et convertir leurs prospects plus rapidement.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-white text-black px-9 py-4 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg"
          >
            Commencer gratuitement →
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 py-10 px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/35">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
              <span className="text-black text-[9px] font-black leading-none">SA</span>
            </div>
            <span className="font-semibold text-white">Sales Advisor</span>
          </div>

          <p className="text-xs text-white/25">© 2025 Sales Advisor. Tous droits réservés.</p>

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
