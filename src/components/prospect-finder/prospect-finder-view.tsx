"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProspectionMap } from "@/components/prospect-finder/prospection-map";
import { ProspectResultCard } from "@/components/prospect-finder/prospect-result-card";
import { ProspectSearchForm } from "@/components/prospect-finder/prospect-search-form";
import { EnrichPanel } from "@/components/prospect-finder/enrich-panel";
import type { ProspectSearchFormValues } from "@/lib/schemas/prospect-search";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { ProspectResult, ProspectSearchResponse } from "@/types/prospect";
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
  const [enrichTarget, setEnrichTarget] = useState<ProspectResult | null>(null);
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
        className="mb-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1
          className="text-[28px] md:text-[32px] leading-tight"
          style={{ color: '#0f172a', fontWeight: 700, letterSpacing: '-0.028em' }}
        >
          Smart Prospect Finder
        </h1>
        <p className="mt-2 text-sm max-w-2xl leading-relaxed" style={{ color: '#64748b' }}>
          Recherche de prospects B2B qualifiés à partir de critères métier, géographiques et IA.
        </p>
      </motion.header>

      {insufficientCredits ? (
        <div
          className="mb-5 rounded-xl px-4 py-3 text-sm"
          style={{
            background: 'rgba(245,158,11,0.10)',
            border: '1px solid rgba(245,158,11,0.25)',
            color: '#b45309',
          }}
        >
          Crédits insuffisants ({remaining} restants). Recharge ton compte pour lancer une recherche.
        </div>
      ) : null}

      {mutation.isError ? (
        <div
          className="mb-5 rounded-xl px-4 py-3 text-sm"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.22)',
            color: '#dc2626',
          }}
        >
          {(mutation.error as Error).message}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] items-start">
        <ProspectSearchForm onSubmit={handleSearch} isLoading={mutation.isPending} />

        <div className="space-y-6">
          <div
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(255,255,255,0.78)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(99,102,241,0.10)',
              boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
            }}
          >
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#0f172a' }}>Zone de prospection</h2>
            <ProspectionMap filters={lastFilters} prospects={mutation.data?.prospects ?? []} />
          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(255,255,255,0.78)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(99,102,241,0.10)',
              boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold" style={{ color: '#0f172a' }}>Résultats prospects</h2>
              {mutation.data ? (
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums"
                  style={{ background: 'rgba(99,102,241,0.08)', color: '#4f46e5' }}
                >
                  {mutation.data.total} trouvé(s)
                </span>
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
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse rounded-xl h-48"
                      style={{
                        background: 'linear-gradient(90deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.10) 50%, rgba(99,102,241,0.06) 100%)',
                      }}
                    />
                  ))}
                </motion.div>
              ) : !mutation.data ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(99,102,241,0.08)',
                      border: '1px solid rgba(99,102,241,0.16)',
                      color: '#4f46e5',
                    }}
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-sm max-w-xs leading-relaxed" style={{ color: '#64748b' }}>
                    Définissez vos critères et lancez une recherche pour trouver vos prospects B2B
                  </p>
                </motion.div>
              ) : mutation.data.prospects.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(245,158,11,0.10)',
                      border: '1px solid rgba(245,158,11,0.22)',
                      color: '#b45309',
                    }}
                  >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                      <path d="M8 11h6" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-sm max-w-xs leading-relaxed" style={{ color: '#64748b' }}>
                    Aucun résultat trouvé. Essayez d'élargir votre rayon ou de modifier le secteur.
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
                      <ProspectResultCard
                        prospect={prospect}
                        onEnrich={() => setEnrichTarget(prospect)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {lastFilters && mutation.data ? (
              <p className="mt-4 text-xs" style={{ color: '#94a3b8' }}>
                Dernière recherche : {lastFilters.sector} · {lastFilters.city} · {lastFilters.radius}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {enrichTarget && (
          <EnrichPanel
            prospect={enrichTarget}
            onClose={() => setEnrichTarget(null)}
            userId={userId}
            onCreditsConsumed={consume}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

