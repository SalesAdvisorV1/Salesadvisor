"use client";

import Link from "next/link";
import { useCreditsStore } from "@/stores/use-credits-store";

export function CreditsOverview() {
  const { remaining, total, initialized } = useCreditsStore();
  const used = total - remaining;
  const percent = total > 0 ? Math.round((remaining / total) * 100) : 0;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Crédits IA</h3>
          <p className="mt-1 text-sm text-slate-400">
            Utilisés pour enrichissement, pitch et résumés
          </p>
        </div>
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white">
          Plan Pro
        </span>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-5xl font-bold tracking-tight">
          {initialized ? remaining : "—"}
        </span>
        <span className="mb-2 text-slate-500">/ {total} restants</span>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-white/70 transition-all"
          style={{ width: `${initialized ? percent : 0}%` }}
        />
      </div>

      <CreditsMeta initialized={initialized} used={used} percent={percent} />

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <CreditCost label="Recherche enrichie" cost={2} />
        <CreditCost label="Résumé IA" cost={1} />
        <CreditCost label="Pitch personnalisé" cost={3} />
        <CreditCost label="Préparation appel" cost={2} />
      </div>

      <Link
        href="/billing"
        className="mt-6 flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-900"
      >
        Gérer mes crédits
      </Link>
    </div>
  );
}

function CreditsMeta({
  initialized,
  used,
  percent,
}: {
  initialized: boolean;
  used: number;
  percent: number;
}) {
  return (
    <div className="mt-3 flex justify-between text-xs text-slate-500">
      <span>{initialized ? `${used} utilisés ce mois` : "Chargement…"}</span>
      <span>{initialized ? `${percent}% disponible` : ""}</span>
    </div>
  );
}

function CreditCost({ label, cost }: { label: string; cost: number }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2">
      <div className="text-slate-500">{label}</div>
      <div className="mt-0.5 font-medium text-white">{cost} cr.</div>
    </div>
  );
}
