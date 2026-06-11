'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/* ─── Constants ─────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const TRUST_ITEMS = ['Aucune carte bancaire', 'Annulable à tout moment', 'Onboarding en 2 min']

const FOOTER_NAV = [
  { label: 'Fonctionnalités', href: '#fonctionnalités' },
  { label: 'Processus', href: '#processus' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Ressources', href: '#ressources' },
]

const FOOTER_LEGAL = ['Mentions légales', 'Confidentialité', 'CGU']

/* ─── Magnetic white CTA ────────────────────────────────────────── */

function MagneticWhiteCTA() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18 })
  const sy = useSpring(y, { stiffness: 260, damping: 18 })
  const reduced = useReducedMotion()

  return (
    <motion.div
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={(e) => {
        if (reduced) return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.22)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.32)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <Link
        href="/register"
        className="btn-shimmer"
        style={{
          display: 'inline-block',
          background: '#ffffff',
          color: '#4f46e5',
          padding: '17px 38px',
          borderRadius: 9999,
          fontSize: 17,
          fontWeight: 700,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          boxShadow: '0 12px 32px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.8) inset',
          transition: 'box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            '0 18px 44px rgba(0,0,0,0.30), 0 1px 0 rgba(255,255,255,0.8) inset'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            '0 12px 32px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.8) inset'
        }}
      >
        Essayer gratuitement — 14 jours
      </Link>
    </motion.div>
  )
}

/* ─── CTA banner + footer ───────────────────────────────────────── */

export default function FinalCta() {
  const reduced = useReducedMotion()

  return (
    <>
      {/* ── CTA island ── */}
      <section style={{ padding: '20px clamp(24px, 6vw, 120px) 120px' }}>
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE }}
          style={{
            position: 'relative',
            maxWidth: 1280,
            margin: '0 auto',
            borderRadius: 34,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 45%, #8b5cf6 100%)',
            padding: 'clamp(52px, 6vw, 92px) clamp(28px, 5vw, 80px)',
            boxShadow:
              '0 30px 90px rgba(99,102,241,0.38), 0 1px 0 rgba(255,255,255,0.3) inset',
            textAlign: 'center',
          }}
        >
          {/* Drifting light blobs */}
          <motion.div
            aria-hidden
            animate={reduced ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '-35%',
              left: '-15%',
              width: '55%',
              height: '120%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            aria-hidden
            animate={reduced ? undefined : { x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '-45%',
              right: '-10%',
              width: '50%',
              height: '110%',
              background: 'radial-gradient(circle, rgba(192,132,252,0.35) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
              style={{
                fontSize: 'clamp(28px, 3.4vw, 52px)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                margin: '0 0 18px',
              }}
            >
              Prêt à booster vos résultats commerciaux ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
              style={{
                fontSize: 'clamp(16px, 1.2vw, 19px)',
                color: '#e0e7ff',
                margin: '0 auto 36px',
                maxWidth: 540,
                lineHeight: 1.6,
              }}
            >
              Rejoignez des centaines d&apos;équipes qui vendent mieux, chaque jour.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
              style={{ marginBottom: 30 }}
            >
              <MagneticWhiteCTA />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                display: 'flex',
                gap: 24,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    fontSize: 13.5,
                    color: 'rgba(255,255,255,0.82)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="7" fill="rgba(255,255,255,0.20)" />
                    <path
                      d="M4 7l2 2 4-4"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: '34px clamp(24px, 6vw, 120px)',
          borderTop: '1px solid rgba(99,102,241,0.10)',
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'saturate(160%) blur(14px)',
          WebkitBackdropFilter: 'saturate(160%) blur(14px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: 1600,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: 11.5,
                boxShadow: '0 3px 10px rgba(99,102,241,0.30)',
              }}
            >
              SA
            </div>
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Sales Advisor
            </span>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {FOOTER_NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: '#6b7280',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: 9999,
                  transition: 'color 0.15s ease, background 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#4f46e5'
                  e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#6b7280'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Legal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            {FOOTER_LEGAL.map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: 13,
                  color: '#9ca3af',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#4f46e5')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>

        <div
          style={{
            maxWidth: 1600,
            margin: '18px auto 0',
            textAlign: 'center',
            fontSize: 12.5,
            color: '#c4c9d4',
          }}
        >
          © 2026 Sales Advisor. Tous droits réservés.
        </div>
      </footer>
    </>
  )
}
