'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/* ─── Constants ─────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const PLANS = [
  {
    name: 'Starter',
    price: 9,
    features: ['50 crédits / mois', 'Prospect Finder', 'Export CSV', 'Support email'],
    highlighted: false,
    badge: null as string | null,
  },
  {
    name: 'Pro',
    price: 39,
    features: [
      '200 crédits / mois',
      'Prospect Finder avancé',
      'Assistance IA complète',
      'Export CSV illimité',
      'Support prioritaire',
    ],
    highlighted: true,
    badge: 'Populaire',
  },
  {
    name: 'Business',
    price: 129,
    features: [
      '1 000 crédits / mois',
      'Toutes les fonctionnalités',
      'Accès API',
      'Intégrations CRM',
      'Support dédié',
    ],
    highlighted: false,
    badge: null as string | null,
  },
]

/* ─── Animated price ────────────────────────────────────────────── */

function AnimatedPrice({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(to)
      return
    }
    const start = performance.now()
    const duration = 1100
    let raf: number
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, reduced])

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {value}
    </span>
  )
}

/* ─── Plan card ─────────────────────────────────────────────────── */

function PlanCard({ plan, index }: { plan: (typeof PLANS)[number]; index: number }) {
  const hl = plan.highlighted

  return (
    <motion.div
      className={hl ? '' : 'sa-tile'}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: EASE }}
      whileHover={{ y: -6 }}
      onMouseMove={
        hl
          ? undefined
          : (e) => {
              const el = e.currentTarget
              const r = el.getBoundingClientRect()
              const glow = el.querySelector('.sa-tile-glow') as HTMLElement | null
              if (glow) {
                glow.style.background = `radial-gradient(380px circle at ${e.clientX - r.left}px ${
                  e.clientY - r.top
                }px, rgba(99,102,241,0.10), transparent 65%)`
              }
            }
      }
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: hl
          ? 'linear-gradient(150deg, #6366f1 0%, #7c5cf6 55%, #8b5cf6 100%)'
          : 'rgba(255,255,255,0.80)',
        backdropFilter: hl ? undefined : 'saturate(160%) blur(14px)',
        WebkitBackdropFilter: hl ? undefined : 'saturate(160%) blur(14px)',
        border: hl ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.7)',
        borderRadius: 26,
        padding: 'clamp(30px, 2.4vw, 40px) clamp(26px, 2vw, 34px)',
        overflow: 'hidden',
        boxShadow: hl
          ? '0 24px 70px rgba(99,102,241,0.38), 0 1px 0 rgba(255,255,255,0.25) inset'
          : '0 6px 22px rgba(99,102,241,0.08)',
      }}
    >
      {!hl && (
        <div
          className="sa-tile-glow"
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Soft highlight inside the gradient card */}
      {hl && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-20%',
            width: '70%',
            height: '70%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Name + badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: hl ? '#e0e7ff' : '#6366f1',
            }}
          >
            {plan.name}
          </span>
          {plan.badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4, ease: EASE }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: 'rgba(255,255,255,0.92)',
                color: '#4f46e5',
                fontSize: 11.5,
                fontWeight: 700,
                padding: '5px 12px',
                borderRadius: 9999,
                letterSpacing: '0.02em',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              }}
            >
              <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l1.9 5.7L19.6 9l-5.7 1.9L12 16.6l-1.9-5.7L4.4 9l5.7-1.3L12 2z" />
              </svg>
              {plan.badge}
            </motion.span>
          )}
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 30 }}>
          <span
            style={{
              fontSize: 'clamp(44px, 3.4vw, 56px)',
              fontWeight: 800,
              color: hl ? '#ffffff' : '#0a0a0a',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            €<AnimatedPrice to={plan.price} />
          </span>
          <span style={{ fontSize: 15, color: hl ? 'rgba(255,255,255,0.65)' : '#9ca3af' }}>
            /mois
          </span>
        </div>

        {/* Features */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 34px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {plan.features.map((feat, j) => (
            <motion.li
              key={feat}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.08 + j * 0.06, duration: 0.4, ease: EASE }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                fontSize: 14.5,
                color: hl ? '#e0e7ff' : '#374151',
                lineHeight: 1.45,
              }}
            >
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="8" cy="8" r="8" fill={hl ? 'rgba(255,255,255,0.20)' : '#eef2ff'} />
                <path
                  d="M5 8l2 2 4-4"
                  stroke={hl ? '#ffffff' : '#6366f1'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {feat}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/register"
          className={hl ? 'btn-shimmer' : 'sa-plan-cta'}
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: 'auto',
            background: hl ? '#ffffff' : 'transparent',
            color: hl ? '#4f46e5' : '#0a0a0a',
            border: hl ? '1px solid transparent' : '1px solid rgba(15,23,42,0.14)',
            borderRadius: 9999,
            padding: '14px 20px',
            fontSize: 15,
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: hl ? '0 8px 22px rgba(0,0,0,0.18)' : 'none',
            transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease',
          }}
        >
          Commencer
        </Link>
      </div>
    </motion.div>
  )
}

/* ─── Pricing section ───────────────────────────────────────────── */

export default function Pricing() {
  return (
    <section id="tarifs" style={{ padding: '130px clamp(24px, 6vw, 120px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#6366f1',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            Tarifs
          </p>
          <h2
            style={{
              fontSize: 'clamp(30px, 3.1vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: '0 0 16px',
            }}
          >
            Simples et{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              transparents
            </span>
          </h2>
          <p style={{ fontSize: 'clamp(16px, 1.1vw, 19px)', color: '#6b7280' }}>
            Commencez gratuitement, évoluez selon vos besoins.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="sa-pricing-grid">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Reassurance */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            textAlign: 'center',
            fontSize: 14,
            color: '#9ca3af',
            marginTop: 36,
          }}
        >
          14 jours d&apos;essai gratuit · Sans carte bancaire · Annulable à tout moment
        </motion.p>
      </div>
    </section>
  )
}
