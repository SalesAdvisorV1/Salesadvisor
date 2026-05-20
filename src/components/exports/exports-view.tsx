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
      `prospects_${entry.sector}_${entry.city}_${new Date().toISOString().slice(0, 10)}.csv`.replace(/\s+/g, "_");
    downloadCsv(filename, csv);
    setExported((prev) => new Set(prev).add(entry.id));
  }

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Exports CSV</h1>
        <p className="mt-1 text-sm text-gray-500">
          Télécharge tes recherches au format CSV pour les intégrer dans ton CRM ou Excel.
        </p>
      </header>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {loading && (
          <p className="py-8 text-center text-sm text-gray-400">Chargement…</p>
        )}

        {error && (
          <p className="py-8 text-center text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && entries.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">Aucune recherche disponible.</p>
        )}

        {entries.map((entry, i) => (
          <div
            key={entry.id}
            className={`flex justify-between p-4 items-center hover:bg-gray-50 transition-colors ${
              i < entries.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900">
                {entry.sector} / {entry.city}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {entry.prospectCount} prospects · {formatRelativeTime(entry.createdAt)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleExport(entry)}
              disabled={entry.prospects.length === 0}
              className={`shrink-0 text-xs px-4 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                exported.has(entry.id)
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {exported.has(entry.id) ? "Téléchargé ✓" : "Télécharger CSV"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900">Format d'export</h3>
        <p className="mt-1 text-xs text-gray-500">
          Les fichiers CSV incluent : Entreprise, Secteur, Ville, Pays, Score IA, Site web, Raison de sélection.
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Compatibles avec Excel, Google Sheets, Notion, HubSpot, Pipedrive.
        </p>
      </div>
    </div>
  );
}
