"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [exporting, setExporting] = useState<Set<string>>(new Set());

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

  async function handleExport(entry: HistoryEntry) {
    const csv = buildCsv(entry);
    if (!csv) return;

    setExporting((prev) => new Set(prev).add(entry.id));
    await new Promise((r) => setTimeout(r, 600));

    const filename =
      `prospects_${entry.sector}_${entry.city}_${new Date().toISOString().slice(0, 10)}.csv`.replace(/\s+/g, "_");
    downloadCsv(filename, csv);

    setExporting((prev) => {
      const next = new Set(prev);
      next.delete(entry.id);
      return next;
    });
    setExported((prev) => new Set(prev).add(entry.id));
    setTimeout(() => {
      setExported((prev) => {
        const next = new Set(prev);
        next.delete(entry.id);
        return next;
      });
    }, 3000);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <motion.header
        className="mb-6 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-900">Exports CSV</h1>
        <p className="mt-1 text-sm text-gray-500">
          Télécharge tes recherches au format CSV pour les intégrer dans ton CRM ou Excel.
        </p>
      </motion.header>

      <motion.div
        className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {loading && (
          <div className="divide-y divide-gray-100">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between p-4 items-center animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-28 bg-gray-100 rounded" />
                </div>
                <div className="h-9 w-32 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="py-8 text-center text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && entries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-3">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth={1.5}>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" />
                <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600">Aucune recherche disponible.</p>
            <p className="text-xs text-gray-400 mt-1">Lance d'abord une recherche dans Prospect Finder.</p>
          </div>
        )}

        {entries.map((entry, i) => (
          <div
            key={entry.id}
            className={`flex justify-between p-4 items-center hover:bg-gray-50 transition-colors duration-150 ${
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

              {/* Progress bar during export */}
              <AnimatePresence>
                {exporting.has(entry.id) && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '100%' }}
                    exit={{ opacity: 0 }}
                    className="mt-2 h-1 rounded-full bg-gray-200 overflow-hidden w-36"
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)' }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => handleExport(entry)}
              disabled={entry.prospects.length === 0 || exporting.has(entry.id)}
              className={`shrink-0 text-xs px-4 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 min-h-[44px] ${
                exported.has(entry.id)
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : exporting.has(entry.id)
                  ? "bg-gray-100 text-gray-500 border border-gray-200"
                  : "sa-btn-primary"
              }`}
            >
              <AnimatePresence mode="wait">
                {exported.has(entry.id) ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                  >
                    ✓ Téléchargé
                  </motion.span>
                ) : exporting.has(entry.id) ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Préparation…
                  </motion.span>
                ) : (
                  <motion.span key="idle">Télécharger CSV</motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="mt-5 p-5 bg-white border border-gray-200 rounded-xl shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="text-sm font-semibold text-gray-900">Format d'export</h3>
        <p className="mt-1 text-xs text-gray-500">
          Les fichiers CSV incluent : Entreprise, Secteur, Ville, Pays, Score IA, Site web, Raison de sélection.
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Compatibles avec Excel, Google Sheets, Notion, HubSpot, Pipedrive.
        </p>
      </motion.div>
    </div>
  );
}
