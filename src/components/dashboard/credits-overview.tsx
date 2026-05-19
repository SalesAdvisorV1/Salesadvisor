"use client";

import Link from "next/link";
import { useCreditsStore } from "@/stores/use-credits-store";

const CREDIT_COSTS = [
  { label: "Recherche enrichie", cost: 2 },
  { label: "Résumé IA",          cost: 1 },
  { label: "Pitch personnalisé", cost: 3 },
  { label: "Préparation appel",  cost: 2 },
];

export function CreditsOverview() {
  const { remaining, total, initialized } = useCreditsStore();
  const used = total - remaining;
  const percent = total > 0 ? Math.round((remaining / total) * 100) : 0;

  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[13px] font-semibold text-white mb-0.5">Crédits IA</h3>
          <p className="text-[11px] text-[#444]">Enrichissement, pitch et résumés</p>
        </div>
        <span className="bg-white text-black text-[9px] font-black px-2.5 py-1 rounded-full tracking-wide shrink-0">
          Plan Pro
        </span>
      </div>

      {/* Counter + bar */}
      <div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-5xl font-black text-white tabular-nums leading-none">
            {initialized ? remaining : '—'}
          </span>
          <span className="text-[#444] text-sm">/ {total} restants</span>
        </div>

        <div className="w-full bg-[#1e1e1e] rounded-full h-1.5 mb-2">
          <div
            className="h-1.5 rounded-full bg-white transition-all duration-500"
            style={{ width: `${initialized ? percent : 0}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-[#333]">
          <span>{initialized ? `${used} utilisés ce mois` : 'Chargement…'}</span>
          <span>{initialized ? `${percent}% disponible` : ''}</span>
        </div>
      </div>

      {/* Cost grid */}
      <div className="grid grid-cols-2 gap-2">
        {CREDIT_COSTS.map(({ label, cost }) => (
          <div key={label} className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-3">
            <p className="text-[10px] text-[#444] mb-1 leading-snug">{label}</p>
            <p className="text-[13px] font-bold text-white">{cost} cr.</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/billing"
        className="flex w-full items-center justify-center bg-[#161616] border border-[#1e1e1e] rounded-lg py-2.5 text-[13px] text-white hover:bg-[#1e1e1e] hover:border-[#2a2a2a] transition-all duration-150"
      >
        Gérer mes crédits
      </Link>
    </div>
  );
}
