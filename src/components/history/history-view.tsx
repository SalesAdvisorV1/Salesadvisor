"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
      <div className="mx-auto max-w-lg rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-200">
          Impossible de charger l'historique
        </h2>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-2xl bg-slate-800 px-5 py-2.5 text-sm font-medium hover:bg-slate-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <p className="text-sm text-blue-400">Module 4</p>
        <h1 className="mt-1 text-3xl font-semibold">Historique des recherches</h1>
        <p className="mt-2 text-slate-400">
          {data.total} recherche{data.total > 1 ? "s" : ""} enregistrée
          {data.total > 1 ? "s" : ""}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
        <HistoryTable
          entries={data.entries}
          selectedId={selectedEntry?.id ?? null}
          onSelect={setSelectedEntry}
        />

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold">Détail de la recherche</h2>
          <div className="mt-6">
            {selectedEntry ? (
              <HistoryDetail entry={selectedEntry} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
                <p>Sélectionne une recherche pour voir les prospects.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-6">
      <div className="h-24 rounded-3xl bg-slate-800/60" />
      <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
        <div className="h-96 rounded-3xl bg-slate-800/60" />
        <div className="h-96 rounded-3xl bg-slate-800/60" />
      </div>
    </div>
  );
}
