'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from '@/lib/supabase/auth';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { hasCrmAccess } from '@/lib/crm-access';

const PAGE_NAMES: Record<string, string> = {
  '/dashboard':       'Dashboard',
  '/crm':             'CRM Web Services',
  '/prospect-finder': 'Prospect Finder',
  '/ai-assistant':    'Assistance IA',
  '/history':         'Historique',
  '/exports':         'Exports',
  '/billing':         'Facturation',
  '/settings':        'Paramètres',
};

function getPageName(pathname: string): string {
  for (const [key, label] of Object.entries(PAGE_NAMES)) {
    if (pathname === key || pathname.startsWith(key + '/')) return label;
  }
  return 'Dashboard';
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const pageName = getPageName(pathname);

  // Récupérer l'email de l'utilisateur connecté pour gérer l'accès CRM
  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, []);
  const canSeeCrm = hasCrmAccess(userEmail);


  async function handleSignOut() {
    await signOut();
    router.push('/login');
  }

  return (
    <header
      className="sa-navbar hidden md:flex items-center"
      style={{
        position: 'fixed',
        top: '12px',
        left: 'calc(256px + 14px)',
        right: '16px',
        height: '56px',
        zIndex: 40,
        padding: '0 14px 0 20px',
        gap: '12px',
        /* Pill shape — matches landing page navbar */
        borderRadius: '9999px',
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'saturate(180%) blur(22px)',
        WebkitBackdropFilter: 'saturate(180%) blur(22px)',
        border: '1px solid rgba(255,255,255,0.65)',
        boxShadow: '0 6px 24px rgba(99,102,241,0.10), 0 1px 0 rgba(255,255,255,0.6) inset',
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm shrink-0">
        <Link
          href="/"
          style={{ color: '#94a3b8', fontWeight: 500, textDecoration: 'none', fontSize: '13px', transition: 'color 0.15s' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#4f46e5')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8')}
        >
          Sales Advisor
        </Link>
        <span style={{ color: '#e2e8f0', fontSize: '13px' }}>/</span>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #0a0a0a 0%, #4f46e5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {pageName}
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: '#94a3b8' }}
          width="13" height="13" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Recherche rapide…"
          style={{
            width: '100%',
            borderRadius: '9999px',
            paddingLeft: '32px',
            paddingRight: '14px',
            paddingTop: '7px',
            paddingBottom: '7px',
            fontSize: '13px',
            color: '#374151',
            background: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(99,102,241,0.14)',
            outline: 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#6366f1';
            e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)';
            e.target.style.background = '#ffffff';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(99,102,241,0.14)';
            e.target.style.boxShadow = 'none';
            e.target.style.background = 'rgba(255,255,255,0.55)';
          }}
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* CRM button (visible only for authorized emails) */}
        {canSeeCrm && (
          <Link
            href="/crm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '9999px',
              background: pathname.startsWith('/crm')
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'rgba(16,185,129,0.10)',
              color: pathname.startsWith('/crm') ? '#ffffff' : '#059669',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.02em',
              textDecoration: 'none',
              border: pathname.startsWith('/crm') ? 'none' : '1px solid rgba(16,185,129,0.22)',
              transition: 'all 0.15s ease',
              boxShadow: pathname.startsWith('/crm') ? '0 2px 8px rgba(16,185,129,0.30)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (!pathname.startsWith('/crm')) {
                e.currentTarget.style.background = 'rgba(16,185,129,0.18)';
              }
            }}
            onMouseLeave={(e) => {
              if (!pathname.startsWith('/crm')) {
                e.currentTarget.style.background = 'rgba(16,185,129,0.10)';
              }
            }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
            </svg>
            CRM
          </Link>
        )}
        {/* Notification bell */}
        <button
          type="button"
          style={{
            position: 'relative',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '9999px',
            background: 'rgba(99,102,241,0.06)',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            const t = e.currentTarget as HTMLButtonElement;
            t.style.background = 'rgba(99,102,241,0.14)';
            t.style.color = '#4f46e5';
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget as HTMLButtonElement;
            t.style.background = 'rgba(99,102,241,0.06)';
            t.style.color = '#6b7280';
          }}
        >
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ position: 'absolute', top: '6px', right: '6px', width: '7px', height: '7px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }} />
        </button>

        {/* Avatar / logout */}
        <button
          type="button"
          onClick={handleSignOut}
          title="Se déconnecter"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            boxShadow: '0 4px 12px rgba(99,102,241,0.35), 0 1px 0 rgba(255,255,255,0.3) inset',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => {
            const t = e.currentTarget as HTMLButtonElement;
            t.style.transform = 'scale(1.07)';
            t.style.boxShadow = '0 6px 16px rgba(99,102,241,0.48), 0 1px 0 rgba(255,255,255,0.3) inset';
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget as HTMLButtonElement;
            t.style.transform = 'scale(1)';
            t.style.boxShadow = '0 4px 12px rgba(99,102,241,0.35), 0 1px 0 rgba(255,255,255,0.3) inset';
          }}
        >
          <span style={{ color: 'white', fontSize: '11px', fontWeight: 800, letterSpacing: '-0.02em' }}>V</span>
        </button>
      </div>
    </header>
  );
}
