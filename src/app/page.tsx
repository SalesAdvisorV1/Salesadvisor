'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Hero from '@/components/landing/hero'
import Process from '@/components/landing/process'
import Features from '@/components/landing/features'
import Testimonials from '@/components/landing/testimonials'
import SmoothScroll from '@/components/landing/smooth-scroll'

/* ─── Data ─────────────────────────────────────────────────────── */

/* ── Social proof clients — SVG paths from simple-icons ── */
const clients = [
  {
    name: 'Notion', color: '#000000',
    path: 'M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z',
  },
  {
    name: 'Stripe', color: '#635BFF',
    path: 'M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z',
  },
  {
    name: 'Figma', color: '#F24E1E',
    path: 'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z',
  },
  {
    name: 'Asana', color: '#F06A6A',
    path: 'M18.78 12.653c-2.882 0-5.22 2.336-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.34 5.22-5.22-2.336-5.22-5.22-5.22zm-13.56 0c-2.88 0-5.22 2.337-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.338 5.22-5.22-2.336-5.22-5.22-5.22zm12-6.525c0 2.883-2.337 5.22-5.22 5.22-2.882 0-5.22-2.337-5.22-5.22 0-2.88 2.338-5.22 5.22-5.22 2.883 0 5.22 2.34 5.22 5.22z',
  },
  {
    name: 'HubSpot', color: '#FF7A59',
    path: 'M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z',
  },
  {
    name: 'aircall', color: '#00B388',
    path: 'M23.451 5.906a6.978 6.978 0 0 0-5.375-5.39C16.727.204 14.508 0 12 0S7.273.204 5.924.516a6.978 6.978 0 0 0-5.375 5.39C.237 7.26.034 9.485.034 12s.203 4.74.515 6.094a6.978 6.978 0 0 0 5.375 5.39C7.273 23.796 9.492 24 12 24s4.727-.204 6.076-.516a6.978 6.978 0 0 0 5.375-5.39c.311-1.354.515-3.578.515-6.094 0-2.515-.203-4.74-.515-6.094zm-5.873 12.396l-.003.001c-.428.152-1.165.283-2.102.377l-.147.014a.444.444 0 0 1-.45-.271 1.816 1.816 0 0 0-1.296-1.074c-.351-.081-.928-.134-1.58-.134s-1.229.053-1.58.134a1.817 1.817 0 0 0-1.291 1.062.466.466 0 0 1-.471.281 8 8 0 0 0-.129-.012c-.938-.094-1.676-.224-2.105-.377l-.003-.001a.76.76 0 0 1-.492-.713c0-.032.003-.066.005-.098.073-.979.666-3.272 1.552-5.89C8.5 8.609 9.559 6.187 10.037 5.714a1.029 1.029 0 0 1 .404-.26l.004-.002c.314-.106.892-.178 1.554-.178.663 0 1.241.071 1.554.178l.005.002a1.025 1.025 0 0 1 .405.26c.478.472 1.537 2.895 2.549 5.887.886 2.617 1.479 4.91 1.552 5.89.002.032.005.066.005.098a.76.76 0 0 1-.491.713z',
  },
  {
    name: 'Zendesk', color: '#03363D',
    path: 'M12.914 2.904V16.29L24 2.905H12.914zM0 2.906C0 5.966 2.483 8.45 5.543 8.45s5.542-2.484 5.543-5.544H0zm11.086 4.807L0 21.096h11.086V7.713zm7.37 7.84c-3.063 0-5.542 2.48-5.542 5.543H24c0-3.06-2.48-5.543-5.543-5.543z',
  },
  {
    name: 'Intercom', color: '#1281CB',
    path: 'M21 0H3C1.343 0 0 1.343 0 3v18c0 1.658 1.343 3 3 3h18c1.658 0 3-1.342 3-3V3c0-1.657-1.342-3-3-3zm-5.801 4.399c0-.44.36-.8.802-.8.44 0 .8.36.8.8v10.688c0 .442-.36.801-.8.801-.443 0-.802-.359-.802-.801V4.399zM11.2 3.994c0-.44.357-.799.8-.799s.8.359.8.799v11.602c0 .44-.357.8-.8.8s-.8-.36-.8-.8V3.994zm-4 .405c0-.44.359-.8.799-.8.443 0 .802.36.802.8v10.688c0 .442-.36.801-.802.801-.44 0-.799-.359-.799-.801V4.399zM3.199 6c0-.442.36-.8.802-.8.44 0 .799.358.799.8v7.195c0 .441-.359.8-.799.8-.443 0-.802-.36-.802-.8V6zM20.52 18.202c-.123.105-3.086 2.593-8.52 2.593-5.433 0-8.397-2.486-8.521-2.593-.335-.288-.375-.792-.086-1.128.285-.334.79-.375 1.125-.09.047.041 2.693 2.211 7.481 2.211 4.848 0 7.456-2.186 7.479-2.207.334-.289.839-.25 1.128.086.289.336.25.84-.086 1.128zm.281-5.007c0 .441-.36.8-.801.8-.441 0-.801-.36-.801-.8V6c0-.442.361-.8.801-.8.441 0 .801.357.801.8v7.195z',
  },
  {
    name: 'Atlassian', color: '#0052CC',
    path: 'M7.12 11.084a.683.683 0 00-1.16.126L.075 22.974a.703.703 0 00.63 1.018h8.19a.678.678 0 00.63-.39c1.767-3.65.696-9.203-2.406-12.52zM11.434.386a15.515 15.515 0 00-.906 15.317l3.95 7.9a.703.703 0 00.628.388h8.19a.703.703 0 00.63-1.017L12.63.38a.664.664 0 00-1.196.006z',
  },
  {
    name: 'Dropbox', color: '#0061FF',
    path: 'M6 1.807L0 5.629l6 3.822 6.001-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z',
  },
  {
    name: 'Linear', color: '#5E6AD2',
    path: 'M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z',
  },
  {
    name: 'Airtable', color: '#18BFFF',
    path: 'M11.992 1.966c-.434 0-.87.086-1.28.257L1.779 5.917c-.503.208-.49.908.012 1.116l8.982 3.558a3.266 3.266 0 0 0 2.454 0l8.982-3.558c.503-.196.503-.908.012-1.116l-8.957-3.694a3.255 3.255 0 0 0-1.272-.257zM23.4 8.056a.589.589 0 0 0-.222.045l-10.012 3.877a.612.612 0 0 0-.38.564v8.896a.6.6 0 0 0 .821.552L23.62 18.1a.583.583 0 0 0 .38-.551V8.653a.6.6 0 0 0-.6-.596zM.676 8.095a.644.644 0 0 0-.48.19C.086 8.396 0 8.53 0 8.69v8.355c0 .442.515.737.908.54l6.27-3.006.307-.147 2.969-1.436c.466-.22.43-.908-.061-1.092L.883 8.138a.57.57 0 0 0-.207-.044z',
  },
]

