'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isCrmRoute = pathname?.startsWith('/crm') ?? false;

  return (
    <div className="min-h-screen relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 w-[280px] flex flex-col transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(99,102,241,0.15)',
        }}
      >
        <div className="flex items-center justify-end p-3">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-indigo-600 p-2 rounded-xl hover:bg-indigo-50 transition-colors"
            aria-label="Fermer le menu"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Sidebar onNavClick={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Desktop sidebar (cachée sur /crm pour un layout immersif) */}
      {!isCrmRoute && (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div className={isCrmRoute ? "" : "md:pl-64"}>
        {/* Mobile header with hamburger */}
        <div
          className="flex items-center gap-3 px-4 py-3 md:hidden"
          style={{
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(99,102,241,0.10)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
            aria-label="Ouvrir le menu"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 3px 8px rgba(99,102,241,0.35)',
              }}
            >
              <span className="text-white text-[10px] font-black tracking-tight">SA</span>
            </div>
            <span
              className="text-sm font-bold"
              style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Sales Advisor
            </span>
          </div>
        </div>

        <Header />
        <main className="min-h-screen px-4 pb-10 md:px-8" style={{ paddingTop: '5.5rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
