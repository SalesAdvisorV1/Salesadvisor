"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <div className="mb-8 pt-2">
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div>
          {/* Greeting pill */}
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{
              background: 'rgba(99,102,241,0.10)',
              border: '1px solid rgba(99,102,241,0.18)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: '#6366f1' }}
            />
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#4f46e5' }}>
              Tableau de bord
            </span>
          </span>

          <h1
            className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #4f46e5 60%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.025em',
            }}
          >
            Bonjour, {userName} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-lg leading-relaxed">
            Aperçu de ton activité, tes crédits et tes dernières recherches de prospects.
          </p>
        </div>

        <Link
          href="/prospect-finder"
          className="inline-flex w-fit items-center gap-2 text-white text-[13px] font-semibold px-5 py-3 rounded-full transition-all duration-200 shrink-0"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            boxShadow: '0 6px 18px rgba(99,102,241,0.40), 0 1px 0 rgba(255,255,255,0.3) inset',
          }}
          onMouseEnter={(e) => {
            const t = e.currentTarget as HTMLAnchorElement;
            t.style.transform = 'translateY(-1px)';
            t.style.boxShadow = '0 10px 24px rgba(99,102,241,0.50), 0 1px 0 rgba(255,255,255,0.3) inset';
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget as HTMLAnchorElement;
            t.style.transform = 'translateY(0)';
            t.style.boxShadow = '0 6px 18px rgba(99,102,241,0.40), 0 1px 0 rgba(255,255,255,0.3) inset';
          }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          Nouvelle recherche
        </Link>
      </motion.div>

      {/* Quick actions */}
      <motion.div
        className="mt-5 flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
      >
        {[
          {
            href: '/prospect-finder',
            label: 'Nouvelle recherche',
            color: '#6366f1',
            bg: 'rgba(99,102,241,0.10)',
            border: 'rgba(99,102,241,0.22)',
            icon: (
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            ),
          },
          {
            href: '/ai-assistant',
            label: 'Analyser IA',
            color: '#8b5cf6',
            bg: 'rgba(139,92,246,0.10)',
            border: 'rgba(139,92,246,0.22)',
            icon: (
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
          },
          {
            href: '/exports',
            label: 'Exporter',
            color: '#10b981',
            bg: 'rgba(16,185,129,0.10)',
            border: 'rgba(16,185,129,0.22)',
            icon: (
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" />
                <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" />
              </svg>
            ),
          },
        ].map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-2 rounded-full transition-all duration-150"
            style={{
              background: q.bg,
              color: q.color,
              border: `1px solid ${q.border}`,
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget as HTMLAnchorElement;
              t.style.transform = 'translateY(-1px)';
              t.style.boxShadow = `0 4px 10px ${q.bg}`;
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget as HTMLAnchorElement;
              t.style.transform = 'translateY(0)';
              t.style.boxShadow = 'none';
            }}
          >
            {q.icon}
            {q.label}
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
