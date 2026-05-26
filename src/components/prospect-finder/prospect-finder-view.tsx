"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProspectionMap } from "@/components/prospect-finder/prospection-map";
import { ProspectResultCard } from "@/components/prospect-finder/prospect-result-card";
import { ProspectSearchForm } from "@/components/prospect-finder/prospect-search-form";
import { EnrichPanel } from "@/components/prospect-finder/enrich-panel";
import { DatabaseSearchForm } from "@/components/prospect-finder/database-search-form";
import { DatabaseResultsTable } from "@/components/prospect-finder/database-results-table";
import type { ProspectSearchFormValues } from "@/lib/schemas/prospect-search";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { ProspectResult, ProspectSearchResponse } from "@/types/prospect";
import type { DatabaseSearchFilters, DatabaseSearchResponse } from "@/types/database-prospect";
import { createClient } from "@/lib/supabase/client";

const SEARCH_CREDIT_COST = 2;
const DB_SEARCH_CREDIT_COST = 1;

// ── Ghost preview cards (empty state) ────────────────────────────
function GhostProspectCards() {
  const ghosts = [
    { nameW: "54%", reasonH: 38 },
    { nameW: "43%", reasonH: 0 },
    { nameW: "61%", reasonH: 34 },
  ];
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Blurred skeleton cards */}
      <div style={{ filter: "blur(2px)", opacity: 0.28, pointerEvents: "none", userSelect: "none" }}>
        {ghosts.map((g, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(99,102,241,0.12)",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: i < 2 ? "12px" : 0,
            }}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ height: 15, width: g.nameW, borderRadius: 4, background: "rgba(15,23,42,0.20)", marginBottom: 8 }} />
                    <div style={{ display: "flex", gap: 6 }}>
                      <div style={{ height: 20, width: 68, borderRadius: 6, background: "rgba(99,102,241,0.18)" }} />
                      <div style={{ height: 14, width: 54, borderRadius: 4, background: "rgba(15,23,42,0.08)" }} />
                    </div>
                  </div>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", border: "3px solid rgba(16,185,129,0.25)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ height: 14, width: 24, borderRadius: 4, background: "rgba(16,185,129,0.22)" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                  {[76, 58, 90].map((w, j) => (
                    <div key={j} style={{ height: 24, width: w, borderRadius: 6, background: "rgba(99,102,241,0.09)" }} />
                  ))}
                </div>
              </div>
            </div>
            {g.reasonH > 0 && (
              <div style={{ height: g.reasonH, borderRadius: 8, background: "rgba(99,102,241,0.04)", marginTop: 12 }} />
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(99,102,241,0.08)" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {[0,1,2].map(j => <div key={j} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(99,102,241,0.08)" }} />)}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ height: 28, width: 68, borderRadius: 999, background: "rgba(139,92,246,0.10)" }} />
                <div style={{ height: 28, width: 76, borderRadius: 999, background: "rgba(99,102,241,0.08)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "52%",
        background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.97))",
        pointerEvents: "none",
      }} />

      {/* Centered overlay */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        paddingBottom: "10px",
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#4f46e5", marginBottom: 14,
          boxShadow: "0 4px 16px rgba(99,102,241,0.12)",
        }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
        </div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 6, letterSpacing: "-0.015em" }}>
          Vos prospects B2B qualifiés
        </p>
        <p style={{ fontSize: 12, color: "#64748b", maxWidth: 230, textAlign: "center", lineHeight: 1.55 }}>
          Score IA · Décideurs identifiés · Email prêt à envoyer
        </p>
      </div>
    </div>
  );
}

type ActiveTab = "targeted" | "database";

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

async function runDatabaseSearch(filters: DatabaseSearchFilters): Promise<DatabaseSearchResponse> {
  const res = await fetch("/api/database-search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Recherche base de données impossible");
  }

  return res.json();
}

