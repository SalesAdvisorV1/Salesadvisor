"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HistoryDetail } from "@/components/history/history-detail";
import { HistoryTable } from "@/components/history/history-table";
import type { HistoryEntry, HistoryListResponse } from "@/types/history";

async function fetchHistory(): Promise<HistoryListResponse> {
  const res = await fetch("/api/history");
  if (!res.ok) throw new Error("Impossible de charger l'historique");
  return res.json();
}

export function HistoryView() {
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["history"],
    queryFn: fetchHistory,
    staleTime: 60_000,
  });

  if (isLoading) {
    return <HistoryLoadingSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Impossible de charger l'historique
        </h2>
        <button
          type="button"
          onClick={() => refetch()}
          className="sa-btn-primary mt-6 rounded-xl px-5 py-2.5 text-sm font-medium min-h-[44px]"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <motion.header
        className="mb-6 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-900">Historique des recherches</h1>
        <p className="mt-1 text-sm text-gray-500">
          {data.total} recherche{data.total > 1 ? "s" : ""} enregistrée{data.total > 1 ? "s" : ""}
        </p>
      </motion.header>

      <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
        <motion.div
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <HistoryTable
            entries={data.entries}
            selectedId={selectedEntry?.id ?? null}
            onSelect={setSelectedEntry}
          />
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <h2 className="text-base font-semibold text-gray-900 mb-4">Détail de la recherche</h2>
          <AnimatePresence mode="wait">
            {selectedEntry ? (
              <motion.div
                key={selectedEntry.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <HistoryDetail entry={selectedEntry} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-3">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth={1.5}>
                    <path d="M9 12h6M9 16h6M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600">Sélectionne une recherche</p>
                <p className="text-xs text-gray-400 mt-1">pour afficher les prospects.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function HistoryLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="h-20 rounded-xl bg-gray-100 animate-pulse" />
      <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
        <div className="rounded-xl bg-white border border-gray-100 p-5 space-y-3 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-200 mt-1.5 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-100 rounded" />
              </div>
              <div className="text-right space-y-1.5">
                <div className="h-4 w-8 bg-gray-200 rounded ml-auto" />
                <div className="h-3 w-12 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-96 rounded-xl bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}
