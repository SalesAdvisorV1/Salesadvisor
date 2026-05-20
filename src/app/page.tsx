'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';

const HeroCanvas = dynamic(() => import('@/components/landing/hero-canvas'), { ssr: false });

/* ── Animated counter ─────────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, motionVal, to]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v).toLocaleString()));
    return unsub;
  }, [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── Rotating quotes ──────────────────────────────────────────────── */
const QUOTES = [
  { text: '"Sales Advisor a transformé notre prospection. On trouve les bons contacts en quelques secondes."', author: 'Marie D. — Responsable commerciale, TechSoft' },
  { text: '"Le pitch IA nous fait gagner 2h par semaine. Résultats visibles dès la première semaine."', author: 'Thomas R. — SDR Senior, GrowthLab' },
  { text: '"Enfin un outil simple qui fait vraiment ce qu\'on lui demande. Pas de superflu."', author: 'Aurélie M. — Freelance B2B, Bordeaux' },
];

function QuoteCarousel() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % QUOTES.length), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative min-h-[160px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <p className="text-2xl md:text-3xl italic text-white/60 max-w-3xl mx-auto leading-relaxed">
            {QUOTES[idx].text}
          </p>
          <p className="mt-4 text-sm text-white/30 tracking-widest uppercase">{QUOTES[idx].author}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── SVG connector line ───────────────────────────────────────────── */
function ConnectorLine() {
  const ref = useRef<SVGPathElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.5 });
  return (
    <svg className="w-full h-16 my-2" viewBox="0 0 800 60" preserveAspectRatio="none">
      <motion.path
        ref={ref}
        d="M 0 30 C 200 0, 600 60, 800 30"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/* ── Mock prospect card ───────────────────────────────────────────── */
function MockProspectCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative bg-white/5 border border-white/10 rounded-2xl p-6 max-w-sm ml-auto"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600" />
        <div>
          <div className="text-white font-semibold text-sm">Sophie Martin</div>
          <div className="text-white/40 text-xs">Head of Sales · TechCorp</div>
        </div>
        <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Score 94</span>
      </div>
      <div className="space-y-2">
        {['📧 sophie@techcorp.fr', '📞 +33 6 12 34 56 78', '🏢 Paris · SaaS · 150 emp'].map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.12 }}
            className="text-xs text-white/50 bg-white/5 rounded px-3 py-2"
          >
            {line}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.6 }}
      />
      <div className="mt-3 flex gap-2">
        <div className="flex-1 bg-blue-500/20 text-blue-300 text-xs rounded-lg py-2 text-center">Pitch IA</div>
        <div className="flex-1 bg-white/5 text-white/40 text-xs rounded-lg py-2 text-center">Exporter</div>
      </div>
    </motion.div>
  );
}

/* ── Animated SVG brain icon ──────────────────────────────────────── */
function AnimatedIcon() {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      className="w-24 h-24 text-white/30"
      initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
    >
      <motion.circle
        cx="40" cy="40" r="36"
        stroke="currentColor" strokeWidth="1.5" fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M24 40 Q32 24 40 40 Q48 56 56 40"
        stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
      />
      <motion.path
        d="M28 52 Q36 36 44 52"
        stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.8 }}
      />
    </motion.svg>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  PAGE                                                              */
