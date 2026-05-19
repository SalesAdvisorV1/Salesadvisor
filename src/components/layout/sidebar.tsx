'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: '/prospect-finder',
    label: 'Prospect Finder',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/ai-assistant',
    label: 'Assistance IA',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/history',
    label: 'Historique',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/exports',
    label: 'Exports',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const BOTTOM_ITEMS = [
  {
    href: '/billing',
    label: 'Facturation',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Paramètres',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0f0f0f] border-r border-[#1e1e1e] flex flex-col z-40">

      {/* Brand */}
      <div className="px-4 py-5 border-b border-[#1e1e1e]">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
            <span className="text-black text-[11px] font-black tracking-tight">SA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm tracking-tight leading-tight">Sales Advisor</span>
            <span className="text-[#444] text-xs">Prospection B2B</span>
          </div>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-[#333] mb-2 px-3">Menu</p>
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group ${
                  isActive
                    ? 'bg-white text-black font-medium'
                    : 'text-[#666] hover:text-white hover:bg-[#161616]'
                }`}
              >
                <span className={`shrink-0 transition-colors duration-150 ${isActive ? 'text-black' : 'text-[#555] group-hover:text-white'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4">
        {/* Credits widget */}
        <div className="bg-[#161616] rounded-xl p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-[#555] uppercase tracking-widest">Crédits IA</span>
            <span className="bg-white text-black text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
          </div>
          <div className="mb-2">
            <span className="text-white text-2xl font-bold">92</span>
          </div>
          <div className="w-full bg-[#1e1e1e] rounded-full h-1.5 mb-1.5">
            <div className="bg-white h-1.5 rounded-full" style={{ width: '92%' }} />
          </div>
          <p className="text-[#444] text-[10px]">8 utilisés · 92 restants</p>
        </div>

        {/* Separator + bottom nav */}
        <div className="border-t border-[#1e1e1e] pt-3 space-y-0.5">
          {BOTTOM_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group ${
                  isActive
                    ? 'bg-white text-black font-medium'
                    : 'text-[#666] hover:text-white hover:bg-[#161616]'
                }`}
              >
                <span className={`shrink-0 transition-colors duration-150 ${isActive ? 'text-black' : 'text-[#555] group-hover:text-white'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
