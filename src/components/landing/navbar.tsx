'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/* ─── Constants ─────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: 'Fonctionnalités', href: '#fonctionnalités', id: 'fonctionnalités' },
  { label: 'Processus', href: '#processus', id: 'processus' },
  { label: 'Tarifs', href: '#tarifs', id: 'tarifs' },
  { label: 'Ressources', href: '#ressources', id: 'ressources' },
]

/* ─── Navbar ────────────────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [active, setActive] = useState<string | null>(null)

  /* Compact capsule once the page is scrolled */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      if (window.scrollY < 200) setActive(null)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Scroll spy — highlight the section currently on screen */
  useEffect(() => {
    const sections = NAV_ITEMS.map((i) => document.getElementById(i.id)).filter(
      Boolean
    ) as HTMLElement[]
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 16,
        left: 16,
        right: 16,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        className="sa-navbar"
        initial={{ y: -28, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          maxWidth: scrolled ? 1000 : 1280,
          height: scrolled ? 56 : 64,
          backgroundColor: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.72)',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        style={{
          width: '100%',
          padding: '0 12px 0 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          backdropFilter: 'saturate(180%) blur(22px)',
          WebkitBackdropFilter: 'saturate(180%) blur(22px)',
          border: '1px solid rgba(255,255,255,0.6)',
          borderRadius: 9999,
          boxShadow: scrolled
            ? '0 12px 36px rgba(99,102,241,0.16), 0 1px 0 rgba(255,255,255,0.6) inset'
            : '0 6px 24px rgba(99,102,241,0.10), 0 1px 0 rgba(255,255,255,0.6) inset',
          pointerEvents: 'auto',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: 11,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: '-0.02em',
              boxShadow: '0 4px 12px rgba(99,102,241,0.35), 0 1px 0 rgba(255,255,255,0.4) inset',
              flexShrink: 0,
            }}
          >
            SA
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '-0.025em',
              background: 'linear-gradient(135deg, #0a0a0a 0%, #4f46e5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Sales Advisor
          </span>
        </Link>

        {/* Nav links — centered cluster with magic hover pill */}
        <div
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
            margin: '0 12px',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHovered(item.label)}
                style={{
                  position: 'relative',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#4f46e5' : '#374151',
                  textDecoration: 'none',
                  padding: '9px 16px',
                  borderRadius: 9999,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.18s ease',
                }}
              >
                {hovered === item.label && (
                  <motion.span
                    layoutId="sa-nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(99,102,241,0.09)',
                      borderRadius: 9999,
                    }}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="sa-nav-active-dot"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      marginLeft: -2,
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#6366f1',
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
              </a>
            )
          })}
        </div>

        {/* CTA group */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <Link
            href="/login"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: '#374151',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: 9999,
              transition: 'color 0.15s ease, background 0.15s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#4f46e5'
              e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#374151'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Connexion
          </Link>
          <Link
            href="/register"
            className="btn-shimmer"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              boxShadow: '0 4px 14px rgba(99,102,241,0.45), 0 1px 0 rgba(255,255,255,0.3) inset',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow =
                '0 8px 20px rgba(99,102,241,0.55), 0 1px 0 rgba(255,255,255,0.3) inset'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow =
                '0 4px 14px rgba(99,102,241,0.45), 0 1px 0 rgba(255,255,255,0.3) inset'
            }}
          >
            Essayer 14 jours gratuits
          </Link>
        </div>
      </motion.div>
    </nav>
  )
}
