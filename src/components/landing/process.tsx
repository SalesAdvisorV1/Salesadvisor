'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useSpring, useInView } from 'framer-motion'

/* ─── Constants ─────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const STEPS = [
  {
    num: '01',
    title: 'Analyse intelligente',
    desc: "Collecte de données fiables à partir de multiples sources (site web, LinkedIn, actualités…)",
    icon: (
      <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Qualification IA',
    desc: "L'IA identifie les décideurs, score le potentiel et priorise vos prospects.",
    icon: (
      <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Email personnalisé',
    desc: "Rédaction automatique d'emails adaptés et percutants pour chaque prospect.",
    icon: (
      <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Engagement & suivi',
    desc: 'Suivez les ouvertures, préparez les relances et gérez vos prochains échanges.',
    icon: (
      <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

/* ─── Step row — lights up as it crosses the viewport center ───── */

function StepRow({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const active = useInView(ref, { margin: '-42% 0px -42% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
      style={{ display: 'flex', gap: 26, padding: '30px 0', position: 'relative' }}
    >
      {/* Node */}
      <div style={{ width: 56, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
        <motion.div
          initial={false}
          animate={{
            boxShadow: active
              ? '0 10px 28px rgba(99,102,241,0.38), 0 1px 0 rgba(255,255,255,0.4) inset'
              : '0 4px 14px rgba(99,102,241,0.10)',
            scale: active ? 1 : 0.92,
          }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{
            position: 'relative',
            width: 46,
            height: 46,
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(99,102,241,0.22)',
            overflow: 'hidden',
            color: active ? '#ffffff' : '#6366f1',
            transition: 'color 0.3s ease',
            zIndex: 1,
          }}
        >
          <motion.div
            aria-hidden
            initial={false}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.5 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1, display: 'flex' }}>{step.icon}</span>
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingTop: 2 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.09em',
            color: active ? '#6366f1' : '#9ca3af',
            textTransform: 'uppercase',
            marginBottom: 8,
            transition: 'color 0.3s ease',
          }}
        >
          Étape {step.num}
        </div>
        <h3
          style={{
            fontSize: 'clamp(18px, 1.4vw, 22px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            margin: '0 0 8px',
            color: '#0f172a',
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontSize: 15,
            color: '#6b7280',
            lineHeight: 1.65,
            margin: 0,
            maxWidth: 480,
          }}
        >
          {step.desc}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Process section ───────────────────────────────────────────── */

export default function Process() {
  const stepsRef = useRef<HTMLDivElement>(null)

  /* Gradient line grows with scroll through the steps */
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start 72%', 'end 55%'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  return (
    <section
      id="processus"
      style={{ padding: '130px clamp(24px, 6vw, 120px)' }}
    >
      <div
        className="sa-process-grid"
        style={{ maxWidth: 1600, margin: '0 auto' }}
      >
        {/* Left — pinned while the steps scroll */}
        <div className="sa-process-sticky" style={{ position: 'sticky', top: 150 }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#6366f1',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            Processus
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            style={{
              fontSize: 'clamp(30px, 3.1vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              margin: '0 0 22px',
            }}
          >
            De la donnée à la conversation,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              propulsé par l&apos;IA
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            style={{
              fontSize: 'clamp(16px, 1.1vw, 19px)',
              color: '#6b7280',
              lineHeight: 1.65,
              margin: '0 0 30px',
              maxWidth: 420,
            }}
          >
            Sales Advisor analyse, qualifie et vous aide à engager les bonnes conversations
            avec les bons décideurs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <Link
              href="/register"
              className="sa-arrow-link"
              style={{
                color: '#6366f1',
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Découvrir le processus <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Right — vertical timeline */}
        <div ref={stepsRef} style={{ position: 'relative' }}>
          {/* Track */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: 27,
              top: 40,
              bottom: 40,
              width: 2,
              borderRadius: 2,
              background: 'rgba(99,102,241,0.12)',
            }}
          />
          {/* Progress — draws itself with scroll */}
          <motion.div
            aria-hidden
            style={{
              position: 'absolute',
              left: 27,
              top: 40,
              bottom: 40,
              width: 2,
              borderRadius: 2,
              background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)',
              scaleY: lineScale,
              transformOrigin: 'top',
              boxShadow: '0 0 12px rgba(99,102,241,0.45)',
            }}
          />
          {STEPS.map((step, i) => (
            <StepRow key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
