'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCreditsStore } from '@/stores/use-credits-store';

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </svg>
    ),
  },
  {
    href: '/prospect-finder',
    label: 'Prospect Finder',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/ai-assistant',
    label: 'Assistance IA',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/history',
    label: 'Historique',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/exports',
    label: 'Exports',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const BOTTOM_NAV = [
  {
    href: '/billing',
    label: 'Facturation',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Paramètres',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ── Nav item with hover micro-interactions ────────────────────────
function NavItem({
  href,
  label,
  icon,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 12px',
        borderRadius: '12px',
        fontSize: '13px',
        fontWeight: isActive ? 600 : 500,
        textDecoration: 'none',
        transition: 'all 180ms ease',
        transform: hovered && !isActive ? 'translateX(2px)' : 'none',
        cursor: 'pointer',
        ...(isActive
          ? {
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#ffffff',
              boxShadow:
                '0 4px 14px rgba(99,102,241,0.30), 0 1px 0 rgba(255,255,255,0.25) inset',
            }
          : hovered
          ? {
              background: 'rgba(99,102,241,0.07)',
              color: '#4f46e5',
            }
          : {
              color: '#64748b',
              background: 'transparent',
            }),
      }}
    >
      {/* Icon */}
      <span
        style={{
          display: 'flex',
          flexShrink: 0,
          transition: 'transform 180ms ease',
          transform: isActive ? 'scale(1.05)' : hovered ? 'scale(1.12)' : 'scale(1)',
        }}
      >
        {icon}
      </span>

      {/* Label */}
      <span style={{ flex: 1, letterSpacing: '-0.008em' }}>{label}</span>

      {/* Active dot */}
      {isActive && (
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.65)',
            flexShrink: 0,
          }}
        />
      )}
    </Link>
  );
}

// ── Section label ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: '10px',
        fontWeight: 700,
        color: '#b0bac8',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '0 10px 6px',
        marginTop: '4px',
      }}
    >
      {children}
    </p>
  );
}

// ── Main sidebar ──────────────────────────────────────────────────
export function Sidebar({ onNavClick }: { onNavClick?: () => void } = {}) {
  const pathname = usePathname();
  const { remaining, total, initialized } = useCreditsStore();

  const creditsValue = initialized ? remaining : 100;
  const creditsTotal = initialized ? total : 100;
  const percent =
    initialized && creditsTotal > 0
      ? Math.round((remaining / creditsTotal) * 100)
      : 0;

  const barColor =
    percent > 50
      ? 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)'
      : percent > 20
      ? 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
      : 'linear-gradient(90deg, #ef4444 0%, #f97316 100%)';

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 z-50 flex flex-col"
      style={{ padding: '10px' }}
    >
      {/* ── Floating glass card ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'saturate(180%) blur(24px)',
          WebkitBackdropFilter: 'saturate(180%) blur(24px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.68)',
          boxShadow:
            '0 4px 28px rgba(99,102,241,0.08), 0 1px 0 rgba(255,255,255,0.75) inset, 0 0 0 0.5px rgba(99,102,241,0.07)',
          overflow: 'hidden',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            height: 3,
            background:
              'linear-gradient(90deg, #6366f1 0%, #8b5cf6 55%, transparent 100%)',
            opacity: 0.45,
            flexShrink: 0,
          }}
        />

        {/* ── Logo ── */}
        <div style={{ padding: '14px 14px 10px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '11px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow:
                  '0 4px 12px rgba(99,102,241,0.38), 0 1px 0 rgba(255,255,255,0.4) inset',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                }}
              >
                SA
              </span>
            </div>
            <div>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #0f172a 0%, #4f46e5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Sales Advisor
              </p>
              <p style={{ fontSize: '10px', color: '#94a3b8', lineHeight: 1.3 }}>
                Prospection B2B
              </p>
            </div>

            {/* Online dot */}
            <div
              style={{ marginLeft: 'auto' }}
              title="Connecté"
            >
              <span className="sa-live-dot" style={{ width: 7, height: 7 }} />
            </div>
          </Link>
        </div>

        {/* Separator */}
        <div
          style={{
            height: 1,
            margin: '0 12px 8px',
            background: 'rgba(99,102,241,0.08)',
          }}
        />

        {/* ── Main nav ── */}
        <nav
          style={{
            flex: 1,
            padding: '0 8px',
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          <SectionLabel>Navigation</SectionLabel>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/')
                }
                onClick={onNavClick}
              />
            ))}
          </div>

          {/* Secondary separator */}
          <div
            style={{
              height: 1,
              margin: '10px 4px',
              background: 'rgba(99,102,241,0.08)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {BOTTOM_NAV.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={pathname === item.href}
                onClick={onNavClick}
              />
            ))}
          </div>
        </nav>

        {/* ── Credits widget ── */}
        <div style={{ padding: '8px 10px 10px' }}>
          <div
            style={{
              borderRadius: '14px',
              padding: '12px 14px',
              background:
                'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.06) 100%)',
              border: '1px solid rgba(99,102,241,0.14)',
              boxShadow: '0 2px 10px rgba(99,102,241,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <span
                style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}
              >
                Crédits IA
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '999px',
                  color: 'white',
                  background:
                    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  boxShadow: '0 2px 6px rgba(99,102,241,0.35)',
                  letterSpacing: '0.04em',
                }}
              >
                PRO
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2px' }}>
              <p
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {creditsValue}
              </p>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>
                / {creditsTotal}
              </span>
            </div>

            <p style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '8px' }}>
              {percent}% disponibles
            </p>

            {/* Progress bar */}
            <div
              style={{
                width: '100%',
                height: 4,
                borderRadius: '999px',
                background: 'rgba(99,102,241,0.12)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${percent}%`,
                  borderRadius: '999px',
                  background: barColor,
                  boxShadow: percent > 20 ? '0 0 8px rgba(99,102,241,0.45)' : 'none',
                  transition: 'width 500ms ease, background 400ms ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
