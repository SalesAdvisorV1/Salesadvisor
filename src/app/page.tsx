'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useIntersection } from '@/hooks/use-intersection';

const HeroCanvas = dynamic(() => import('@/components/landing/hero-canvas'), { ssr: false });

/* ── Animated counter ───────────────────────────────────────────────── */
function AnimatedStat({ target, label }: { target: string; label: string }) {
  const { ref, isVisible } = useIntersection();
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isVisible) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (isNaN(num)) { setDisplay(target); return; }
    let start = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setDisplay(target); clearInterval(timer); return; }
      setDisplay(target.replace(/[\d]+/, String(start)));
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="text-center px-8 py-4"
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'none' : 'translateY(8px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
    >
      <p className="text-3xl font-black text-white mb-1">{display}</p>
      <p className="text-xs text-white/40 leading-snug">{label}</p>
    </div>
  );
}

/* ── Feature card with SVG icon ─────────────────────────────────────── */
const featureIcons = {
  finder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-white/70 group-hover:rotate-12 transition-transform duration-300">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-white/70 group-hover:scale-110 transition-transform duration-300">
      <path d="M12 2a7 7 0 0 1 7 7c0 3-1.8 5.6-4.4 6.7L14 18H10l-.6-2.3A7 7 0 0 1 12 2z" /><path d="M9 21h6" /><path d="M12 18v3" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-white/70 group-hover:scale-110 transition-transform duration-300">
      <path d="M3 3v18h18" /><path d="M7 16l4-4 4 4 4-6" />
    </svg>
  ),
};

/* ── Fade-in wrapper ────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useIntersection();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Steps connecting line ──────────────────────────────────────────── */
function StepsLine({ visible }: { visible: boolean }) {
  return (
    <svg className="hidden md:block absolute top-8 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-[2px]" preserveAspectRatio="none" viewBox="0 0 200 2">
      <line
        x1="0" y1="1" x2="200" y2="1"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        className="svg-draw-dash"
        style={{ strokeDashoffset: visible ? 0 : 200, transition: 'stroke-dashoffset 1.4s ease 0.3s' }}
      />
    </svg>
  );
}

