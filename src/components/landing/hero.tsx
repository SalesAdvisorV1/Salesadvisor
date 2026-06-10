'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView,
  useReducedMotion,
} from 'framer-motion'

/* ─── Constants ─────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const DEMO_URLS = ['doctolib.fr', 'qonto.com', 'alan.com', 'payfit.com']

const DEMO_PROSPECTS = [
  { company: 'Doctolib', sector: 'HealthTech · Paris', score: 94, status: 'Email généré' },
  { company: 'Qonto', sector: 'Fintech · Paris', score: 91, status: 'Appel préparé' },
  { company: 'Alan', sector: 'Assurtech · Paris', score: 88, status: 'Email généré' },
  { company: 'PayFit', sector: 'SaaS RH · Paris', score: 90, status: 'Pitch prêt' },
  { company: 'Swile', sector: 'RH Tech · Montpellier', score: 86, status: 'Email généré' },
  { company: 'Spendesk', sector: 'Fintech · Paris', score: 87, status: 'Appel préparé' },
]

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%)',
  'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
  'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
]

const STATS: { to: number; decimals: number; label: string; prefix?: string; suffix?: string }[] = [
  { to: 500, suffix: '+', decimals: 0, label: 'Équipes' },
  { to: 4.9, suffix: '/5', decimals: 1, label: 'Note moyenne' },
  { to: 30, suffix: 's', decimals: 0, label: 'Par prospect' },
  { to: 47, prefix: '+', decimals: 0, label: "Prospects qualifiés aujourd'hui" },
]

const TRUST_ITEMS = ['Aucune carte bancaire', 'Annulable à tout moment', 'Onboarding en 2 min']

/* ─── Animated headline — word by word reveal ───────────────────── */

const HEADLINE_LINES: { words: string[]; gradient: boolean }[] = [
  { words: ['Trouvez', 'vos', 'meilleurs'], gradient: false },
  { words: ['prospects.', 'Plus', 'vite.'], gradient: false },
  { words: ['Vendez', 'mieux.'], gradient: true },
]

function AnimatedHeadline() {
  let wordIndex = 0
  return (
    <h1
      style={{
        fontSize: 'clamp(40px, 4.3vw, 76px)',
        fontWeight: 800,
        letterSpacing: '-0.04em',
        lineHeight: 1.04,
        margin: '0 0 30px',
        color: '#0a0a0a',
        textAlign: 'left',
      }}
    >
      {HEADLINE_LINES.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.words.map((word) => {
            const idx = wordIndex++
            return (
              <span
                key={`${word}-${idx}`}
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  verticalAlign: 'bottom',
                  paddingBottom: '0.08em',
                  marginBottom: '-0.08em',
                  marginRight: '0.24em',
                }}
              >
                <motion.span
                  initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ delay: 0.15 + idx * 0.065, duration: 0.7, ease: EASE }}
                  style={{
                    display: 'inline-block',
                    ...(line.gradient
                      ? {
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }
                      : {}),
                  }}
                >
                  {word}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

/* ─── Magnetic CTA — follows the cursor slightly ────────────────── */

function MagneticCTA() {
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
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: '#fff',
          padding: '17px 34px',
          borderRadius: 9999,
          fontSize: 17,
          fontWeight: 600,
          textDecoration: 'none',
          display: 'inline-block',
          boxShadow: '0 6px 20px rgba(99,102,241,0.45), 0 1px 0 rgba(255,255,255,0.3) inset',
          transition: 'box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            '0 10px 30px rgba(99,102,241,0.6), 0 1px 0 rgba(255,255,255,0.3) inset'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            '0 6px 20px rgba(99,102,241,0.45), 0 1px 0 rgba(255,255,255,0.3) inset'
        }}
      >
        Essayer gratuitement — 14 jours
      </Link>
    </motion.div>
  )
}

/* ─── Animated counter ──────────────────────────────────────────── */

function CountUp({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
}) {
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
    const duration = 1500
    let raf: number
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(to * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, reduced])

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {value.toFixed(decimals).replace('.', ',')}
      {suffix}
    </span>
  )
}

/* ─── Typewriter URL (search bar of the mockup) ─────────────────── */

function useTypewriter() {
  const reduced = useReducedMotion()
  const [text, setText] = useState('')

  useEffect(() => {
    if (reduced) {
      setText(DEMO_URLS[0])
      return
    }
    let urlIdx = 0
    let charIdx = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const step = () => {
      const current = DEMO_URLS[urlIdx]
      if (!deleting) {
        charIdx++
        setText(current.slice(0, charIdx))
        if (charIdx === current.length) {
          deleting = true
          timer = setTimeout(step, 2000)
          return
        }
        timer = setTimeout(step, 80)
      } else {
        charIdx--
        setText(current.slice(0, charIdx))
        if (charIdx === 0) {
          deleting = false
          urlIdx = (urlIdx + 1) % DEMO_URLS.length
        }
        timer = setTimeout(step, 35)
      }
    }

    timer = setTimeout(step, 800)
    return () => clearTimeout(timer)
  }, [reduced])

  return text
}

