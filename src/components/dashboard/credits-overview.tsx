"use client";

import Link from "next/link";
import { useCreditsStore } from "@/stores/use-credits-store";

export function CreditsOverview() {
  const { remaining, total, initialized } = useCreditsStore();
  const used = total - remaining;
  const percent = total > 0 ? Math.round((remaining / total) * 100) : 0;

  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="text-sm font-semibold text-white mb-1">Crédits IA</h3>
          <p className="text-xs text-[#555]">Enrichissement, pitch et résumés</p>
        </div>
        <span className="bg-white text-black text-[10px] px-2.5 py-1 rounded-full font-bold shrink-0">
          Plan Pro
        </span>
      </div>

      <div className="flex items-end gap-2 mb-3">
        <span className="text-5xl font-black text-white tracking-tight">
          {initialized ? remaining : "—"}
        </span>
        <span className="mb-2 text-xs text-[#555]">/ {total} restants</span>
      </div>

      <div className="w-full bg-[#1e1e1e] rounded-full h-2 mb-2">
        <div
          className="h-2 rounded-full bg-white transition-all duration-300"
          style={{ width: `${initialized ? percent : 0}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-[#333] mb-5">
        <span>{initialized ? `${used} utilisés ce mois` : "Chargement…"}</span>
        <span>{initialized ? `${percent}% disponible` : ""}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <CreditCost label="Recherche enrichie" cost={2} />
        <CreditCost label="Résumé IA" cost={1} />
        <CreditCost label="Pitch personnalisé" cost={3} />
        <CreditCost label="Préparation appel" cost={2} />
      </div>

      <Link
        href="/billing"
        className="flex w-full items-center justify-center bg-[#161616] border border-[#1e1e1e] rounded-xl py-2.5 text-sm text-white hover:bg-[#1e1e1e] transition-all duration-150"
      >
        Gérer mes crédits
      </Link>
    </div>
  );
}

function CreditCost({ label, cost }: { label: string; cost: number }) {
  return (
    <div className="bg-[#161616] border border-[#1e1e1e] rounded-xl p-3">
      <div className="text-[11px] text-[#555] mb-0.5">{label}</div>
      <div className="text-sm font-semibold text-white">{cost} cr.</div>
    </div>
  );
}