export default function LandingPage() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [stepsVisible, setStepsVisible] = useState(false);
  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStepsVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
              <span className="text-black text-xs font-black leading-none">SA</span>
            </div>
            <span className="font-bold text-white text-sm tracking-tight">Sales Advisor</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#pricing"  className="hover:text-white transition-colors">Tarifs</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Témoignages</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block">Se connecter</Link>
            <Link href="/dashboard" className="text-sm bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200">Commencer →</Link>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <HeroCanvas />
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
            <Link href="/dashboard" className="bg-white text-black px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg">
              Commencer gratuitement
            </Link>
            <a href="#pricing" className="border border-white/20 text-white/80 px-7 py-3.5 rounded-xl font-semibold text-sm hover:border-white/40 hover:text-white transition-all duration-200">
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
              { target: '2000+', label: 'Prospects par mois' },
              { target: '95%',   label: 'Précision des données' },
              { target: '< 5s',  label: 'Temps de recherche' },
              { target: 'GPT-4o',label: 'Modèle IA utilisé' },
            ].map((s) => (
              <AnimatedStat key={s.label} target={s.target} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-4 font-semibold">Fonctionnalités</p>
            <h2 className="text-4xl font-black tracking-tight text-white mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-white/40 text-base max-w-md mx-auto">Un outil complet conçu pour les équipes commerciales modernes.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {([
              { iconKey: 'finder', tag: 'Prospection', title: 'Prospect Finder', desc: "Trouvez vos prospects B2B qualifiés en quelques secondes. Filtrez par secteur, taille d'entreprise, ville et poste ciblé.", detail: 'Données vérifiées · Export CSV' },
              { iconKey: 'ai',     tag: 'Intelligence Artificielle', title: 'Assistance IA', desc: 'Générez des pitchs sur-mesure, préparez vos appels et obtenez des fiches de synthèse complètes sur chaque prospect.', detail: 'Propulsé par GPT-4o' },
              { iconKey: 'chart',  tag: 'Analytics', title: 'Dashboard & Suivi', desc: 'Visualisez vos performances, suivez vos crédits et analysez toute votre activité depuis un tableau de bord centralisé.', detail: 'Historique complet · Statistiques' },
            ] as const).map((f, i) => (
              <FadeIn key={f.title} delay={i * 100}>
                <div className="group bg-[#111] rounded-2xl border border-white/10 p-8 flex flex-col hover:border-white/30 hover:scale-[1.02] transition-all duration-300 h-full cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    {featureIcons[f.iconKey]}
                  </div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-3 font-semibold">{f.tag}</p>
                  <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed flex-1">{f.desc}</p>
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <span className="text-xs text-white/30">{f.detail}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-4 font-semibold">Processus</p>
            <h2 className="text-4xl font-black tracking-tight text-white mb-4">3 étapes simples</h2>
            <p className="text-white/40 text-base max-w-md mx-auto">De la recherche à la conversion, tout est automatisé.</p>
          </FadeIn>
          <div ref={stepsRef} className="relative">
            <StepsLine visible={stepsVisible} />
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { n: '1', title: 'Définissez vos critères', desc: 'Secteur, taille d\'entreprise, localisation, poste ciblé — configurez votre recherche en 30 secondes.' },
                { n: '2', title: 'L\'IA trouve vos prospects', desc: 'Notre moteur GPT-4o analyse et qualifie automatiquement les meilleurs profils correspondant à vos critères.' },
                { n: '3', title: 'Approchez et convertissez', desc: 'Recevez pitchs personnalisés, briefs d\'appel et fiches complètes pour chaque prospect identifié.' },
              ].map((step, i) => (
                <div
                  key={step.n}
                  className="flex flex-col items-center text-center"
                  style={{
                    opacity: stepsVisible ? 1 : 0,
                    transform: stepsVisible ? 'none' : 'translateY(24px)',
                    transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                  }}
                >
                  <div className="w-16 h-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mb-6 relative z-10">
                    <span className="text-xl font-black text-white">{step.n}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-28 px-6 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-4 font-semibold">Témoignages</p>
            <h2 className="text-4xl font-black tracking-tight text-white mb-4">Ce qu&apos;ils en pensent</h2>
            <p className="text-white/40 text-base max-w-md mx-auto">Des commerciaux qui ont transformé leur prospection.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { initials: 'TR', name: 'Thomas Renard',  role: 'SDR @ TechCorp',                   quote: "En 2 semaines, j'ai trouvé plus de prospects qualifiés qu'en 3 mois avec mes méthodes habituelles. Les pitchs IA sont bluffants." },
              { initials: 'SM', name: 'Sophie Martin',  role: 'Freelance B2B',                    quote: "L'outil idéal pour un freelance. Je cible exactement les décideurs que je cherche et prépare chaque appel avec un brief complet." },
              { initials: 'ML', name: 'Marc Leblanc',   role: 'Directeur Commercial @ StartupXYZ', quote: "On a équipé toute l'équipe. Le ROI est immédiat : moins de temps de recherche, plus de temps de vente." },
            ].map((t, i) => (
              <FadeIn key={t.name} delay={i * 100}>
                <div className="bg-[#111] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 italic flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-white/70">{t.initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-white/50">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 px-6 bg-black border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-4 font-semibold">Tarifs</p>
            <h2 className="text-4xl font-black tracking-tight text-white mb-4">Simple et transparent</h2>
            <p className="text-white/40 text-base max-w-md mx-auto">Choisissez le plan adapté à votre activité. Sans engagement.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5 items-center">
            {[
              { name: 'Starter',  price: '9',   desc: 'Pour démarrer',              credits: '100 crédits / mois',   features: ['Prospect Finder', 'Assistance IA', 'Export CSV', 'Support email'],           highlight: false },
              { name: 'Pro',      price: '39',  desc: 'Pour les commerciaux actifs', credits: '500 crédits / mois',   features: ['Tout Starter', 'Pitchs personnalisés', "Préparation d'appel", 'Support prioritaire'], highlight: true  },
              { name: 'Business', price: '129', desc: 'Pour les équipes',            credits: '2 000 crédits / mois', features: ['Tout Pro', 'Multi-utilisateurs', 'Accès API', 'Intégrations CRM'],          highlight: false },
            ].map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 100}>
                <div className={`rounded-2xl p-8 border flex flex-col relative transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-white text-black border-white shadow-2xl shadow-white/10 scale-[1.05]'
                    : 'bg-[#111] border-white/10 text-white hover:border-white/20'
                }`}>
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 whitespace-nowrap">
                      Le plus populaire
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-xl font-black mb-1 ${plan.highlight ? 'text-black' : 'text-white'}`}>{plan.name}</h3>
                    <p className={`text-sm ${plan.highlight ? 'text-black/50' : 'text-white/40'}`}>{plan.desc}</p>
                  </div>
                  <div className="mb-6">
                    <span className={`text-5xl font-black ${plan.highlight ? 'text-black' : 'text-white'}`}>{plan.price}€</span>
                    <span className={`text-sm ml-1 ${plan.highlight ? 'text-black/50' : 'text-white/40'}`}>/mois</span>
                    <p className={`text-xs mt-1.5 ${plan.highlight ? 'text-black/40' : 'text-white/30'}`}>{plan.credits}</p>
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className={`text-sm flex items-center gap-2.5 ${plan.highlight ? 'text-black/70' : 'text-white/55'}`}>
                        <span className={`text-xs font-bold ${plan.highlight ? 'text-black/50' : 'text-white/40'}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/dashboard" className={`block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.highlight ? 'bg-black text-white hover:bg-gray-900' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}>
                    Choisir {plan.name}
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="text-center text-xs text-white/25 mt-10">
            Tous les plans incluent 14 jours d&apos;essai gratuit · Résiliez à tout moment
          </p>
        </div>
      </section>

      {/* ── CTA final ───────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#0a0a0a] border-t border-white/10 text-center">
        <FadeIn className="max-w-2xl mx-auto">
          <h2 className="text-5xl font-black tracking-tight text-white mb-5 leading-tight">
            Prêt à prospecter<br />autrement ?
          </h2>
          <p className="text-white/60 mb-10 text-base leading-relaxed">
            Rejoignez les commerciaux qui utilisent Sales Advisor pour trouver et convertir leurs prospects plus rapidement.
          </p>
          <div className="inline-block relative">
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div
                className="absolute inset-[-2px] rounded-xl"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.5) 60deg, transparent 120deg)',
                  animation: 'rotateBorder 3s linear infinite',
                }}
              />
            </div>
            <Link
              href="/dashboard"
              className="relative inline-block bg-white text-black px-10 py-4 rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-200 shadow-2xl shadow-white/10"
            >
              Commencer gratuitement →
            </Link>
          </div>
          <p className="text-xs text-white/25 mt-5">Pas de carte bancaire requise · Accès immédiat</p>
        </FadeIn>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 py-10 px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shrink-0">
              <span className="text-black text-[9px] font-black leading-none">SA</span>
            </div>
            <span className="font-bold text-white text-sm">Sales Advisor</span>
          </div>
          <div className="flex gap-8 text-xs text-white/40">
            <a href="#features"      className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#testimonials"  className="hover:text-white transition-colors">Témoignages</a>
            <a href="#pricing"       className="hover:text-white transition-colors">Tarifs</a>
            <a href="#"              className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#"              className="hover:text-white transition-colors">CGU</a>
          </div>
          <p className="text-xs text-white/25">© 2026 Sales Advisor. Tous droits réservés.</p>
        </div>
      </footer>

    </div>
  );
}
