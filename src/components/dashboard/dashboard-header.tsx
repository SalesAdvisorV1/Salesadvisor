"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <div className="mb-8 pt-4">
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">
            Bonjour, {userName}
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-md leading-relaxed">
            Aperçu de ton activité, tes crédits et tes dernières recherches de prospects.
          </p>
        </div>

        <Link
          href="/prospect-finder"
          className="inline-flex w-fit items-center gap-2 bg-gray-900 text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shrink-0 min-h-[44px]"
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
        className="mt-4 flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
      >
        <Link
          href="/prospect-finder"
          className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-[12px] font-medium px-3 py-1.5 rounded-lg hover:bg-blue-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 min-h-[44px]"
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          Nouvelle recherche
        </Link>
        <Link
          href="/ai-assistant"
          className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 border border-violet-200 text-[12px] font-medium px-3 py-1.5 rounded-lg hover:bg-violet-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 min-h-[44px]"
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z" strokeLinecap="round" />
            <path d="M8 12h8M12 8v8" strokeLinecap="round" />
          </svg>
          Analyser IA
        </Link>
        <Link
          href="/exports"
          className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-[12px] font-medium px-3 py-1.5 rounded-lg hover:bg-green-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 min-h-[44px]"
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" />
            <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" />
          </svg>
          Exporter
        </Link>
      </motion.div>
    </div>
  );
}
