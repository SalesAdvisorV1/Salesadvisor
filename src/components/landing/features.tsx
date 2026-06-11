'use client'

import { motion, useReducedMotion } from 'framer-motion'

/* ─── Constants ─────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const GRADIENT = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'

/* ─── Mini visuals inside the tiles ─────────────────────────────── */

function VisualFinder() {
  const rows = [
    { name: 'Doctolib', initials: 'DO', score: 94 },
    { name: 'Qonto', initials: 'QO', score: 91 },
    { name: 'Alan', initials: 'AL', score: 88 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {rows.map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + i * 0.13, duration: 0.45, ease: EASE }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#ffffff',
            border: '1px solid rgba(15,23,42,0.06)',
            borderRadius: 12,
            padding: '10px 14px',
          }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              background: GRADIENT,
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {r.initials}
          </span>
          <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: '#0f172a' }}>
            {r.name}
          </span>
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 + i * 0.13, duration: 0.4, ease: EASE }}
            style={{
              fontSize: 12.5,
              fontWeight: 800,
              color: '#6366f1',
              background: 'rgba(99,102,241,0.10)',
              borderRadius: 9999,
              padding: '4px 10px',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {r.score}
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

function VisualAI() {
  const reduced = useReducedMotion()
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid rgba(15,23,42,0.06)',
        borderRadius: 14,
        padding: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <motion.span
          animate={reduced ? undefined : { rotate: [0, 12, -8, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', color: '#6366f1' }}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l1.9 5.7L19.6 9l-5.7 1.9L12 16.6l-1.9-5.7L4.4 9l5.7-1.3L12 2zM19 14l.95 2.85L22.8 17.8l-2.85.95L19 21.6l-.95-2.85-2.85-.95 2.85-.95L19 14z" />
          </svg>
        </motion.span>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: '#6b7280' }}>Assistant IA</span>
      </div>
      {[
        { width: '100%', delay: 0.35 },
        { width: '74%', delay: 0.5 },
      ].map((line) => (
        <motion.div
          key={line.width}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: line.delay, duration: 0.6, ease: EASE }}
          style={{
            height: 8,
            width: line.width,
            background: '#eef2ff',
            borderRadius: 4,
            marginBottom: 8,
            transformOrigin: 'left',
          }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.75, duration: 0.45, ease: EASE }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: '#059669',
          background: 'rgba(5,150,105,0.08)',
          borderRadius: 9999,
          padding: '5px 12px',
          marginTop: 6,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="7" fill="#d1fae5" />
          <path d="M4 7l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Pitch généré
      </motion.div>
    </div>
  )
}

function VisualDash() {
  const bars = [38, 62, 48, 74, 58, 92]
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
        height: 92,
        background: '#ffffff',
        border: '1px solid rgba(15,23,42,0.06)',
        borderRadius: 14,
        padding: '14px 16px 12px',
      }}
    >
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: '8%' }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: EASE }}
          style={{
            flex: 1,
            borderRadius: '6px 6px 3px 3px',
            background: i === bars.length - 1 ? GRADIENT : 'rgba(99,102,241,0.16)',
            boxShadow: i === bars.length - 1 ? '0 4px 12px rgba(99,102,241,0.35)' : 'none',
          }}
        />
      ))}
    </div>
  )
}

function VisualExport() {
  const reduced = useReducedMotion()
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        background: '#ffffff',
        border: '1px solid rgba(15,23,42,0.06)',
        borderRadius: 14,
        padding: '14px 18px',
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: '#eef2ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6366f1',
          flexShrink: 0,
        }}
      >
        <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M9 13h6M9 17h6" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>prospects.csv</div>
        <div style={{ fontSize: 12, color: '#9ca3af' }}>247 prospects · prêt pour votre CRM</div>
      </div>
      <motion.div
        animate={reduced ? undefined : { y: [0, 4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          marginLeft: 'auto',
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: GRADIENT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(99,102,241,0.35)',
        }}
      >
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 4v12m0 0l-5-5m5 5l5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  )
}

/* ─── Tile ──────────────────────────────────────────────────────── */

