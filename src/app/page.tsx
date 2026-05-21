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

/* ── Rotating testimonials ────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    text: '"Sales Advisor a transformé notre prospection. On trouve les bons contacts en quelques secondes."',
    author: 'Marie D.',
    role: 'Responsable commerciale, TechSoft',
    avatar: 'MD',
  },
  {
    text: '"Le pitch IA nous fait gagner 2h par semaine. Résultats visibles dès la première semaine."',
    author: 'Thomas R.',
    role: 'SDR Senior, GrowthLab',
    avatar: 'TR',
  },
  {
    text: '"Enfin un outil simple qui fait vraiment ce qu\'on lui demande. Pas de superflu."',
    author: 'Aurélie M.',
    role: 'Freelance B2B, Bordeaux',
    avatar: 'AM',
  },
];

/* ══════════════════════════════════════════════════════════════════ */
/*  PAGE                                                              */
/* ══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  /* Testimonials auto-rotate */
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTIdx((i) => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const FEATURES = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
        </svg>
      ),
      tag: '01 — Prospection',
      title: 'Trouvez vos prospects en 5 secondes',
      body: 'Secteur, titre, ville — Sales Advisor génère une liste qualifiée avec emails, téléphones et signaux d\'achat. Zéro copier-coller.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path d="M12 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z"/><path d="M9.5 9h5M9.5 12h3" strokeLinecap="round"/>
          <path d="M12 16v6M8 22h8" strokeLinecap="round"/>
        </svg>
      ),
      tag: '02 — IA',
      title: 'Un pitch personnalisé à chaque appel',
      body: 'GPT-4o analyse le profil de votre prospect et génère un pitch sur-mesure, une accroche email et une préparation d\'appel.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
          <path d="M3 3v18h18"/><path d="m7 16 4-4 4 4 4-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      tag: '03 — Résultats',
      title: 'Des chiffres qui parlent d\'eux-mêmes',
      body: '40 % de temps gagné, 3× plus de rendez-vous, 12 minutes pour onboarder. Mesurable dès la première semaine.',
    },
  ];

  const STEPS = [
    {
      n: '01',
      title: 'Décrivez votre cible',
      body: 'Entrez un secteur, un titre de poste ou une ville. Notre moteur fait le reste.',
    },
    {
      n: '02',
      title: 'Obtenez une liste qualifiée',
      body: 'Emails, numéros directs, taille d\'entreprise, score de pertinence — tout en un clic.',
    },
    {
      n: '03',
      title: 'Engagez avec l\'IA',
      body: 'Pitch personnalisé, accroche email et prep d\'appel générés automatiquement pour chaque prospect.',
    },
  ];

  const PLANS = [
    {
      name: 'Starter',
      price: '29',
      features: ['50 recherches/mois', '100 crédits IA', 'Export CSV', 'Support email'],
      cta: 'Commencer',
      href: '/register',
      pro: false,
    },
    {
      name: 'Pro',
      price: '79',
      badge: 'Le plus populaire',
      features: ['300 recherches/mois', '500 crédits IA', 'Pitch & prep appel IA', 'CRM basique', 'Support prioritaire'],
      cta: 'Choisir Pro',
      href: '/register',
      pro: true,
    },
    {
      name: 'Business',
      price: '199',
      features: ['Illimité', 'Crédits IA illimités', 'API access', 'Intégrations CRM', 'Account manager'],
      cta: 'Nous contacter',
      href: '/register',
      pro: false,
    },
  ];

  return (
    <main style={{ background: '#050505' }} className="min-h-screen text-white overflow-x-hidden">

      {/* ══ HEADER FIXE ═════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10"
        style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 select-none">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black font-black text-xs tracking-tight">SA</div>
          <span className="text-white font-bold text-base tracking-tight">Sales Advisor</span>
        </div>

        {/* Nav centre */}
        <nav className="hidden md:flex items-center gap-8">
          {[['#features', 'Fonctionnalités'], ['#steps', 'Comment ça marche'], ['#pricing', 'Tarifs'], ['#testimonials', 'Avis']].map(([href, label]) => (
            <a key={href} href={href} className="text-white/50 hover:text-white text-sm transition-colors duration-200">{label}</a>
          ))}
        </nav>

        {/* Boutons droite */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-white/50 hover:text-white text-sm transition-colors hidden md:block">Se connecter</Link>
          <Link
            href="/register"
            className="btn-shimmer bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/90 transition-all duration-200"
          >
            Commencer
          </Link>
        </div>
      </header>

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Globe 3D */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: globeScale, opacity: heroOpacity }}
        >
          <HeroCanvas />
        </motion.div>

        {/* Vignette radiale */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #050505 100%)' }} />

        {/* Titre massif 3 lignes + opacités différentes */}
        <motion.div
          className="relative z-10 text-center px-4"
          style={{ y: heroY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Badge GPT */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/70 tracking-widest uppercase"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Propulsé par GPT-4o
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-[0.88] tracking-tight text-[clamp(3.5rem,10vw,8rem)]"
          >
            <span className="block text-white">Prospectez</span>
            <span className="block" style={{ color: 'rgba(255,255,255,0.45)' }}>plus vite,</span>
            <span className="block" style={{ color: 'rgba(255,255,255,0.18)' }}>vendez mieux.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-8 text-lg text-white/40 max-w-lg mx-auto leading-relaxed"
          >
            Sales Advisor combine IA et données B2B pour trouver, qualifier et approcher vos prospects en quelques secondes.
          </motion.p>

          {/* 2 CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/register"
              className="btn-shimmer bg-white text-black font-bold px-8 py-3.5 rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-105 transition-all duration-300 text-sm tracking-wide"
            >
              Commencer gratuitement
            </Link>
            <Link
              href="/login"
              className="border text-white/60 hover:text-white hover:border-white/50 px-8 py-3.5 rounded-full transition-all duration-300 text-sm tracking-wide"
              style={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              Se connecter
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-4 text-xs text-white/20"
          >
            Pas de carte bancaire · Accès immédiat
          </motion.p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-0.5 h-8 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          />
        </motion.div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 2000, suffix: '+', label: 'Prospects trouvés' },
            { value: 95, suffix: '%', label: 'Taux de précision' },
            { value: 5, suffix: 's', label: 'Temps de recherche' },
            { value: 500, suffix: '+', label: 'Commerciaux actifs' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-black tabular-nums text-white">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-xs text-white/30 tracking-widest uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES — 3 cards ═══════════════════════════════════════ */}
      <section id="features" className="py-24 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Fonctionnalités</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Ce que Sales Advisor<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>fait pour vous</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative rounded-2xl p-8 cursor-pointer transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)' }}
              />

              <div className="text-white/40 group-hover:text-white/80 transition-colors duration-300 mb-6">
                {f.icon}
              </div>
              <div className="text-xs text-white/25 uppercase tracking-widest mb-3">{f.tag}</div>
              <h3 className="text-xl font-bold text-white mb-3 leading-snug">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.body}</p>

              <motion.div
                className="mt-6 flex items-center gap-2 text-xs text-white/25 group-hover:text-white/60 transition-colors duration-300"
              >
                En savoir plus
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ 3 ÉTAPES SIMPLES ═════════════════════════════════════════ */}
      <section id="steps" className="py-24 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Processus</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            3 étapes simples<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>pour prospecter</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
              className="flex gap-8 items-start relative"
            >
              {/* Timeline */}
              <div className="flex flex-col items-center flex-shrink-0 pt-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white/60"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
                >
                  {step.n}
                </div>
                {i < STEPS.length - 1 && (
                  <motion.div
                    className="w-px flex-1 mt-2 mb-0"
                    style={{ height: 72, background: 'rgba(255,255,255,0.08)' }}
                    initial={{ scaleY: 0, originY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                  />
                )}
              </div>

              <div className="pb-12 pt-1">
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════ */}
      <section id="testimonials" className="py-28 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-14">Ils nous font confiance</p>

          <div className="relative min-h-[220px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={tIdx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-center w-full"
              >
                <p className="text-2xl md:text-3xl font-medium leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {TESTIMONIALS[tIdx].text}
                </p>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white/70"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {TESTIMONIALS[tIdx].avatar}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white/80">{TESTIMONIALS[tIdx].author}</div>
                    <div className="text-xs text-white/30">{TESTIMONIALS[tIdx].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === tIdx ? 24 : 6,
                  height: 6,
                  background: i === tIdx ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ PRICING ══════════════════════════════════════════════════ */}
      <section id="pricing" className="py-24 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Tarifs</p>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Choisissez votre plan
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.65, type: 'spring', stiffness: 80 }}
              whileHover={plan.pro ? {} : { scale: 1.02 }}
              className="flex-1 relative rounded-2xl p-8 flex flex-col"
              style={plan.pro
                ? { background: '#fff', color: '#000', boxShadow: '0 0 80px rgba(255,255,255,0.12)', transform: 'scale(1.04)', zIndex: 10 }
                : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }
              }
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: plan.pro ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.35)' }}
              >
                {plan.name}
              </div>
              <div className="font-black mb-1" style={{ fontSize: '3rem', lineHeight: 1 }}>
                {plan.price}€
                <span className="text-lg font-normal" style={{ color: plan.pro ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.3)' }}>/mo</span>
              </div>

              <div className="my-6 h-px" style={{ background: plan.pro ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)' }} />

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: plan.pro ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.4)' }}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0" style={{ color: plan.pro ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.25)' }}>
                      <path d="M3 8l3.5 3.5 6.5-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className="mt-8 block text-center py-3 rounded-xl text-sm font-bold transition-all duration-200"
                style={plan.pro
                  ? { background: '#000', color: '#fff' }
                  : { border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }
                }
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CTA FINAL MASSIF ════════════════════════════════════════ */}
      <section className="py-36 px-4 relative overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Glow de fond */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <span
            className="inline-block text-xs text-white/40 px-4 py-2 rounded-full mb-10 uppercase tracking-widest"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            Rejoignez 500+ commerciaux
          </span>

          <h2 className="font-black leading-[0.9] tracking-tight mb-8 text-[clamp(2.5rem,7vw,5.5rem)]">
            <span className="block text-white">Commencez à prospecter</span>
            <span className="block" style={{ color: 'rgba(255,255,255,0.35)' }}>intelligemment.</span>
          </h2>

          <p className="text-lg text-white/35 max-w-xl mx-auto mb-12 leading-relaxed">
            Sales Advisor combine IA et données B2B pour vous aider à trouver, qualifier et approcher vos prospects en quelques secondes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="btn-shimmer bg-white text-black px-10 py-4 rounded-2xl font-bold text-base hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-300"
            >
              Créer mon compte gratuit
            </Link>
            <button
              className="border text-white/50 hover:text-white hover:border-white/40 px-10 py-4 rounded-2xl font-medium text-base transition-all duration-300"
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
            >
              Voir une démo
            </button>
          </div>

          <p className="text-xs text-white/20 mt-6">
            Pas de carte bancaire requise · Accès immédiat · Annulable à tout moment
          </p>
        </motion.div>
      </section>

      {/* ══ FOOTER MINIMALISTE ══════════════════════════════════════ */}
      <footer className="py-8 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded flex items-center justify-center text-black font-black text-[9px]">SA</div>
            <span className="font-bold tracking-widest uppercase">Sales Advisor</span>
          </div>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-white/50 transition-colors">Connexion</Link>
            <Link href="/register" className="hover:text-white/50 transition-colors">Inscription</Link>
            <a href="mailto:contact@salesadvisor.fr" className="hover:text-white/50 transition-colors">Contact</a>
          </div>
          <span>© 2026 Sales Advisor</span>
        </div>
      </footer>

    </main>
  );
}
