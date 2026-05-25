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
      className="rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 45%, #8b5cf6 100%)',
        boxShadow: '0 12px 32px rgba(99,102,241,0.30), 0 1px 0 rgba(255,255,255,0.18) inset',
        color: '#ffffff',
      }}
    >
      {/* Decorative blur circles */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          left: -30,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'rgba(192,132,252,0.20)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 relative">
        <div>
          <h3 className="text-sm font-bold text-white mb-1">Crédits IA</h3>
          <p className="text-xs text-white/70">Enrichissement, pitch et résumés</p>
        </div>
        <span
          className="text-[10px] font-bold px-3 py-1 rounded-full tracking-wide shrink-0"
          style={{
            background: 'rgba(255,255,255,0.18)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Plan {planLabel}
        </span>
      </div>

      {/* Counter + bar */}
      <div className="relative">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-5xl font-extrabold text-white tabular-nums leading-none tracking-tight">
            {remaining !== null ? remaining : '—'}
          </span>
          <span className="text-white/60 text-sm">/ {total} restants</span>
        </div>

        <div
          className="w-full rounded-full h-2 mb-2"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${percent}%`,
              background: 'linear-gradient(90deg, #ffffff 0%, #e0e7ff 100%)',
              boxShadow: '0 0 12px rgba(255,255,255,0.6)',
            }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-white/60 font-medium">
          <span>{used !== null ? `${used} utilisés ce mois` : 'Chargement…'}</span>
          <span>{remaining !== null ? `${percent}% disponible` : ''}</span>
        </div>
      </div>

      {/* Cost grid */}
      <div className="grid grid-cols-2 gap-2 relative">
        {CREDIT_COSTS.map(({ label, cost }) => (
          <div
            key={label}
            className="rounded-xl p-3"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p className="text-[10px] text-white/70 mb-1 leading-snug font-medium">{label}</p>
            <p className="text-[14px] font-bold text-white">{cost} cr.</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/billing"
        className="flex w-full items-center justify-center rounded-full py-3 text-[13px] font-semibold transition-all duration-150 relative"
        style={{
          background: 'rgba(255,255,255,0.95)',
          color: '#4f46e5',
          boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
          (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.95)';
        }}
      >
        Gérer mes crédits
      </Link>
    </div>
  );
}
