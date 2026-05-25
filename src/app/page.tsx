'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const HeroCanvas = dynamic(() => import('@/components/landing/hero-canvas'), { ssr: false })

/* ─── Data ─────────────────────────────────────────────────────── */

const stats = [
  { value: '500+', label: 'Équipes' },
  { value: '4,9/5', label: 'Note moyenne' },
  { value: '30s', label: 'Par prospect' },
  { value: '+47', label: "Prospects qualifiés aujourd'hui" },
]

const partners = ['lemlist', 'HubSpot', 'Pipedrive', 'Brevo', 'aircall', 'Salesforce']

const processSteps = [
  {
    num: '1',
    title: 'Analyse intelligente',
    desc: "Collecte de données fiables à partir de multiples sources (site web, LinkedIn, actualités…)",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: '2',
    title: 'Qualification IA',
    desc: "L'IA identifie les décideurs, score le potentiel et priorise vos prospects.",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    num: '3',
    title: 'Email personnalisé',
    desc: 'Rédaction automatique d\'emails adaptés et percutants pour chaque prospect.',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: '4',
    title: 'Engagement & suivi',
    desc: 'Suivez les ouvertures, préparez les relances et gérez vos prochains échanges.',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

const features = [
  {
    title: 'Prospect Finder',
    desc: 'Identifiez les entreprises les plus susceptibles d\'acheter grâce au scoring IA en temps réel.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'Assistance IA',
    desc: 'Générez un résumé, un pitch personnalisé ou une préparation d\'appel en un clic.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Dashboard',
    desc: 'Visualisez vos performances : recherches, prospects qualifiés, score moyen, crédits.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Export CSV',
    desc: 'Exportez vos prospects qualifiés directement dans votre CRM ou tableur favori.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
]

const plans = [
  {
    name: 'Starter',
    price: '9',
    credits: 50,
    features: ['50 crédits / mois', 'Prospect Finder', 'Export CSV', 'Support email'],
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: '39',
    credits: 200,
    features: ['200 crédits / mois', 'Prospect Finder avancé', 'Assistance IA complète', 'Export CSV illimité', 'Support prioritaire'],
    highlighted: true,
    badge: 'Populaire',
  },
  {
    name: 'Business',
    price: '129',
    credits: 1000,
    features: ['1 000 crédits / mois', 'Toutes les fonctionnalités', 'Accès API', 'Intégrations CRM', 'Support dédié'],
    highlighted: false,
    badge: null,
  },
]

const testimonials = [
  {
    quote: "Sales Advisor a multiplié par 3 notre taux de réponse. Les emails générés par l'IA sont vraiment adaptés à chaque prospect.",
    name: 'Marie L.',
    role: 'SDR · Scale-up B2B',
    initials: 'ML',
    color: '#6366f1',
  },
  {
    quote: "En 30 secondes j'ai un dossier complet sur mon prospect. C'est devenu indispensable avant chaque appel.",
    name: 'Thomas B.',
    role: 'Commercial · PME Tech',
    initials: 'TB',
    color: '#8b5cf6',
  },
  {
    quote: "La qualité du scoring IA est impressionnante. On perd beaucoup moins de temps sur des leads non qualifiés.",
    name: 'Sarah M.',
    role: 'Head of Sales · SaaS',
    initials: 'SM',
    color: '#06b6d4',
  },
]

/* ─── Animations ────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: 'easeOut' as const },
  }),
}

/* ─── Page ──────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div
      style={{
        background: '#ffffff',
        color: '#0a0a0a',
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflowX: 'hidden',
        backgroundImage: 'radial-gradient(circle, #e0e7ff 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* ── NAVBAR ───────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          height: 64,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: '#6366f1',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: '-0.02em',
                flexShrink: 0,
              }}
            >
              SA
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: '-0.02em',
                color: '#0a0a0a',
              }}
            >
              Sales Advisor
            </span>
          </div>

          {/* Nav links — hidden on small screens via CSS trick */}
          <div
            style={{
              display: 'flex',
              gap: 32,
              alignItems: 'center',
            }}
          >
            {['Fonctionnalités', 'Processus', 'Tarifs', 'Ressources'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#4b5563',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = '#6366f1')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = '#4b5563')
                }
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link
              href="/login"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#4b5563',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
            >
              Connexion
            </Link>
            <Link
              href="/register"
              style={{
                background: '#6366f1',
                color: '#fff',
                padding: '9px 20px',
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s',
                boxShadow: '0 1px 3px rgba(99,102,241,0.35)',
              }}
            >
              Essayer 14 jours gratuits
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 64,
          minHeight: '100vh',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
          {/* Left — text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            style={{
              flex: '0 0 50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: 'clamp(32px, 7vw, 140px)',
              paddingRight: 52,
              paddingTop: 40,
              paddingBottom: 80,
            }}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#eef2ff',
                  border: '1px solid #c7d2fe',
                  borderRadius: 9999,
                  padding: '5px 14px',
                  fontSize: 13,
                  color: '#6366f1',
                  fontWeight: 500,
                  marginBottom: 28,
                  letterSpacing: '-0.01em',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    background: '#6366f1',
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                />
                IA B2B &bull; De l&apos;URL au prospect qualifié en 30s
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              style={{
                fontSize: 'clamp(44px, 5.2vw, 72px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.06,
                margin: '0 0 24px',
                color: '#0a0a0a',
              }}
            >
              Trouvez vos meilleurs
              <br />
              prospects. Plus vite.
              <br />
              <span style={{ color: '#6366f1' }}>Vendez mieux.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              style={{
                fontSize: 18,
                color: '#6b7280',
                lineHeight: 1.65,
                margin: '0 0 36px',
                maxWidth: 460,
              }}
            >
              Générez des emails personnalisés et préparez vos appels en moins de 30 secondes
              grâce à l&apos;IA.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={3}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                marginBottom: 22,
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/register"
                style={{
                  background: '#6366f1',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: 9999,
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
              >
                Essayer gratuitement — 14 jours
              </Link>
              <button
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: 9999,
                  padding: '13px 22px',
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: '#0a0a0a',
                  transition: 'border-color 0.15s',
                }}
              >
                <span
                  style={{
                    width: 30,
                    height: 30,
                    background: '#6366f1',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
                    <path d="M0 0l10 6-10 6V0z" />
                  </svg>
                </span>
                Voir la démo
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              custom={4}
              style={{
                display: 'flex',
                gap: 20,
                flexWrap: 'wrap',
                marginBottom: 48,
              }}
            >
              {['Aucune carte bancaire', 'Annulable à tout moment', 'Onboarding en 2 min'].map(
                (item) => (
                  <span
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      color: '#9ca3af',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="7" fill="#d1fae5" />
                      <path
                        d="M4 7l2 2 4-4"
                        stroke="#059669"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </span>
                )
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              custom={5}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
                borderTop: '1px solid #f3f4f6',
                paddingTop: 28,
              }}
            >
              {stats.map((s) => (
                <div key={s.value}>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: '#0a0a0a',
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4, lineHeight: 1.4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Globe plein bord */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            style={{
              flex: '0 0 50%',
              position: 'relative',
              minHeight: '100vh',
              overflow: 'hidden',
            }}
          >
            <HeroCanvas />

            {/* Badge 1 — Prospects qualifiés */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '14%',
                left: '6%',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: 16,
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(99,102,241,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ width: 34, height: 34, background: '#eef2ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📈</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a' }}>+47 prospects</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>qualifiés aujourd&apos;hui</div>
              </div>
            </motion.div>

            {/* Badge 2 — Score IA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '40%',
                right: '6%',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: 16,
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(99,102,241,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ width: 34, height: 34, background: '#fef3c7', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⭐</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a' }}>Score IA 94/100</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>Pertinence prospect</div>
              </div>
            </motion.div>

            {/* Badge 3 — Email prêt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '14%',
                left: '4%',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 16,
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(16,185,129,0.10)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ width: 34, height: 34, background: '#d1fae5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✉️</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a' }}>Email IA prêt</div>
                <div style={{ fontSize: 11, color: '#10b981' }}>✓ Prêt à envoyer</div>
              </div>
            </motion.div>

            {/* Badge 4 — Vitesse */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '6%',
                right: '8%',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: 16,
                padding: '10px 14px',
                boxShadow: '0 8px 32px rgba(99,102,241,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ width: 30, height: 30, background: '#eef2ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚡</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0a0a0a' }}>Analyse en 30s</div>
              </div>
            </motion.div>

            {/* Badge 5 — Entreprises */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '28%',
                left: '8%',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: 16,
                padding: '10px 14px',
                boxShadow: '0 8px 32px rgba(99,102,241,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ width: 30, height: 30, background: '#eef2ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🌍</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0a0a0a' }}>2 000+ entreprises</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>analysées ce mois</div>
              </div>
            </motion.div>

            {/* Badge 6 — Décideurs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '30%',
                right: '7%',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: 16,
                padding: '10px 14px',
                boxShadow: '0 8px 32px rgba(99,102,241,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ width: 30, height: 30, background: '#eef2ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👤</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0a0a0a' }}>Décideurs identifiés</div>
                <div style={{ fontSize: 11, color: '#6366f1' }}>✓ Via IA</div>
              </div>
            </motion.div>

            {/* Badge 7 — Taux de réponse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '12%',
                right: '20%',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 16,
                padding: '10px 14px',
                boxShadow: '0 8px 32px rgba(16,185,129,0.10)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ width: 30, height: 30, background: '#d1fae5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📊</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0a0a0a' }}>+38% taux de réponse</div>
                <div style={{ fontSize: 11, color: '#10b981' }}>↑ vs email classique</div>
              </div>
            </motion.div>
          </motion.div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────── */}
      <section
        style={{
          padding: '44px 24px',
          borderTop: '1px solid #f3f4f6',
          borderBottom: '1px solid #f3f4f6',
          background: '#fafafa',
        }}
      >
        <div style={{ padding: '0 clamp(32px, 6vw, 120px)', textAlign: 'center' }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#d1d5db',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}
          >
            ILS NOUS FONT CONFIANCE
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 56,
              flexWrap: 'wrap',
            }}
          >
            {partners.map((name) => (
              <span
                key={name}
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#d1d5db',
                  letterSpacing: '-0.02em',
                  userSelect: 'none',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section id="processus" style={{ padding: '96px 24px' }}>
        <div
          style={{
            padding: '0 clamp(32px, 6vw, 120px)',
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#6366f1',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Processus
            </p>
            <h2
              style={{
                fontSize: 'clamp(26px, 2.8vw, 40px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                margin: '0 0 20px',
              }}
            >
              De la donnée à la conversation,{' '}
              <span style={{ color: '#6366f1' }}>propulsé par l&apos;IA</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: '#6b7280',
                lineHeight: 1.65,
                margin: '0 0 28px',
                maxWidth: 400,
              }}
            >
              Sales Advisor analyse, qualifie et vous aide à engager les bonnes conversations avec
              les bons décideurs.
            </p>
            <Link
              href="/register"
              style={{
                color: '#6366f1',
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Découvrir le processus{' '}
              <span style={{ transition: 'transform 0.15s' }}>→</span>
            </Link>
          </motion.div>

          {/* Right — 4 step cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                style={{
                  background: '#fff',
                  border: '1px solid #f3f4f6',
                  borderRadius: 18,
                  padding: '22px 20px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(99,102,241,0.1)' }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: '#eef2ff',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                  }}
                >
                  {step.icon}
                </div>
                <div
                  style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#0a0a0a' }}
                >
                  {step.num}. {step.title}
                </div>
                <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.55 }}>
                  {step.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section
        id="fonctionnalités"
        style={{ padding: '96px 24px', background: '#fafafa' }}
      >
        <div style={{ padding: '0 clamp(32px, 6vw, 120px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 60 }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#6366f1',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Fonctionnalités
            </p>
            <h2
              style={{
                fontSize: 'clamp(26px, 2.8vw, 42px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                margin: '0 0 14px',
              }}
            >
              Tout ce dont vous avez besoin
            </h2>
            <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 520, margin: '0 auto' }}>
              Une plateforme complète pour trouver, qualifier et engager vos meilleurs prospects.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 20,
            }}
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: '#fff',
                  border: '1px solid #f3f4f6',
                  borderRadius: 20,
                  padding: '28px 24px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(99,102,241,0.1)' }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: '#eef2ff',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  {f.icon}
                </div>
                <div
                  style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#0a0a0a' }}
                >
                  {f.title}
                </div>
                <div style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section style={{ padding: '96px 24px' }}>
        <div style={{ padding: '0 clamp(32px, 6vw, 120px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <h2
              style={{
                fontSize: 'clamp(26px, 2.8vw, 40px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                margin: '0 0 12px',
              }}
            >
              Ils vendent mieux avec Sales Advisor
            </h2>
            <p style={{ fontSize: 16, color: '#9ca3af' }}>
              Des équipes commerciales qui ont transformé leur prospection
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: '#fff',
                  border: '1px solid #f3f4f6',
                  borderRadius: 20,
                  padding: '28px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    color: '#374151',
                    lineHeight: 1.65,
                    margin: '0 0 20px',
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: t.color,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0a0a0a' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section id="tarifs" style={{ padding: '96px 24px', background: '#fafafa' }}>
        <div style={{ padding: '0 clamp(32px, 6vw, 120px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 60 }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#6366f1',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Tarifs
            </p>
            <h2
              style={{
                fontSize: 'clamp(26px, 2.8vw, 42px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                margin: '0 0 12px',
              }}
            >
              Simples et transparents
            </h2>
            <p style={{ fontSize: 17, color: '#6b7280' }}>
              Commencez gratuitement, évoluez selon vos besoins.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              alignItems: 'start',
            }}
          >
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: plan.highlighted ? '#0a0a0a' : '#fff',
                  border: `1px solid ${plan.highlighted ? 'transparent' : '#e5e7eb'}`,
                  borderRadius: 22,
                  padding: '36px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: plan.highlighted
                    ? '0 20px 60px rgba(0,0,0,0.2)'
                    : '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {plan.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      background: '#6366f1',
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: 9999,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: plan.highlighted ? '#a5b4fc' : '#6366f1',
                    marginBottom: 10,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {plan.name}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 4,
                    marginBottom: 28,
                  }}
                >
                  <span
                    style={{
                      fontSize: 48,
                      fontWeight: 800,
                      color: plan.highlighted ? '#fff' : '#0a0a0a',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}
                  >
                    €{plan.price}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: plan.highlighted ? '#6b7280' : '#9ca3af',
                      marginBottom: 4,
                    }}
                  >
                    /mois
                  </span>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 11,
                  }}
                >
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontSize: 14,
                        color: plan.highlighted ? '#d1d5db' : '#374151',
                        lineHeight: 1.4,
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{ flexShrink: 0, marginTop: 1 }}
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="8"
                          fill={plan.highlighted ? '#374151' : '#eef2ff'}
                        />
                        <path
                          d="M5 8l2 2 4-4"
                          stroke={plan.highlighted ? '#a5b4fc' : '#6366f1'}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    background: plan.highlighted ? '#6366f1' : 'transparent',
                    color: plan.highlighted ? '#fff' : '#0a0a0a',
                    border: `1px solid ${plan.highlighted ? 'transparent' : '#e5e7eb'}`,
                    borderRadius: 9999,
                    padding: '13px 20px',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'opacity 0.15s',
                    boxShadow: plan.highlighted ? '0 4px 14px rgba(99,102,241,0.4)' : 'none',
                  }}
                >
                  Commencer
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)',
        }}
      >
        <div
          style={{
            padding: '0 clamp(32px, 6vw, 120px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2
              style={{
                fontSize: 'clamp(22px, 2.8vw, 36px)',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                margin: '0 0 10px',
              }}
            >
              Prêt à booster vos résultats commerciaux ?
            </h2>
            <p style={{ fontSize: 15, color: '#a5b4fc', margin: '0 0 22px', lineHeight: 1.5 }}>
              Rejoignez des centaines d&apos;équipes qui vendent mieux, chaque jour.
            </p>
            <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
              {['Aucune carte bancaire', 'Annulable à tout moment', 'Onboarding en 2 min'].map(
                (item) => (
                  <span
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      color: '#a5b4fc',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="7" fill="rgba(165,180,252,0.18)" />
                      <path
                        d="M4 7l2 2 4-4"
                        stroke="#a5b4fc"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <Link
            href="/register"
            style={{
              background: '#6366f1',
              color: '#fff',
              padding: '16px 36px',
              borderRadius: 9999,
              fontSize: 16,
              fontWeight: 700,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              boxShadow: '0 4px 20px rgba(99,102,241,0.5)',
              display: 'inline-block',
            }}
          >
            Essayer gratuitement — 14 jours
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer
        style={{
          padding: '28px 24px',
          borderTop: '1px solid #f3f4f6',
          background: '#fff',
        }}
      >
        <div
          style={{
            padding: '0 clamp(32px, 6vw, 120px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                background: '#6366f1',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: 11,
              }}
            >
              SA
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>Sales Advisor</span>
          </div>

          <div style={{ fontSize: 13, color: '#d1d5db' }}>
            © 2025 Sales Advisor. Tous droits réservés.
          </div>

          <div style={{ display: 'flex', gap: 24 }}>
            {['Mentions légales', 'Confidentialité', 'CGU'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: 13,
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = '#6366f1')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af')
                }
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
