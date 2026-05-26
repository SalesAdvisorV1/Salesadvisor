"use client";

import Link from "next/link";
import { useCreditsStore } from "@/stores/use-credits-store";

const CREDIT_COSTS = [
  { label: "Recherche enrichie", cost: 2 },
  { label: "Résumé IA",          cost: 1 },
  { label: "Pitch personnalisé", cost: 3 },
  { label: "Préparation appel",  cost: 2 },
];

interface CreditsOverviewProps {
  credits?: number;
  totalCredits?: number;
  creditsRemaining?: number;
  creditsTotal?: number;
  plan?: string;
}

export function CreditsOverview({ credits, totalCredits, creditsRemaining, creditsTotal, plan }: CreditsOverviewProps) {
  const store = useCreditsStore();
  const remaining = creditsRemaining ?? credits ?? (store.initialized ? store.remaining : null);
  const total = creditsTotal ?? totalCredits ?? store.total;
  const planLabel = plan ?? 'Pro';

  const used = remaining !== null ? total - remaining : null;
  const percent = remaining !== null && total > 0 ? Math.round((remaining / total) * 100) : 0;

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(99,102,241,0.10)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#0f172a' }}>Crédits IA</h3>
          <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>Enrichissement, pitch et résumés</p>
        </div>
        <span
          className="text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide shrink-0 uppercase"
          style={{
            background: 'rgba(99,102,241,0.10)',
            color: '#4f46e5',
            border: '1px solid rgba(99,102,241,0.20)',
            letterSpacing: '0.04em',
          }}
        >
          Plan {planLabel}
        </span>
      </div>

      {/* Counter + bar */}
      <div>
        <div className="flex items-baseline gap-2 mb-3">
          <span
            className="tabular-nums leading-none"
            style={{ color: '#0f172a', fontSize: '40px', fontWeight: 700, letterSpacing: '-0.025em' }}
          >
            {remaining !== null ? remaining : '—'}
          </span>
          <span className="text-sm" style={{ color: '#94a3b8' }}>/ {total} restants</span>
        </div>

        <div
          className="w-full rounded-full h-1.5 mb-2 overflow-hidden"
          style={{ background: 'rgba(99,102,241,0.10)' }}
        >
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${percent}%`,
              background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
            }}
          />
        </div>

        <div className="flex justify-between text-[11px] font-medium" style={{ color: '#94a3b8' }}>
          <span>{used !== null ? `${used} utilisés ce mois` : 'Chargement…'}</span>
          <span className="tabular-nums">{remaining !== null ? `${percent}% disponible` : ''}</span>
        </div>
      </div>

      {/* Cost list — compact, no rainbow */}
      <div className="grid grid-cols-2 gap-1.5">
        {CREDIT_COSTS.map(({ label, cost }) => (
          <div
            key={label}
            className="flex items-center justify-between px-2.5 py-2 rounded-lg"
            style={{
              background: 'rgba(99,102,241,0.04)',
              border: '1px solid rgba(99,102,241,0.08)',
            }}
          >
            <span className="text-[11px] leading-tight" style={{ color: '#64748b' }}>{label}</span>
            <span className="text-[11px] font-semibold tabular-nums shrink-0 ml-2" style={{ color: '#4f46e5' }}>
              {cost} cr.
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/billing"
        className="flex w-full items-center justify-center rounded-full py-2.5 text-[13px] font-semibold transition-all duration-150 text-white"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          boxShadow: '0 4px 14px rgba(99,102,241,0.28), 0 1px 0 rgba(255,255,255,0.25) inset',
        }}
        onMouseEnter={(e) => {
          const t = e.currentTarget as HTMLAnchorElement;
          t.style.transform = 'translateY(-1px)';
          t.style.boxShadow = '0 8px 20px rgba(99,102,241,0.38), 0 1px 0 rgba(255,255,255,0.25) inset';
        }}
        onMouseLeave={(e) => {
          const t = e.currentTarget as HTMLAnchorElement;
          t.style.transform = 'translateY(0)';
          t.style.boxShadow = '0 4px 14px rgba(99,102,241,0.28), 0 1px 0 rgba(255,255,255,0.25) inset';
        }}
      >
        Gérer mes crédits
      </Link>
    </div>
  );
}