/* ══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const textTopY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const textBotY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* ══ HEADER FIXE ═════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-black text-sm">SA</div>
          <span className="text-white font-bold text-lg ml-3">Sales Advisor</span>
        </div>

        {/* Nav centre */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-white/60 hover:text-white text-sm transition-colors">Fonctionnalités</a>
          <a href="#pricing" className="text-white/60 hover:text-white text-sm transition-colors">Tarifs</a>
          <a href="#testimonials" className="text-white/60 hover:text-white text-sm transition-colors">Témoignages</a>
        </nav>

        {/* Boutons droite */}
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-white/60 hover:text-white text-sm transition-colors">Se connecter</Link>
          <Link href="/auth/signup" className="bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors">Commencer</Link>
        </div>
      </header>

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Globe */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: globeScale, opacity: heroOpacity }}
        >
          <HeroCanvas />
        </motion.div>

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,black_100%)] pointer-events-none" />

        {/* Top-left headline */}
        <motion.div
          className="absolute top-24 left-6 md:left-16 z-10"
          style={{ y: textTopY }}
        >
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">
            Prospectez<br />
            <span className="text-white/50">plus vite,</span>
          </h1>
        </motion.div>

        {/* Bottom-right headline */}
        <motion.div
          className="absolute bottom-28 right-6 md:right-16 z-10 text-right"
          style={{ y: textBotY }}
        >
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">
            vendez<br />mieux.
          </h1>
        </motion.div>

        {/* Badge pill */}
        <motion.div
          className="absolute top-24 right-6 md:right-16 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur rounded-full px-4 py-2 text-sm text-white/80"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Propulsé par GPT-4o
          </motion.span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link
            href="/auth/signup"
            className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-all hover:scale-105 text-sm tracking-wide"
          >
            Commencer gratuitement
          </Link>
          <Link
            href="/auth/login"
            className="border border-white/30 text-white/70 hover:text-white hover:border-white/60 px-8 py-3 rounded-full transition-all text-sm tracking-wide"
          >
            Se connecter
          </Link>
        </motion.div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {[
            { value: 2000, suffix: '+', label: 'Prospects trouvés' },
            { value: 95, suffix: '%', label: 'Taux de précision' },
            { value: 5, suffix: 's', label: 'Temps de recherche' },
            { value: 4, suffix: 'o', label: 'Modèle IA' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-black tabular-nums">
                {i === 3 ? 'GPT-' : ''}
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm text-white/40 tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ═════════════════════════════════════════════════ */}
      <section id="features" className="py-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center text-3xl md:text-5xl font-black mb-20 text-white/90"
        >
          Ce que Sales Advisor<br />
          <span className="text-white/40">fait pour vous</span>
        </motion.h2>

        {/* Feature 1 : texte gauche + mockup droite */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-4">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs text-white/30 uppercase tracking-widest mb-3">01 — Prospection</div>
            <h3 className="text-4xl font-black mb-4">Trouvez vos prospects<br />en 5 secondes.</h3>
            <p className="text-white/50 leading-relaxed">
              Entrez un secteur, un titre, une ville. Sales Advisor génère une liste qualifiée avec emails, téléphones et signaux d'achat. Zéro copier-coller.
            </p>
          </motion.div>
          <MockProspectCard />
        </div>

        <ConnectorLine />

        {/* Feature 2 : icône animée gauche + texte droite */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-4">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <AnimatedIcon />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs text-white/30 uppercase tracking-widest mb-3">02 — Intelligence IA</div>
            <h3 className="text-4xl font-black mb-4">Un pitch personnalisé<br />à chaque appel.</h3>
            <p className="text-white/50 leading-relaxed">
              GPT-4o analyse le profil de votre prospect et génère un pitch sur-mesure, une accroche email et une préparation d'appel en quelques secondes.
            </p>
          </motion.div>
        </div>

        <ConnectorLine />

        {/* Feature 3 : texte centré + compteurs */}
        <div className="max-w-2xl mx-auto text-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs text-white/30 uppercase tracking-widest mb-3">03 — Résultats</div>
            <h3 className="text-4xl font-black mb-6">Des chiffres qui parlent<br />d'eux-mêmes.</h3>
          </motion.div>
          <div className="grid grid-cols-3 gap-8 mt-8">
            {[
              { n: 40, suffix: '%', label: 'de temps gagné' },
              { n: 3, suffix: 'x', label: 'plus de RDV' },
              { n: 12, suffix: 'min', label: 'pour onboarder' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.15, duration: 0.5, type: 'spring' }}
              >
                <div className="text-5xl font-black">
                  <Counter to={s.n} suffix={s.suffix} />
                </div>
                <div className="text-white/40 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SOCIAL PROOF ═════════════════════════════════════════════ */}
      <section id="testimonials" className="py-28 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <QuoteCarousel />
        </motion.div>
      </section>

      {/* ══ PRICING ══════════════════════════════════════════════════ */}
      <section id="pricing" className="py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-black mb-16 text-white/80"
        >
          Choisissez votre plan
        </motion.h2>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-end justify-center gap-4">
          {/* Starter */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0, duration: 0.7, type: 'spring', stiffness: 80 }}
            whileHover={{ scale: 1.04, opacity: 1 }}
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 opacity-50 cursor-pointer transition-all"
          >
            <div className="text-white/50 font-bold mb-1 text-sm uppercase tracking-widest">Starter</div>
            <div className="text-4xl font-black mb-4">29€<span className="text-lg text-white/40 font-normal">/mo</span></div>
            <ul className="space-y-2 text-sm text-white/40">
              {['50 recherches/mois', '100 crédits IA', 'Export CSV', 'Support email'].map(f => (
                <li key={f} className="flex items-center gap-2"><span className="text-white/20">—</span>{f}</li>
              ))}
            </ul>
            <div className="mt-6 border border-white/20 text-white/40 text-sm rounded-xl py-2 text-center">Commencer</div>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.15, duration: 0.7, type: 'spring', stiffness: 80 }}
            className="flex-1 bg-white border border-white rounded-2xl p-8 text-black scale-105 z-10 shadow-[0_0_60px_rgba(255,255,255,0.1)]"
          >
            <div className="text-black/50 font-bold mb-1 text-sm uppercase tracking-widest">Pro</div>
            <div className="text-5xl font-black mb-1">79€<span className="text-xl text-black/40 font-normal">/mo</span></div>
            <div className="text-xs text-black/40 mb-4">Le plus populaire</div>
            <ul className="space-y-2 text-sm text-black/70">
              {['300 recherches/mois', '500 crédits IA', 'Pitch & prep appel IA', 'CRM basique', 'Support prioritaire'].map(f => (
                <li key={f} className="flex items-center gap-2"><span className="text-black/30">✓</span>{f}</li>
              ))}
            </ul>
            <Link
              href="/auth/signup"
              className="mt-6 bg-black text-white font-bold text-sm rounded-xl py-3 block text-center hover:bg-black/80 transition-all"
            >
              Choisir Pro
            </Link>
          </motion.div>

          {/* Business */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.3, duration: 0.7, type: 'spring', stiffness: 80 }}
            whileHover={{ scale: 1.04, opacity: 1 }}
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 opacity-50 cursor-pointer transition-all"
          >
            <div className="text-white/50 font-bold mb-1 text-sm uppercase tracking-widest">Business</div>
            <div className="text-4xl font-black mb-4">199€<span className="text-lg text-white/40 font-normal">/mo</span></div>
            <ul className="space-y-2 text-sm text-white/40">
              {['Illimité', 'Crédits IA illimités', 'API access', 'Intégrations CRM', 'Account manager'].map(f => (
                <li key={f} className="flex items-center gap-2"><span className="text-white/20">—</span>{f}</li>
              ))}
            </ul>
            <div className="mt-6 border border-white/20 text-white/40 text-sm rounded-xl py-2 text-center">Nous contacter</div>
          </motion.div>
        </div>
      </section>

      {/* ══ CTA FINAL ════════════════════════════════════════════════ */}
      <section className="py-32 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
            className="overflow-hidden"
          >
            <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-black leading-none tracking-tight">
              Commencez<br />aujourd&apos;hui
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 text-xl text-white/40 max-w-lg mx-auto"
          >
            Rejoignez les équipes commerciales qui prospectent mieux, plus vite.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10"
          >
            <Link
              href="/auth/signup"
              className="inline-block bg-white text-black font-bold px-12 py-4 rounded-full text-lg hover:bg-white/90 hover:scale-105 transition-all"
            >
              Créer mon compte gratuit
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-white/20">
          <span className="font-black tracking-widest uppercase">SA</span>
          <div className="flex gap-6">
            <Link href="/auth/login" className="hover:text-white/50 transition-colors">Connexion</Link>
            <Link href="/auth/signup" className="hover:text-white/50 transition-colors">Inscription</Link>
            <span>contact@salesadvisor.fr</span>
          </div>
          <span>© 2026 Sales Advisor</span>
        </div>
      </footer>

    </main>
  );
}