/* ── integrations section data ── */
const partners = [
  {
    name: 'lemlist',
    color: '#FF4D00',
    bg: 'rgba(255,77,0,0.09)',
    desc: 'Séquences email',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#FF4D00" strokeWidth={1.9}>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 9l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 14l1.5 1.5" strokeLinecap="round" />
        <circle cx="17" cy="7" r="2.5" fill="#FF4D00" stroke="none" />
        <path d="M16 7h2M17 6v2" stroke="#fff" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'HubSpot',
    color: '#FF7A59',
    bg: 'rgba(255,122,89,0.09)',
    desc: 'CRM & Automation',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#FF7A59" strokeWidth={1.9}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Pipedrive',
    color: '#017737',
    bg: 'rgba(1,119,55,0.09)',
    desc: 'Pipeline de vente',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#017737" strokeWidth={1.9}>
        <path d="M3 20l4-7 4 3.5 4-8 4 4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="3" cy="20" r="1.5" fill="#017737" stroke="none" />
        <circle cx="7" cy="13" r="1.5" fill="#017737" stroke="none" />
        <circle cx="11" cy="16.5" r="1.5" fill="#017737" stroke="none" />
        <circle cx="15" cy="8.5" r="1.5" fill="#017737" stroke="none" />
        <circle cx="19" cy="12.5" r="1.5" fill="#017737" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Brevo',
    color: '#0092FF',
    bg: 'rgba(0,146,255,0.09)',
    desc: 'Email marketing',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#0092FF" strokeWidth={1.9}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'aircall',
    color: '#00B388',
    bg: 'rgba(0,179,136,0.09)',
    desc: 'Téléphonie VoIP',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#00B388" strokeWidth={1.9}>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 12 19.79 19.79 0 011 3.18 2 2 0 012.96 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.91a16 16 0 006.29 6.29l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Salesforce',
    color: '#00A1E0',
    bg: 'rgba(0,161,224,0.09)',
    desc: 'CRM Enterprise',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#00A1E0" strokeWidth={1.9}>
        <path d="M9.5 19H7A5 5 0 017 9h.5" strokeLinecap="round" />
        <path d="M14.5 5a5 5 0 015 5v1" strokeLinecap="round" />
        <path d="M6 12a6 6 0 016-6 6 6 0 014.8 2.4" strokeLinecap="round" />
        <path d="M19 14a3 3 0 010 6H8a4 4 0 110-8" strokeLinecap="round" />
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
        background: 'transparent',
        color: '#0a0a0a',
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <SmoothScroll />

      {/* ── NAVBAR ───────────────────────────────────────────────── */}
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
        <div
          className="sa-navbar"
          style={{
            width: '100%',
            maxWidth: 1600,
            height: 64,
            padding: '0 12px 0 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'saturate(180%) blur(22px)',
            WebkitBackdropFilter: 'saturate(180%) blur(22px)',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: 9999,
            boxShadow:
              '0 6px 24px rgba(99,102,241,0.10), 0 1px 0 rgba(255,255,255,0.6) inset',
            pointerEvents: 'auto',
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
                boxShadow:
                  '0 4px 12px rgba(99,102,241,0.35), 0 1px 0 rgba(255,255,255,0.4) inset',
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

          {/* Nav links — spread across the navbar width */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              gap: 8,
              margin: '0 12px',
            }}
          >
            {[
              { label: 'Fonctionnalités', href: '#fonctionnalités' },
              { label: 'Processus', href: '#processus' },
              { label: 'Tarifs', href: '#tarifs' },
              { label: 'Ressources', href: '#ressources' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  position: 'relative',
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
                  const t = e.currentTarget as HTMLAnchorElement
                  t.style.color = '#4f46e5'
                  t.style.background = 'rgba(99,102,241,0.08)'
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget as HTMLAnchorElement
                  t.style.color = '#374151'
                  t.style.background = 'transparent'
                }}
              >
                {item.label}
              </a>
            ))}
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
                const t = e.currentTarget as HTMLAnchorElement
                t.style.color = '#4f46e5'
                t.style.background = 'rgba(99,102,241,0.08)'
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLAnchorElement
                t.style.color = '#374151'
                t.style.background = 'transparent'
              }}
            >
              Connexion
            </Link>
            <Link
              href="/register"
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
                boxShadow:
                  '0 4px 14px rgba(99,102,241,0.45), 0 1px 0 rgba(255,255,255,0.3) inset',
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLAnchorElement
                t.style.transform = 'translateY(-1px)'
                t.style.boxShadow =
                  '0 8px 20px rgba(99,102,241,0.55), 0 1px 0 rgba(255,255,255,0.3) inset'
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLAnchorElement
                t.style.transform = 'translateY(0)'
                t.style.boxShadow =
                  '0 4px 14px rgba(99,102,241,0.45), 0 1px 0 rgba(255,255,255,0.3) inset'
              }}
            >
              Essayer 14 jours gratuits
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <Hero />

      {/* ── SOCIAL PROOF ─────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'transparent' }}>
        <div style={{ padding: '0 clamp(32px, 6vw, 120px)' }}>

          {/* Eyebrow — même style que les labels de section (PROCESSUS, etc.) */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#6366f1',
              textTransform: 'uppercase',
              marginBottom: 40,
            }}
          >
            Adopté par +500 équipes commerciales B2B
          </motion.p>

          {[clients.slice(0, 6), clients.slice(6, 12)].map((row, rowIdx) => (
            <div
              key={rowIdx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                alignItems: 'center',
                marginBottom: rowIdx === 0 ? 32 : 0,
              }}
            >
              {row.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (rowIdx * 6 + i) * 0.07, duration: 0.36 }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.opacity = '1'
                    el.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.opacity = '0.55'
                    el.style.transform = 'translateY(0)'
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    opacity: 0.55,
                    transition: 'opacity 0.2s ease, transform 0.18s ease',
                    cursor: 'default',
                    userSelect: 'none',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill={c.color}
                    aria-hidden="true"
                    style={{ flexShrink: 0 }}
                  >
                    <path d={c.path} />
                  </svg>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#0f172a',
                    whiteSpace: 'nowrap',
                    fontFamily: 'inherit',
                  }}>
                    {c.name}
                  </span>
                </motion.div>
              ))}
            </div>
          ))}

        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <Process />

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <Features />

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <Testimonials />

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section id="tarifs" style={{ padding: '96px 24px', background: 'transparent' }}>
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
                  background: plan.highlighted ? '#0a0a0a' : 'rgba(255,255,255,0.82)',
                  backdropFilter: plan.highlighted ? 'none' : 'blur(12px)',
                  WebkitBackdropFilter: plan.highlighted ? 'none' : 'blur(12px)',
                  border: `1px solid ${plan.highlighted ? 'transparent' : 'rgba(255,255,255,0.6)'}`,
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
          borderTop: '1px solid rgba(243,244,246,0.6)',
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
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
