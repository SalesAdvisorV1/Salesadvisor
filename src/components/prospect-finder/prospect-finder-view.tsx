"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ProspectResultCard } from "@/components/prospect-finder/prospect-result-card";
import { ProspectSearchForm } from "@/components/prospect-finder/prospect-search-form";
import type { ProspectSearchFormValues } from "@/lib/schemas/prospect-search";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { ProspectSearchResponse } from "@/types/prospect";

const SEARCH_CREDIT_COST = 2;

async function runProspectSearch(
  filters: ProspectSearchFormValues,
): Promise<ProspectSearchResponse> {
  const res = await fetch("/api/prospect-search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Recherche impossible");
  }

  return res.json();
}

export function ProspectFinderView() {
  const [lastFilters, setLastFilters] = useState<ProspectSearchFormValues | null>(
    null,
  );
  const { remaining, consume, initialized } = useCreditsStore();

  const mutation = useMutation({
    mutationFn: runProspectSearch,
    onSuccess: (_data, variables) => {
      setLastFilters(variables);
      consume(SEARCH_CREDIT_COST);
    },
  });

  const handleSearch = (values: ProspectSearchFormValues) => {
    if (initialized && remaining < SEARCH_CREDIT_COST) {
      mutation.reset();
      return;
    }
    mutation.mutate(values);
  };

  const insufficientCredits =
    initialized && remaining < SEARCH_CREDIT_COST;

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Smart Prospect Finder</h1>
        <p className="mt-2 max-w-3xl text-slate-400">
          Recherche de prospects B2B qualifiés à partir de critères métier,
          géographiques et IA.
        </p>
      </header>

      {insufficientCredits ? (
        <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Crédits insuffisants ({remaining} restants). Recharge ton compte pour
          lancer une recherche.
        </div>
      ) : null}

      {mutation.isError ? (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {(mutation.error as Error).message}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <ProspectSearchForm
          onSubmit={handleSearch}
          isLoading={mutation.isPending}
        />

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold">Zone de prospection</h2>
            <ProspectionZone filters={lastFilters} />
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Résultats prospects</h2>
              {mutation.data ? (
                <span className="text-sm text-slate-400">
                  {mutation.data.total} trouvé(s)
                </span>
              ) : null}
            </div>

            <div className="mt-4 space-y-4">
              {mutation.isPending ? (
                <p className="text-sm text-slate-500">Analyse en cours…</p>
              ) : null}

              {!mutation.isPending && !mutation.data ? (
                <p className="text-sm text-slate-500">
                  Lance une recherche pour afficher les prospects.
                </p>
              ) : null}

              {mutation.data?.prospects.map((prospect) => (
                <ProspectResultCard key={prospect.id} prospect={prospect} />
              ))}
            </div>

            {lastFilters && mutation.data ? (
              <p className="mt-4 text-xs text-slate-500">
                Dernière recherche : {lastFilters.sector} · {lastFilters.city} ·{" "}
                {lastFilters.radius}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProspectionZone({ filters }: { filters: ProspectSearchFormValues | null }) {
  const dots = Array.from({ length: 130 });

  return (
    <div className="mt-4 relative h-80 overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#0a0a0a]">
      {/* dot grid */}
      <div className="absolute inset-0 grid grid-cols-[repeat(13,1fr)] gap-y-5 p-5 pointer-events-none">
        {dots.map((_, i) => (
          <span
            key={i}
            className="mx-auto h-[3px] w-[3px] rounded-full bg-white/10"
          />
        ))}
      </div>

      {/* center pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <span className="absolute h-24 w-24 rounded-full border border-white/5 animate-ping" style={{ animationDuration: "3s" }} />
          <span className="absolute h-40 w-40 rounded-full border border-white/[0.03]" />
          <span className="h-3 w-3 rounded-full bg-white/40" />
        </div>
      </div>

      {/* filters overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        {filters ? (
          <div className="flex flex-wrap gap-2">
            {filters.sector && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                {filters.sector}
              </span>
            )}
            {filters.city && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                {filters.city}
              </span>
            )}
            {filters.radius && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                {filters.radius}
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs text-white/20">Lance une recherche pour afficher la zone</p>
        )}
      </div>
    </div>
  );
}