export function ProspectFinderView() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("targeted");

  // Targeted search state
  const [lastFilters, setLastFilters] = useState<ProspectSearchFormValues | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [enrichTarget, setEnrichTarget] = useState<ProspectResult | null>(null);

  // Database search state
  const [dbData, setDbData] = useState<DatabaseSearchResponse | null>(null);
  const [dbLoading, setDbLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [dbFilters, setDbFilters] = useState<DatabaseSearchFilters | null>(null);
  const [dbHasSearched, setDbHasSearched] = useState(false);

  const { remaining, consume, initialized } = useCreditsStore();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id || null));
  }, []);

  // ── Targeted search ──────────────────────────────────────────────
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

  // ── Database search ───────────────────────────────────────────────
  const handleDatabaseSearch = async (filters: DatabaseSearchFilters) => {
    if (initialized && remaining < DB_SEARCH_CREDIT_COST) {
      setDbError("Crédits insuffisants pour lancer une recherche.");
      return;
    }

    setDbLoading(true);
    setDbError(null);
    setDbFilters(filters);
    setDbHasSearched(true);

    try {
      const data = await runDatabaseSearch(filters);
      setDbData(data);
      consume(DB_SEARCH_CREDIT_COST);
      if (userId) {
        await fetch("/api/credits/decrement", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, amount: DB_SEARCH_CREDIT_COST }),
        });
      }
    } catch (err) {
      setDbError((err as Error).message);
    } finally {
      setDbLoading(false);
    }
  };

  const handleDbPageChange = (newPage: number) => {
    if (!dbFilters) return;
    handleDatabaseSearch({ ...dbFilters, page: newPage });
  };

  const insufficientCredits = initialized && remaining < SEARCH_CREDIT_COST;
  const insufficientCreditsDb = initialized && remaining < DB_SEARCH_CREDIT_COST;

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
          Recherche ciblée par IA ou accès direct à la base SIRENE de 12M+ entreprises françaises.
        </p>
      </motion.header>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          marginBottom: "20px",
          background: "rgba(99,102,241,0.06)",
          borderRadius: "12px",
          padding: "4px",
          width: "fit-content",
        }}
      >
        {(
          [
            {
              key: "targeted" as ActiveTab,
              label: "Recherche ciblée",
              icon: (
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              key: "database" as ActiveTab,
              label: "Base de données",
              icon: (
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <ellipse cx="12" cy="6" rx="8" ry="3" />
                  <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
                  <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
                </svg>
              ),
            },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "9px",
              border: "none",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
              ...(activeTab === tab.key
                ? {
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    color: "#ffffff",
                    boxShadow: "0 2px 8px rgba(99,102,241,0.28)",
                  }
                : {
                    background: "transparent",
                    color: "#64748b",
                  }),
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── TARGETED SEARCH TAB ── */}
        {activeTab === "targeted" && (
          <motion.div
            key="targeted"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Stats strip */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "18px", flexWrap: "wrap" }}>
              {[
                { value: "12M+", label: "entreprises indexées" },
                { value: "95", label: "départements couverts" },
                { value: "Score IA", label: "par résultat" },
                { live: true, label: "Données INSEE temps réel" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", alignItems: "center", gap: "7px",
                    background: "rgba(255,255,255,0.65)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(99,102,241,0.10)",
                    borderRadius: "10px",
                    padding: "7px 13px",
                    flex: "1 0 auto",
                  }}
                >
                  {s.live ? (
                    <span className="sa-live-dot" />
                  ) : (
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "#4f46e5", lineHeight: 1, letterSpacing: "-0.02em" }}>
                      {s.value}
                    </span>
                  )}
                  <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 500, whiteSpace: "nowrap" }}>{s.label}</span>
                </div>
              ))}
            </div>

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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <GhostProspectCards />
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
          </motion.div>
        )}

        {/* ── DATABASE TAB ── */}
        {activeTab === "database" && (
          <motion.div
            key="database"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {insufficientCreditsDb ? (
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

            {dbError ? (
              <div
                className="mb-5 rounded-xl px-4 py-3 text-sm"
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.22)',
                  color: '#dc2626',
                }}
              >
                {dbError}
              </div>
            ) : null}

            <div className="grid gap-6 lg:grid-cols-[320px_1fr] items-start">
              {/* Filters sidebar */}
              <DatabaseSearchForm
                onSearch={handleDatabaseSearch}
                isLoading={dbLoading}
                totalResults={dbData?.total}
              />

              {/* Results */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.78)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(99,102,241,0.10)',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>
                    Entreprises SIRENE
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#22c55e",
                        boxShadow: "0 0 0 2px rgba(34,197,94,0.20)",
                      }}
                    />
                    <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>
                      Base INSEE · temps réel
                    </span>
                  </div>
                </div>

                <DatabaseResultsTable
                  results={dbData?.results ?? []}
                  total={dbData?.total ?? 0}
                  page={dbData?.page ?? 1}
                  perPage={dbData?.per_page ?? 25}
                  isLoading={dbLoading}
                  hasSearched={dbHasSearched}
                  filters={dbFilters}
                  onPageChange={handleDbPageChange}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
