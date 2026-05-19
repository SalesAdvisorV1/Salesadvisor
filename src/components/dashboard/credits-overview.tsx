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
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white shadow-lg flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white mb-0.5">Crédits IA</h3>
          <p className="text-xs text-white/50">Enrichissement, pitch et résumés</p>
        </div>
        <span className="bg-white/10 text-white/80 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide shrink-0 border border-white/20">
          Plan {planLabel}
        </span>
      </div>

      {/* Counter + bar */}
      <div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-5xl font-black text-white tabular-nums leading-none">
            {remaining !== null ? remaining : '—'}
          </span>
          <span className="text-white/40 text-sm">/ {total} restants</span>
        </div>

        <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
          <div
            className="h-1.5 rounded-full bg-white transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-white/30">
          <span>{used !== null ? `${used} utilisés ce mois` : 'Chargement…'}</span>
          <span>{remaining !== null ? `${percent}% disponible` : ''}</span>
        </div>
      </div>

      {/* Cost grid */}
      <div className="grid grid-cols-2 gap-2">
        {CREDIT_COSTS.map(({ label, cost }) => (
          <div key={label} className="bg-white/10 rounded-xl p-3">
            <p className="text-[10px] text-white/50 mb-1 leading-snug">{label}</p>
            <p className="text-[13px] font-bold text-white">{cost} cr.</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/billing"
        className="flex w-full items-center justify-center bg-white/10 border border-white/20 rounded-xl py-2.5 text-[13px] text-white hover:bg-white/20 transition-all duration-150"
      >
        Gérer mes crédits
      </Link>
    </div>
  );
}
