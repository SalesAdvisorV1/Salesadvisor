'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCreditsStore } from '@/stores/use-credits-store';

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: '/prospect-finder',
    label: 'Prospect Finder',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/ai-assistant',
    label: 'Assistance IA',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/history',
    label: 'Historique',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/exports',
    label: 'Exports',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Paramètres',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
      </svg>
    ),
  },
];

function NavItem({ href, label, icon, isActive, onClick }: { href: string; label: string; icon: React.ReactNode; isActive: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
      style={
        isActive
          ? {
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(99,102,241,0.32), 0 1px 0 rgba(255,255,255,0.3) inset',
            }
          : {
              color: '#4b5563',
              background: 'transparent',
            }
      }
      onMouseEnter={(e) => {
        if (isActive) return;
        const t = e.currentTarget as HTMLAnchorElement;
        t.style.background = 'rgba(99,102,241,0.08)';
        t.style.color = '#4f46e5';
      }}
      onMouseLeave={(e) => {
        if (isActive) return;
        const t = e.currentTarget as HTMLAnchorElement;
        t.style.background = 'transparent';
        t.style.color = '#4b5563';
      }}
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar({ onNavClick }: { onNavClick?: () => void } = {}) {
  const pathname = usePathname();
  const { remaining, total, initialized } = useCreditsStore();

  const creditsValue = initialized ? remaining : 100;
  const creditsTotal = initialized ? total : 100;
  const percent = initialized && creditsTotal > 0 ? Math.round((remaining / creditsTotal) * 100) : 0;

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col z-50"
      style={{
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'saturate(180%) blur(22px)',
        WebkitBackdropFilter: 'saturate(180%) blur(22px)',
        borderRight: '1px solid rgba(99,102,241,0.12)',
      }}
    >
      {/* Logo + brand */}
      <div className="px-4 pt-5 pb-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 4px 12px rgba(99,102,241,0.35), 0 1px 0 rgba(255,255,255,0.4) inset',
            }}
          >
            <span className="text-white text-[11px] font-black tracking-tight">SA</span>
          </div>
          <div>
            <p
              className="text-sm font-bold leading-tight"
              style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Sales Advisor
            </p>
            <p className="text-[10px] text-gray-400 leading-tight">Prospection B2B</p>
          </div>
        </Link>
      </div>

      <div className="mx-4 h-px mb-4" style={{ background: 'rgba(99,102,241,0.10)' }} />

      {/* Main navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Navigation</p>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
            onClick={onNavClick}
          />
        ))}

        <div className="h-px my-3" style={{ background: 'rgba(99,102,241,0.10)' }} />

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
      </nav>

      {/* Credits widget */}
      <div className="px-3 pb-4">
        <div
          className="rounded-2xl p-3.5"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.08) 100%)',
            border: '1px solid rgba(99,102,241,0.18)',
            boxShadow: '0 4px 16px rgba(99,102,241,0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-gray-600 font-semibold">Crédits IA</span>
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 2px 6px rgba(99,102,241,0.35)',
              }}
            >
              PRO
            </span>
          </div>
          <p
            className="text-xl font-bold tabular-nums leading-tight"
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {creditsValue}
          </p>
          <p className="text-[10px] text-gray-500 mb-2">sur {creditsTotal} disponibles</p>
          <div className="w-full rounded-full h-1.5" style={{ background: 'rgba(99,102,241,0.15)' }}>
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${percent}%`,
                background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 0 8px rgba(99,102,241,0.4)',
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
