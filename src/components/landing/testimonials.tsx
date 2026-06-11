'use client'

import { motion } from 'framer-motion'

/* ─── Constants ─────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const TESTIMONIALS = [
  {
    before: 'Sales Advisor a ',
    highlight: 'multiplié par 3',
    after: " notre taux de réponse. Les emails générés par l'IA sont vraiment adaptés à chaque prospect.",
    name: 'Marie L.',
    role: 'SDR · Scale-up B2B',
    initials: 'ML',
    color: '#6366f1',
  },
  {
    before: 'En ',
    highlight: '30 secondes',
    after: " j'ai un dossier complet sur mon prospect. C'est devenu indispensable avant chaque appel.",
    name: 'Thomas B.',
    role: 'Commercial · PME Tech',
    initials: 'TB',
    color: '#8b5cf6',
  },
  {
    before: 'La qualité du ',
    highlight: 'scoring IA',
    after: ' est impressionnante. On perd beaucoup moins de temps sur des leads non qualifiés.',
    name: 'Sarah M.',
    role: 'Head of Sales · SaaS',
    initials: 'SM',
    color: '#06b6d4',
  },
]

/* ─── Card ──────────────────────────────────────────────────────── */

function TestimonialCard({
  t,
  index,
  featured = false,
}: {
  t: (typeof TESTIMONIALS)[number]
  index: number
  featured?: boolean
}) {
  return (
    <motion.div
      className={`sa-tile ${featured ? '' : 'sa-testi-side'}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: EASE }}
      whileHover={{ y: -5 }}
      onMouseMove={(e) => {
        const el = e.currentTarget
        const r = el.getBoundingClientRect()
        const glow = el.querySelector('.sa-tile-glow') as HTMLElement | null
        if (glow) {
          glow.style.background = `radial-gradient(380px circle at ${e.clientX - r.left}px ${
            e.clientY - r.top
          }px, rgba(99,102,241,0.10), transparent 65%)`
        }
      }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255,255,255,0.80)',
        backdropFilter: 'saturate(160%) blur(14px)',
        WebkitBackdropFilter: 'saturate(160%) blur(14px)',
        border: '1px solid rgba(255,255,255,0.7)',
        borderRadius: 24,
        padding: featured ? 'clamp(28px, 2.2vw, 38px)' : 'clamp(24px, 2vw, 32px)',
        boxShadow: featured
          ? '0 16px 44px rgba(99,102,241,0.14), 0 1px 0 rgba(255,255,255,0.7) inset'
          : '0 6px 22px rgba(99,102,241,0.08)',
        overflow: 'hidden',
      }}
    >
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

      {/* Decorative quote mark */}
      <svg
        aria-hidden
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="rgba(99,102,241,0.10)"
        style={{ position: 'absolute', top: 20, right: 22 }}
      >
        <path d="M9.583 17.321C8.553 16.227 8 15 8 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm-9 0C-.447 16.227-1 15-1 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" transform="translate(8 2) scale(1.1)" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Stars — pop in one by one */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 18 }}>
          {[...Array(5)].map((_, j) => (
            <motion.svg
              key={j}
              initial={{ opacity: 0, scale: 0.3 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + index * 0.12 + j * 0.06, duration: 0.35, ease: EASE }}
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="#fbbf24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </motion.svg>
          ))}
        </div>

        {/* Quote — key phrase highlighted */}
        <p
          style={{
            fontSize: featured ? 'clamp(16px, 1.15vw, 18px)' : 15.5,
            color: '#374151',
            lineHeight: 1.7,
            margin: '0 0 24px',
          }}
        >
          &ldquo;{t.before}
          <strong style={{ color: '#6366f1', fontWeight: 700 }}>{t.highlight}</strong>
          {t.after}&rdquo;
        </p>

        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: `linear-gradient(135deg, ${t.color} 0%, ${t.color}cc 100%)`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              flexShrink: 0,
              boxShadow: `0 4px 12px ${t.color}55`,
            }}
          >
            {t.initials}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0a0a0a' }}>{t.name}</div>
            <div style={{ fontSize: 12.5, color: '#9ca3af' }}>{t.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Testimonials section ──────────────────────────────────────── */

export default function Testimonials() {
  return (
    <section style={{ padding: '130px clamp(24px, 6vw, 120px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
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
            Témoignages
          </p>
          <h2
            style={{
              fontSize: 'clamp(30px, 3.1vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: '0 0 16px',
            }}
          >
            Ils{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              vendent mieux
            </span>{' '}
            avec Sales Advisor
          </h2>
          <p style={{ fontSize: 'clamp(16px, 1.1vw, 19px)', color: '#6b7280', margin: '0 auto', maxWidth: 520 }}>
            Des équipes commerciales qui ont transformé leur prospection
          </p>
        </motion.div>

        {/* Cards — middle one raised */}
        <div className="sa-testi-grid">
          <TestimonialCard t={TESTIMONIALS[0]} index={0} />
          <TestimonialCard t={TESTIMONIALS[1]} index={1} featured />
          <TestimonialCard t={TESTIMONIALS[2]} index={2} />
        </div>
      </div>
    </section>
  )
}
