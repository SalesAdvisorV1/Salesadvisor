'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pageName = getPageName(pathname);

  return (
    <header className="fixed top-0 left-64 right-0 h-14 bg-white border-b border-gray-200 z-40 flex items-center px-6 gap-4">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm shrink-0">
        <Link href="/" className="text-gray-400 hover:text-gray-700 transition-colors">Sales Advisor</Link>
        <span className="text-gray-300">/</span>
        <Link href={pathname} className="text-gray-900 font-semibold hover:text-gray-600 transition-colors">{pageName}</Link>
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
          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-300 transition-all"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notification bell */}
        <button type="button" className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
          <span className="text-white text-xs font-bold">V</span>
        </div>
      </div>
    </header>
  );
}
