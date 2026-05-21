"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      <motion.header
        className="mb-6 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-gray-900">Smart Prospect Finder</h1>
        <p className="mt-1 text-sm text-gray-500 max-w-2xl">
          Recherche de prospects B2B qualifiés à partir de critères métier, géographiques et IA.
        </p>
      </motion.header>

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

            <AnimatePresence mode="wait">
              {mutation.isPending ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-xl border border-gray-100 p-5 space-y-3 animate-pulse">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
                          <div className="space-y-2">
                            <div className="h-4 w-36 bg-gray-200 rounded" />
                            <div className="h-3 w-24 bg-gray-100 rounded" />
                          </div>
                        </div>
                        <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-10 bg-gray-100 rounded-lg" />
                        <div className="h-10 bg-gray-100 rounded-lg" />
                      </div>
                      <div className="h-9 bg-gray-100 rounded-xl" />
                    </div>
                  ))}
                </motion.div>
              ) : !mutation.data ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.5}>
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                      <path d="M11 8v3l2 2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-700 text-sm">Lancez votre première recherche</p>
                  <p className="text-sm text-gray-400 mt-1 max-w-xs">
                    Remplissez le formulaire et découvrez des prospects B2B qualifiés par IA.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {mutation.data.prospects.map((prospect, i) => (
                    <motion.div
                      key={prospect.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ProspectResultCard prospect={prospect} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

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
