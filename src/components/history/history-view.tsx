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
      <div className="mx-auto max-w-lg rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Impossible de charger l'historique
        </h2>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Historique des recherches</h1>
        <p className="mt-1 text-sm text-gray-500">
          {data.total} recherche{data.total > 1 ? "s" : ""} enregistrée{data.total > 1 ? "s" : ""}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <HistoryTable
            entries={data.entries}
            selectedId={selectedEntry?.id ?? null}
            onSelect={setSelectedEntry}
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Détail de la recherche</h2>
          {selectedEntry ? (
            <HistoryDetail entry={selectedEntry} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
              <p className="text-sm">Sélectionne une recherche pour voir les prospects.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HistoryLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-6">
      <div className="h-20 rounded-xl bg-gray-100" />
      <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
        <div className="h-96 rounded-xl bg-gray-100" />
        <div className="h-96 rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}