/* ─── Floating glass card (parallax + idle float) ───────────────── */

function FloatingCard({
  children,
  style,
  parallaxX,
  parallaxY,
  floatDuration = 5,
  delay = 1.2,
}: {
  children: React.ReactNode
  style: React.CSSProperties
  parallaxX: ReturnType<typeof useTransform<number, number>>
  parallaxY: ReturnType<typeof useTransform<number, number>>
  floatDuration?: number
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className="sa-hero-float"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
      style={{ position: 'absolute', zIndex: 3, x: parallaxX, y: parallaxY, ...style }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'saturate(180%) blur(18px)',
          WebkitBackdropFilter: 'saturate(180%) blur(18px)',
          border: '1px solid rgba(255,255,255,0.7)',
          borderRadius: 16,
          padding: '12px 16px',
          boxShadow: '0 12px 36px rgba(99,102,241,0.18), 0 1px 0 rgba(255,255,255,0.7) inset',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/* ─── Product mockup — live Prospect Finder demo ────────────────── */

function HeroMockup({
  smx,
  smy,
}: {
  smx: ReturnType<typeof useSpring>
  smy: ReturnType<typeof useSpring>
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const typedUrl = useTypewriter()

  /* Mouse tilt */
  const tiltRotateY = useTransform(smx, [-0.5, 0.5], [-4.5, 4.5])
  const tiltRotateX = useTransform(smy, [-0.5, 0.5], [3, -3])

  /* Floating cards parallax (different depths) */
  const fx1 = useTransform(smx, [-0.5, 0.5], [-18, 18])
  const fy1 = useTransform(smy, [-0.5, 0.5], [-12, 12])
  const fx2 = useTransform(smx, [-0.5, 0.5], [22, -22])
  const fy2 = useTransform(smy, [-0.5, 0.5], [14, -14])
  const fx3 = useTransform(smx, [-0.5, 0.5], [-26, 26])
  const fy3 = useTransform(smy, [-0.5, 0.5], [16, -16])

  /* Cycling prospect rows */
  const generation = useRef(DEMO_PROSPECTS.length)
  const [rows, setRows] = useState(
    DEMO_PROSPECTS.slice(0, 4).map((p, i) => ({ ...p, key: `${p.company}-${i}` }))
  )

  useEffect(() => {
    if (reduced) return
    const interval = setInterval(() => {
      setRows((prev) => {
        const idx = generation.current++
        const next = DEMO_PROSPECTS[idx % DEMO_PROSPECTS.length]
        return [{ ...next, key: `${next.company}-${idx}` }, ...prev.slice(0, 3)]
      })
    }, 3200)
    return () => clearInterval(interval)
  }, [reduced])

  const ringCircumference = 2 * Math.PI * 24

  return (
    <div
      ref={containerRef}
      className="sa-hero-bleed"
      style={{
        position: 'relative',
        perspective: 1500,
      }}
    >
      {/* Glow behind the mockup — slow breathing */}
      <motion.div
        aria-hidden
        animate={reduced ? undefined : { opacity: [0.75, 1, 0.75], scale: [1, 1.045, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: '-8% -12%',
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.10) 45%, transparent 72%)',
          filter: 'blur(28px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Floating card — IA score ring */}
      <FloatingCard
        parallaxX={fx1}
        parallaxY={fy1}
        delay={1.15}
        floatDuration={5.5}
        style={{ top: -34, left: -62 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="#eef2ff" strokeWidth="5" />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="url(#sa-ring-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              transform="rotate(-90 28 28)"
              strokeDasharray={ringCircumference}
              initial={{ strokeDashoffset: ringCircumference }}
              whileInView={{ strokeDashoffset: ringCircumference * (1 - 0.94) }}
              viewport={{ once: true }}
              transition={{ delay: 1.7, duration: 1.4, ease: EASE }}
            />
            <defs>
              <linearGradient id="sa-ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <text
              x="28"
              y="32"
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fill="#0f172a"
            >
              94
            </text>
          </svg>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Score IA</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>Potentiel très élevé</div>
          </div>
        </div>
      </FloatingCard>

      {/* Floating card — generated email */}
      <FloatingCard
        parallaxX={fx2}
        parallaxY={fy2}
        delay={1.3}
        floatDuration={6.2}
        style={{ bottom: 90, left: -78 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'rgba(99,102,241,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Email généré</span>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="#d1fae5" />
                <path d="M4 7l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>Personnalisé · il y a 12s</div>
          </div>
        </div>
      </FloatingCard>

      {/* Floating card — qualified toast */}
      <FloatingCard
        parallaxX={fx3}
        parallaxY={fy3}
        delay={1.45}
        floatDuration={4.8}
        style={{ bottom: -28, right: 40 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="sa-live-dot" />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
            +3 prospects qualifiés
          </span>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>à l&apos;instant</span>
        </div>
      </FloatingCard>

      {/* Tilting frame — mouse tilt */}
      <div style={{ transformStyle: 'preserve-3d', position: 'relative', zIndex: 1 }}>
        <motion.div
          style={{
            rotateY: tiltRotateY,
            rotateX: tiltRotateX,
            transformStyle: 'preserve-3d',
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'saturate(180%) blur(24px)',
            WebkitBackdropFilter: 'saturate(180%) blur(24px)',
            border: '1px solid rgba(255,255,255,0.75)',
            borderRadius: 22,
            boxShadow:
              '0 40px 90px rgba(79,70,229,0.20), 0 12px 32px rgba(99,102,241,0.12), 0 1px 0 rgba(255,255,255,0.8) inset',
            overflow: 'hidden',
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 20px',
              borderBottom: '1px solid rgba(99,102,241,0.10)',
            }}
          >
            <div style={{ display: 'flex', gap: 6 }}>
              {['#fda4af', '#fcd34d', '#86efac'].map((c) => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div
              style={{
                flex: 1,
                maxWidth: 360,
                margin: '0 auto',
                background: 'rgba(99,102,241,0.06)',
                border: '1px solid rgba(99,102,241,0.12)',
                borderRadius: 9999,
                padding: '5px 14px',
                fontSize: 12,
                color: '#6b7280',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              app.sales-advisor.fr/prospect-finder
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <span className="sa-live-dot" />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#059669' }}>Live</span>
            </div>
          </div>

          {/* App body */}
          <div style={{ padding: 'clamp(16px, 2.5vw, 28px)' }}>
            {/* Search row */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#ffffff',
                  border: '1px solid rgba(99,102,241,0.22)',
                  borderRadius: 12,
                  padding: '13px 18px',
                  boxShadow: '0 2px 8px rgba(99,102,241,0.06)',
                }}
              >
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <span style={{ fontSize: 15, color: '#0f172a', fontWeight: 500 }}>
                  {typedUrl}
                  <span
                    className="sa-caret"
                    style={{
                      display: 'inline-block',
                      width: 2,
                      height: 17,
                      background: '#6366f1',
                      marginLeft: 2,
                      verticalAlign: 'middle',
                      borderRadius: 1,
                    }}
                  />
                </span>
              </div>
              <div
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: '#fff',
                  borderRadius: 12,
                  padding: '13px 26px',
                  fontSize: 15,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
                  whiteSpace: 'nowrap',
                }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.4">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinejoin="round" />
                </svg>
                Analyser
              </div>
            </div>

            {/* Prospect rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 332 }}>
              <AnimatePresence mode="popLayout" initial={false}>
                {rows.map((p, i) => (
                  <motion.div
                    key={p.key}
                    layout
                    initial={{ opacity: 0, y: -22, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 14, scale: 0.97 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      background: i === 0 ? 'rgba(99,102,241,0.05)' : '#ffffff',
                      border: `1px solid ${i === 0 ? 'rgba(99,102,241,0.22)' : 'rgba(15,23,42,0.06)'}`,
                      borderRadius: 14,
                      padding: '15px 18px',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: AVATAR_GRADIENTS[p.company.length % AVATAR_GRADIENTS.length],
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {p.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{p.company}</div>
                      <div style={{ fontSize: 13, color: '#9ca3af' }}>{p.sector}</div>
                    </div>
                    <div
                      className="sa-hero-row-status"
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: p.status === 'Email généré' ? '#059669' : '#4f46e5',
                        background: p.status === 'Email généré' ? 'rgba(5,150,105,0.08)' : 'rgba(99,102,241,0.08)',
                        borderRadius: 9999,
                        padding: '6px 14px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.status}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: '#6366f1',
                        background: 'rgba(99,102,241,0.10)',
                        borderRadius: 9999,
                        padding: '7px 14px',
                        fontVariantNumeric: 'tabular-nums',
                        flexShrink: 0,
                      }}
                    >
                      {p.score}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Hero section ──────────────────────────────────────────────── */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  /* Normalized mouse position (-0.5 → 0.5) shared by tilt + parallax */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 55, damping: 20 })
  const smy = useSpring(my, { stiffness: 55, damping: 20 })

  /* Cursor spotlight (px coordinates) */
  const spotX = useMotionValue(-400)
  const spotY = useMotionValue(-400)
  const sSpotX = useSpring(spotX, { stiffness: 80, damping: 24 })
  const sSpotY = useSpring(spotY, { stiffness: 80, damping: 24 })

  /* Layered exit parallax — text leaves faster than the mockup */
  const { scrollYProgress: heroProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const textY = useTransform(heroProgress, [0, 1], [0, -90])
  const textOpacity = useTransform(heroProgress, [0, 0.55], [1, 0.2])
  const mockupParallaxY = useTransform(heroProgress, [0, 1], [0, -34])
  const scrollCueOpacity = useTransform(heroProgress, [0, 0.15], [1, 0])

  return (
    <section
      ref={sectionRef}
      onMouseMove={(e) => {
        if (reduced || !sectionRef.current) return
        const r = sectionRef.current.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
        spotX.set(e.clientX - r.left)
        spotY.set(e.clientY - r.top)
      }}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 120,
        paddingBottom: 80,
        paddingLeft: 'clamp(24px, 6vw, 120px)',
        paddingRight: 'clamp(24px, 6vw, 120px)',
        overflow: 'hidden',
      }}
    >
      {/* Cursor spotlight */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          x: sSpotX,
          y: sSpotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 680,
          height: 680,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="sa-hero-grid"
        style={{ position: 'relative', zIndex: 1, maxWidth: 1600, margin: '0 auto', width: '100%' }}
      >
        {/* Text column — leaves with layered parallax on scroll */}
        <motion.div style={{ y: textY, opacity: textOpacity }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 34 }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(238,242,255,0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid #c7d2fe',
              borderRadius: 9999,
              padding: '7px 18px',
              fontSize: 14,
              color: '#4f46e5',
              fontWeight: 500,
              letterSpacing: '-0.01em',
            }}
          >
            <motion.span
              animate={reduced ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.55, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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

        {/* Headline — word by word */}
        <AnimatedHeadline />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
          style={{
            fontSize: 'clamp(17px, 1.15vw, 21px)',
            color: '#6b7280',
            lineHeight: 1.65,
            margin: '0 0 44px',
            maxWidth: 560,
          }}
        >
          Générez des emails personnalisés et préparez vos appels en moins de 30 secondes
          grâce à l&apos;IA.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            marginBottom: 30,
          }}
        >
          <MagneticCTA />
          <button
            style={{
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(15,23,42,0.12)',
              borderRadius: 9999,
              padding: '15px 28px',
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: '#0a0a0a',
              transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)'
              e.currentTarget.style.background = 'rgba(238,242,255,0.85)'
              e.currentTarget.style.transform = 'translateY(-1px)'
              const icon = e.currentTarget.querySelector('span') as HTMLSpanElement
              if (icon) icon.style.transform = 'scale(1.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(15,23,42,0.12)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.7)'
              e.currentTarget.style.transform = 'translateY(0)'
              const icon = e.currentTarget.querySelector('span') as HTMLSpanElement
              if (icon) icon.style.transform = 'scale(1)'
            }}
          >
            <span
              style={{
                width: 30,
                height: 30,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'transform 0.2s ease',
                boxShadow: '0 3px 10px rgba(99,102,241,0.35)',
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            display: 'flex',
            gap: 22,
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            marginBottom: 44,
          }}
        >
          {TRUST_ITEMS.map((item) => (
            <span
              key={item}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#9ca3af' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="#d1fae5" />
                <path d="M4 7l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </span>
          ))}
        </motion.div>

        {/* Stats — compact inline row under the text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            borderTop: '1px solid rgba(15,23,42,0.08)',
            paddingTop: 32,
            maxWidth: 660,
          }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: 'clamp(24px, 1.8vw, 32px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#0a0a0a',
                  lineHeight: 1,
                }}
              >
                <CountUp to={s.to} decimals={s.decimals} prefix={s.prefix ?? ''} suffix={s.suffix ?? ''} />
              </div>
              <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 7, lineHeight: 1.35, maxWidth: 150 }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
        </motion.div>

        {/* Mockup column — 3D perspective, bleeding off the right edge */}
        <div style={{ perspective: 1600 }}>
          <motion.div
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: EASE }}
          >
            <motion.div
              style={{
                y: mockupParallaxY,
                rotateY: -9,
                rotateX: 3.5,
                transformStyle: 'preserve-3d',
              }}
            >
              <HeroMockup smx={smx} smy={smy} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 26,
          left: '50%',
          translateX: '-50%',
          opacity: scrollCueOpacity,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          style={{
            width: 22,
            height: 36,
            borderRadius: 9999,
            border: '1.5px solid rgba(99,102,241,0.35)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <motion.span
            animate={reduced ? undefined : { y: [0, 10], opacity: [1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            style={{
              width: 4,
              height: 7,
              borderRadius: 9999,
              background: '#6366f1',
              display: 'block',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
