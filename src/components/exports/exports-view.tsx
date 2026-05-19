"use client";

import { useEffect, useState } from "react";
import { formatRelativeTime } from "@/lib/format";
import type { HistoryEntry, HistoryListResponse } from "@/types/history";

function buildCsv(entry: HistoryEntry): string {
  const header = "Entreprise,Secteur,Ville,Pays,Score,Site web,Raison\n";
  const rows = entry.prospects
    .map((p) =>
      [
        `"${p.name}"`,
        `"${p.sector}"`,
        `"${p.city}"`,
        `"${p.country}"`,
        p.score,
        `"${p.website ?? ""}"`,
        `"${p.reason.replace(/"/g, "'")}"`,
      ].join(","),
    )
    .join("\n");

  return header + rows;
}

function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ExportsView() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exported, setExported] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/history")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json() as Promise<HistoryListResponse>;
      })
      .then((data) => setEntries(data.entries))
      .catch(() => setError("Impossible de charger l'historique."))
      .finally(() => setLoading(false));
  }, []);

  function handleExport(entry: HistoryEntry) {
    const csv = buildCsv(entry);
    if (!csv) return;
    const filename =
      `prospects_${entry.sector}_${entry.city}_${new Date().toISOString().slice(0, 10)}.csv`.replace(
        /\s+/g,
        "_",
      );
    downloadCsv(filename, csv);
    setExported((prev) => new Set(prev).add(entry.id));
  }

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="text-sm text-slate-400">Exports</p>
        <h1 className="mt-1 text-3xl font-semibold">Exports CSV</h1>
        <p className="mt-2 text-slate-400">
          Télécharge tes recherches au format CSV pour les intégrer dans ton CRM ou Excel.
        </p>
      </header>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold">Recherches disponibles</h2>

        <div className="mt-6 space-y-3">
          {loading && (
            <p className="py-6 text-center text-sm text-slate-500">Chargement…</p>
          )}

          {error && (
            <p className="py-6 text-center text-sm text-red-400">{error}</p>
          )}

          {!loading && !error && entries.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-500">
              Aucune recherche disponible.
            </p>
          )}

          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="font-medium text-white">
                  {entry.sector} / {entry.city}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {entry.prospectCount} prospects · {formatRelativeTime(entry.createdAt)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleExport(entry)}
                disabled={entry.prospects.length === 0}
                className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  exported.has(entry.id)
                    ? "bg-white/10 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {exported.has(entry.id) ? "Téléchargé ✓" : "Télécharger CSV"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <h3 className="font-medium text-white">Format d'export</h3>
        <p className="mt-1 text-sm text-slate-400">
          Les fichiers CSV incluent : Entreprise, Secteur, Ville, Pays, Score IA,
          Site web, Raison de sélection.
        </p>
        <p className="mt-3 text-xs text-slate-500">
          Compatibles avec Excel, Google Sheets, Notion, HubSpot, Pipedrive.
        </p>
      </div>
    </div>
  );
}