function Tile({
  className,
  icon,
  title,
  desc,
  visual,
  index,
  horizontal = false,
}: {
  className?: string
  icon: React.ReactNode
  title: string
  desc: string
  visual: React.ReactNode
  index: number
  horizontal?: boolean
}) {
  return (
    <motion.div
      className={`sa-tile ${className ?? ''}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: EASE }}
      whileHover={{ y: -5 }}
      onMouseMove={(e) => {
        const t = e.currentTarget
        const r = t.getBoundingClientRect()
        const glow = t.querySelector('.sa-tile-glow') as HTMLElement | null
        if (glow) {
          glow.style.background = `radial-gradient(440px circle at ${e.clientX - r.left}px ${
            e.clientY - r.top
          }px, rgba(99,102,241,0.10), transparent 65%)`
        }
      }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'saturate(160%) blur(14px)',
        WebkitBackdropFilter: 'saturate(160%) blur(14px)',
        border: '1px solid rgba(255,255,255,0.7)',
        borderRadius: 24,
        padding: 'clamp(24px, 2vw, 34px)',
        boxShadow: '0 6px 22px rgba(99,102,241,0.08)',
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
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: horizontal ? 'row' : 'column',
          gap: horizontal ? 'clamp(24px, 3vw, 48px)' : 0,
          alignItems: horizontal ? 'center' : 'stretch',
          flex: 1,
        }}
      >
        <div style={{ flex: horizontal ? 1 : undefined }}>
          <div
            className="sa-tile-icon"
            style={{
              width: 46,
              height: 46,
              background: '#eef2ff',
              borderRadius: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18,
              color: '#6366f1',
            }}
          >
            {icon}
          </div>
          <div
            style={{
              fontSize: 'clamp(17px, 1.25vw, 20px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 8,
              color: '#0a0a0a',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6, maxWidth: 380 }}>
            {desc}
          </div>
        </div>
        <div
          style={{
            marginTop: horizontal ? 0 : 'auto',
            paddingTop: horizontal ? 0 : 24,
            flex: horizontal ? 1 : undefined,
            minWidth: horizontal ? 0 : undefined,
          }}
        >
          {visual}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Features section ──────────────────────────────────────────── */

export default function Features() {
  return (
    <section
      id="fonctionnalités"
      style={{ padding: '40px clamp(24px, 6vw, 120px) 130px' }}
    >
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
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
            Fonctionnalités
          </p>
          <h2
            style={{
              fontSize: 'clamp(30px, 3.1vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: '0 0 16px',
            }}
          >
            Tout ce dont vous avez besoin
          </h2>
          <p style={{ fontSize: 'clamp(16px, 1.1vw, 19px)', color: '#6b7280', maxWidth: 560, margin: '0 auto' }}>
            Une plateforme complète pour trouver, qualifier et engager vos meilleurs prospects.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="sa-bento">
          <Tile
            className="sa-bento-wide"
            index={0}
            horizontal
            title="Prospect Finder"
            desc="Identifiez les entreprises les plus susceptibles d'acheter grâce au scoring IA en temps réel."
            icon={
              <svg width="21" height="21" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            }
            visual={<VisualFinder />}
          />
          <Tile
            index={1}
            title="Assistance IA"
            desc="Générez un résumé, un pitch personnalisé ou une préparation d'appel en un clic."
            icon={
              <svg width="21" height="21" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinejoin="round" />
              </svg>
            }
            visual={<VisualAI />}
          />
          <Tile
            index={2}
            title="Dashboard"
            desc="Visualisez vos performances : recherches, prospects qualifiés, score moyen, crédits."
            icon={
              <svg width="21" height="21" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            }
            visual={<VisualDash />}
          />
          <Tile
            className="sa-bento-wide"
            index={3}
            horizontal
            title="Export CSV"
            desc="Exportez vos prospects qualifiés directement dans votre CRM ou tableur favori."
            icon={
              <svg width="21" height="21" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            visual={<VisualExport />}
          />
        </div>
      </div>
    </section>
  )
}
