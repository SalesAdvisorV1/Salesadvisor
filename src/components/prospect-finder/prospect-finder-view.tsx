"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ProspectResultCard } from "@/components/prospect-finder/prospect-result-card";
import { ProspectSearchForm } from "@/components/prospect-finder/prospect-search-form";
import type { ProspectSearchFormValues } from "@/lib/schemas/prospect-search";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { ProspectSearchResponse } from "@/types/prospect";
import { createClient } from "@/lib/supabase/client";

const SEARCH_CREDIT_COST = 2;

async function runProspectSearch(filters: ProspectSearchFormValues, userId: string | null): Promise<ProspectSearchResponse> {
  const res = await fetch("/api/prospect-search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...filters, userId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Recherche impossible");
  }

  const data = await res.json();

  console.log('[credits] userId:', userId, 'amount: 2');
  if (userId) {
    await fetch("/api/credits/decrement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount: 2 }),
    });
  }

  return data;
}

export function ProspectFinderView() {
  const [lastFilters, setLastFilters] = useState<ProspectSearchFormValues | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { remaining, consume, initialized } = useCreditsStore();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id || null));
  }, []);

  const mutation = useMutation({
    mutationFn: (filters: ProspectSearchFormValues) => runProspectSearch(filters, userId),
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

  const insufficientCredits = initialized && remaining < SEARCH_CREDIT_COST;

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Smart Prospect Finder</h1>
        <p className="mt-1 text-sm text-gray-500 max-w-2xl">
          Recherche de prospects B2B qualifiés à partir de critères métier, géographiques et IA.
        </p>
      </header>

      {insufficientCredits ? (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Crédits insuffisants ({remaining} restants). Recharge ton compte pour lancer une recherche.
        </div>
      ) : null}

      {mutation.isError ? (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {(mutation.error as Error).message}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <ProspectSearchForm onSubmit={handleSearch} isLoading={mutation.isPending} />

        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Zone de prospection</h2>
            <ProspectionZone filters={lastFilters} />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Résultats prospects</h2>
              {mutation.data ? (
                <span className="text-sm text-gray-500">{mutation.data.total} trouvé(s)</span>
              ) : null}
            </div>

            <div className="space-y-4">
              {mutation.isPending ? (
                <p className="text-sm text-gray-500">Analyse en cours…</p>
              ) : null}

              {!mutation.isPending && !mutation.data ? (
                <p className="text-sm text-gray-400">Lance une recherche pour afficher les prospects.</p>
              ) : null}

              {mutation.data?.prospects.map((prospect) => (
                <ProspectResultCard key={prospect.id} prospect={prospect} />
              ))}
            </div>

            {lastFilters && mutation.data ? (
              <p className="mt-4 text-xs text-gray-400">
                Dernière recherche : {lastFilters.sector} · {lastFilters.city} · {lastFilters.radius}
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
    <div className="relative h-72 overflow-hidden rounded-xl border border-gray-100 bg-white">
      {/* dot grid */}
      <div className="absolute inset-0 grid grid-cols-[repeat(13,1fr)] gap-y-5 p-5 pointer-events-none">
        {dots.map((_, i) => (
          <span key={i} className="mx-auto h-[3px] w-[3px] rounded-full bg-gray-200" />
        ))}
      </div>

      {/* center pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <span className="absolute h-24 w-24 rounded-full border border-gray-300 animate-ping" style={{ animationDuration: "3s" }} />
          <span className="absolute h-40 w-40 rounded-full border border-gray-100" />
          <span className="h-3 w-3 rounded-full bg-gray-900" />
        </div>
      </div>

      {/* filters overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/90 via-white/50 to-transparent">
        {filters ? (
          <div className="flex flex-wrap gap-2">
            {filters.sector && (
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                {filters.sector}
              </span>
            )}
            {filters.city && (
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                {filters.city}
              </span>
            )}
            {filters.radius && (
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                {filters.radius}
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs text-gray-400">Lance une recherche pour afficher la zone</p>
        )}
      </div>
    </div>
  );
}
