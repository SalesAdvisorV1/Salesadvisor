'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from '@/lib/supabase/auth';

const PAGE_NAMES: Record<string, string> = {
  '/dashboard':       'Dashboard',
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

  async function handleSignOut() {
    await signOut();
    router.push('/login');
  }

  return (
    <header
      className="fixed top-0 left-64 right-0 h-16 z-40 flex items-center px-6 gap-4 hidden md:flex"
      style={{
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'saturate(180%) blur(22px)',
        WebkitBackdropFilter: 'saturate(180%) blur(22px)',
        borderBottom: '1px solid rgba(99,102,241,0.10)',
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm shrink-0">
        <Link
          href="/"
          className="text-gray-400 hover:text-indigo-600 transition-colors font-medium"
        >
          Sales Advisor
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          href={pathname}
          className="font-semibold transition-colors"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #4f46e5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {pageName}
        </Link>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-sm relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          width="14" height="14" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Recherche rapide…"
          className="w-full rounded-full pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 transition-all"
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(99,102,241,0.15)',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#6366f1';
            e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)';
            e.target.style.background = '#ffffff';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(99,102,241,0.15)';
            e.target.style.boxShadow = 'none';
            e.target.style.background = 'rgba(255,255,255,0.6)';
          }}
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notification bell */}
        <button
          type="button"
          className="relative w-9 h-9 flex items-center justify-center rounded-full text-gray-500 transition-colors"
          style={{ background: 'rgba(99,102,241,0.06)' }}
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
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Logout button */}
        <button
          type="button"
          onClick={handleSignOut}
          title="Se déconnecter"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-transform"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            boxShadow: '0 4px 12px rgba(99,102,241,0.35), 0 1px 0 rgba(255,255,255,0.3) inset',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          <span className="text-white text-xs font-bold">V</span>
        </button>
      </div>
    </header>
  );
}
