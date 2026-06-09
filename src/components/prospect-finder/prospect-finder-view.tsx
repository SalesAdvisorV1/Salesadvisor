"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProspectionMap } from "@/components/prospect-finder/prospection-map";
import { ProspectResultCard } from "@/components/prospect-finder/prospect-result-card";
import { ProspectSearchForm } from "@/components/prospect-finder/prospect-search-form";
import { EnrichPanel } from "@/components/prospect-finder/enrich-panel";
import { DatabaseSearchForm } from "@/components/prospect-finder/database-search-form";
import { DatabaseResultsTable } from "@/components/prospect-finder/database-results-table";
import { AdvancedFiltersPanel } from "@/components/prospect-finder/advanced-filters-panel";
import { CockpitStats } from "@/components/prospect-finder/cockpit/cockpit-stats";
import { CockpitInsights } from "@/components/prospect-finder/cockpit/cockpit-insights";
import { CockpitMarket } from "@/components/prospect-finder/cockpit/cockpit-market";
import { QuickSearchesBar } from "@/components/prospect-finder/cockpit/quick-searches-bar";
import type { ProspectSearchFormValues } from "@/lib/schemas/prospect-search";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { ProspectResult, ProspectSearchResponse } from "@/types/prospect";
import type { DatabaseSearchFilters, DatabaseSearchResponse } from "@/types/database-prospect";
import { createClient } from "@/lib/supabase/client";

const SEARCH_CREDIT_COST = 2;
const DB_SEARCH_CREDIT_COST = 1;

const GLASS_CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.78)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(99,102,241,0.10)",
  borderRadius: "16px",
  boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
};

// ── Ghost preview cards (empty state) ────────────────────────────
function GhostProspectCards() {
  const ghosts = [
    { nameW: "54%", reasonH: 38 },
    { nameW: "43%", reasonH: 0 },
    { nameW: "61%", reasonH: 34 },
  ];
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ filter: "blur(2px)", opacity: 0.28, pointerEvents: "none", userSelect: "none" }}>
        {ghosts.map((g, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: "16px", padding: "16px", marginBottom: i < 2 ? "12px" : 0 }}>
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
                  {[76, 58, 90].map((w, j) => <div key={j} style={{ height: 24, width: w, borderRadius: 6, background: "rgba(99,102,241,0.09)" }} />)}
                </div>
              </div>
            </div>
            {g.reasonH > 0 && <div style={{ height: g.reasonH, borderRadius: 8, background: "rgba(99,102,241,0.04)", marginTop: 12 }} />}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(99,102,241,0.08)" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {[0, 1, 2].map(j => <div key={j} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(99,102,241,0.08)" }} />)}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ height: 28, width: 68, borderRadius: 999, background: "rgba(139,92,246,0.10)" }} />
                <div style={{ height: 28, width: 76, borderRadius: 999, background: "rgba(99,102,241,0.08)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "52%", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.97))", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: "10px" }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4f46e5", marginBottom: 14, boxShadow: "0 4px 16px rgba(99,102,241,0.12)" }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
        </div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 6, letterSpacing: "-0.015em" }}>Vos prospects B2B qualifiés</p>
        <p style={{ fontSize: 12, color: "#64748b", maxWidth: 230, textAlign: "center", lineHeight: 1.55 }}>Score IA · Décideurs identifiés · Email prêt à envoyer</p>
      </div>
    </div>
  );
}

// ── Radar overlay (over map during scan) ─────────────────────────
function RadarOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden", pointerEvents: "none", zIndex: 5 }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,18,40,0.62)", backdropFilter: "blur(1px)" }} />

      {/* Conic sweep */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 260, height: 260,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        background: "conic-gradient(from 0deg, transparent 0deg, rgba(99,102,241,0.45) 45deg, transparent 90deg, transparent 360deg)",
        animation: "sa-radar-sweep 2.4s linear infinite",
      }} />

      {/* Concentric rings */}
      {[50, 90, 130].map((r, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r,
          borderRadius: "50%",
          border: `1px solid rgba(99,102,241,${0.35 - i * 0.08})`,
        }} />
      ))}

      {/* Center + ping rings */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 10, height: 10, borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 14px 6px rgba(99,102,241,0.55)" }} />
      {[1, 2].map(i => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: 10, height: 10,
          border: "2px solid rgba(99,102,241,0.7)",
          borderRadius: "50%",
          animation: `sa-radar-ping 2s ${i * 0.9}s ease-out infinite`,
        }} />
      ))}

      {/* Bottom label */}
      <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
        <span className="sa-live-dot" style={{ width: 6, height: 6 }} />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.92)", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase" }}>
          Scan en cours
        </span>
      </div>
    </div>
  );
}

// ── Live scan loader (replaces skeleton during search) ────────────
function LiveScanLoader({ sector, city }: { sector: string; city: string }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1200);
    const t3 = setTimeout(() => setStep(3), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const steps = [
    `Géolocalisation · ${city || "France"}`,
    `Filtrage secteur · ${sector || "tous"}`,
    "Scoring IA des prospects",
    "Classement & enrichissement",
  ];

  return (
    <div>
      {/* Scan header */}
      <div style={{ background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.14)", borderRadius: "12px", padding: "14px 16px", marginBottom: "18px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Analyse IA en cours</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
            {sector && city ? `${sector} · ${city}` : sector || city || "Recherche générale"}
          </div>
        </div>
        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgba(99,102,241,0.2)" strokeWidth="3" />
          <path d="M22 12a10 10 0 0 0-10-10" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        {steps.map((label, i) => {
          const isDone = step > i;
          const isActive = step === i;
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {isDone ? (
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              ) : isActive ? (
                <div style={{ width: 22, height: 22, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(99,102,241,0.2)" strokeWidth="3" />
                    <path d="M22 12a10 10 0 0 0-10-10" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              ) : (
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: "1.5px solid rgba(99,102,241,0.20)", flexShrink: 0 }} />
              )}
              <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isDone ? "#0f172a" : isActive ? "#4f46e5" : "#94a3b8" }}>{label}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Ghost skeletons */}
      {[0, 1].map(i => (
        <div key={i} style={{ height: 72, borderRadius: 12, marginBottom: 10, background: "linear-gradient(90deg, rgba(99,102,241,0.05) 0%, rgba(139,92,246,0.09) 50%, rgba(99,102,241,0.05) 100%)", backgroundSize: "200% 100%", animation: `shimmer 1.5s ${i * 0.3}s infinite` }} />
      ))}
    </div>
  );
}

// ── Animated result count ─────────────────────────────────────────
function AnimatedCount({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const duration = 700;
    const startTime = performance.now();
    function update(now: number) {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) rafRef.current = requestAnimationFrame(update);
    }
    rafRef.current = requestAnimationFrame(update);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);
  return <>{display}</>;
}

// ── API calls ─────────────────────────────────────────────────────
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
    await fetch("/api/credits/decrement", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, amount: 2 }) });
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

type ActiveTab = "targeted" | "database";

// ── Main view ─────────────────────────────────────────────────────
export function ProspectFinderView() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("targeted");
  const [lastFilters, setLastFilters] = useState<ProspectSearchFormValues | null>(null);
  const [currentSearch, setCurrentSearch] = useState<{ sector: string; city: string }>({ sector: "", city: "" });
  const [userId, setUserId] = useState<string | null>(null);
  const [enrichTarget, setEnrichTarget] = useState<ProspectResult | null>(null);

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

  const mutation = useMutation({
    mutationFn: (filters: ProspectSearchFormValues) => runProspectSearch(filters, userId),
    onSuccess: (_data, variables) => { setLastFilters(variables); consume(SEARCH_CREDIT_COST); },
  });

  const handleSearch = (values: ProspectSearchFormValues) => {
    if (initialized && remaining < SEARCH_CREDIT_COST) { mutation.reset(); return; }
    setCurrentSearch({ sector: values.sector || "", city: values.city || "" });
    mutation.mutate(values);
  };

  const handleDatabaseSearch = async (filters: DatabaseSearchFilters) => {
    if (initialized && remaining < DB_SEARCH_CREDIT_COST) { setDbError("Crédits insuffisants pour lancer une recherche."); return; }
    setDbLoading(true); setDbError(null); setDbFilters(filters); setDbHasSearched(true);
    try {
      const data = await runDatabaseSearch(filters);
      setDbData(data); consume(DB_SEARCH_CREDIT_COST);
      if (userId) await fetch("/api/credits/decrement", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, amount: DB_SEARCH_CREDIT_COST }) });
    } catch (err) { setDbError((err as Error).message); }
    finally { setDbLoading(false); }
  };

  const handleDbPageChange = (newPage: number) => { if (dbFilters) handleDatabaseSearch({ ...dbFilters, page: newPage }); };

  const insufficientCredits = initialized && remaining < SEARCH_CREDIT_COST;
  const insufficientCreditsDb = initialized && remaining < DB_SEARCH_CREDIT_COST;

  return (
    <>
    <div className="mx-auto w-full max-w-[1900px] px-4 lg:px-8 xl:px-10 2xl:px-12">
      {/* ── Header ── */}
      <motion.header className="mb-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 className="text-[28px] md:text-[32px] leading-tight" style={{ color: "#0f172a", fontWeight: 700, letterSpacing: "-0.028em" }}>
              Smart Prospect Finder
            </h1>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: "#64748b" }}>
              Cockpit IA B2B · Recherche ciblée ou accès aux 12M+ entreprises SIRENE
            </p>
          </div>

          {/* Live mission status badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 14px", borderRadius: "999px", background: mutation.isPending ? "rgba(99,102,241,0.10)" : lastFilters ? "rgba(34,197,94,0.08)" : "rgba(15,23,42,0.04)", border: mutation.isPending ? "1px solid rgba(99,102,241,0.25)" : lastFilters ? "1px solid rgba(34,197,94,0.20)" : "1px solid rgba(15,23,42,0.08)", transition: "all 0.3s ease" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: mutation.isPending ? "#6366f1" : lastFilters ? "#22c55e" : "#94a3b8", display: "inline-block", animation: mutation.isPending ? "sa-live-pulse 1.2s infinite" : "none" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: mutation.isPending ? "#4f46e5" : lastFilters ? "#16a34a" : "#64748b" }}>
              {mutation.isPending ? "SCAN EN COURS" : lastFilters ? `Mission complète · ${mutation.data?.total ?? 0} prospects` : "EN ATTENTE"}
            </span>
          </div>
        </div>
      </motion.header>

      {/* ── Tabs + Filtres avancés ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "4px", background: "rgba(99,102,241,0.06)", borderRadius: "12px", padding: "4px", width: "fit-content" }}>
        {([
          { key: "targeted" as ActiveTab, label: "Recherche ciblée", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" /></svg> },
          { key: "database" as ActiveTab, label: "Base de données", icon: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" /><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg> },
        ] as const).map((tab) => (
          <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "9px", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.15s ease", ...(activeTab === tab.key ? { background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", color: "#ffffff", boxShadow: "0 2px 8px rgba(99,102,241,0.28)" } : { background: "transparent", color: "#64748b" }) }}>
            {tab.icon}{tab.label}
          </button>
        ))}
        </div>
        <AdvancedFiltersPanel />
      </div>

      <CockpitStats />

      <QuickSearchesBar />

      <AnimatePresence mode="wait">
        {/* ══ TARGETED TAB ══ */}
        {activeTab === "targeted" && (
          <motion.div key="targeted" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

            {/* Stats strip */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
              {[
                { value: "12M+", label: "entreprises indexées" },
                { value: "95", label: "départements couverts" },
                { value: "Score IA", label: "par résultat" },
                { live: true, label: "Données INSEE temps réel" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(99,102,241,0.10)", borderRadius: "10px", padding: "6px 12px", flex: "1 0 auto" }}>
                  {s.live ? <span className="sa-live-dot" /> : <span style={{ fontSize: "13px", fontWeight: 800, color: "#4f46e5", lineHeight: 1, letterSpacing: "-0.02em" }}>{s.value}</span>}
                  <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 500, whiteSpace: "nowrap" }}>{s.label}</span>
                </div>
              ))}
            </div>

            {insufficientCredits && (
              <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)", color: "#b45309" }}>
                Crédits insuffisants ({remaining} restants). Recharge ton compte pour lancer une recherche.
              </div>
            )}
            {mutation.isError && (
              <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", color: "#dc2626" }}>
                {(mutation.error as Error).message}
              </div>
            )}

            {/* ══ 3-COLUMN COCKPIT GRID ══ */}
            <div className="grid gap-4 items-start lg:grid-cols-[300px_1fr] xl:grid-cols-[280px_1fr_1fr]">

              {/* COL 1: Form — spans 2 rows on lg, 1 on xl */}
              <div className="lg:row-span-2 xl:row-span-1">
                <ProspectSearchForm onSubmit={handleSearch} isLoading={mutation.isPending} />
              </div>

              {/* COL 2: Map + radar */}
              <div className="xl:sticky" style={{ top: "82px" }}>
                <div style={{ ...GLASS_CARD, padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <h2 style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Zone de prospection</h2>
                    {mutation.isPending && (
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "#6366f1", display: "flex", alignItems: "center", gap: "5px" }}>
                        <span className="sa-live-dot" style={{ width: 6, height: 6 }} /> Radar actif
                      </span>
                    )}
                  </div>
                  <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", height: "500px", border: "1px solid rgba(99,102,241,0.12)" }}>
                    <ProspectionMap filters={lastFilters} prospects={mutation.data?.prospects ?? []} />

                    <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 9999, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 8px rgba(15,23,42,0.08)" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px rgba(16,185,129,0.6)", animation: "sa-live-pulse 1.5s infinite" }} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.1px" }}>12M+ entreprises visibles</span>
                    </div>

                    <div style={{ position: "absolute", bottom: 12, left: 12, zIndex: 10, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 10, padding: "8px 12px", display: "flex", gap: 14, boxShadow: "0 2px 8px rgba(15,23,42,0.08)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1" }} />
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#64748b" }}>Prospect</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#64748b" }}>Score élevé</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#64748b" }}>À enrichir</span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {mutation.isPending && (
                        <motion.div key="radar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "absolute", inset: 0 }}>
                          <RadarOverlay />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* COL 3: Results feed */}
              <div className="xl:col-start-3">
                <div style={{ ...GLASS_CARD, padding: "16px" }}>
                  {/* Results header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <h2 style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>Intelligence prospects</h2>
                    <AnimatePresence mode="wait">
                      {mutation.data && (
                        <motion.span key="count" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="tabular-nums"
                          style={{ fontSize: "11px", fontWeight: 700, background: "linear-gradient(135deg,rgba(99,102,241,0.12) 0%,rgba(139,92,246,0.12) 100%)", color: "#4f46e5", padding: "3px 10px", borderRadius: "999px", border: "1px solid rgba(99,102,241,0.18)" }}>
                          <AnimatedCount value={mutation.data.total} /> trouvé{mutation.data.total !== 1 ? "s" : ""}
                        </motion.span>
                      )}
                      {mutation.isPending && (
                        <motion.span key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          style={{ fontSize: "11px", fontWeight: 600, color: "#6366f1", display: "flex", alignItems: "center", gap: "5px" }}>
                          <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(99,102,241,0.2)" strokeWidth="3" /><path d="M22 12a10 10 0 0 0-10-10" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" /></svg>
                          Analyse…
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Results content */}
                  <AnimatePresence mode="wait">
                    {mutation.isPending ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <LiveScanLoader sector={currentSearch.sector} city={currentSearch.city} />
                      </motion.div>
                    ) : !mutation.data ? (
                      <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <GhostProspectCards />
                      </motion.div>
                    ) : mutation.data.prospects.length === 0 ? (
                      <motion.div key="no-results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-14 text-center">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.22)", color: "#b45309" }}>
                          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35M8 11h6" strokeLinecap="round" /></svg>
                        </div>
                        <p className="text-sm max-w-xs leading-relaxed" style={{ color: "#64748b" }}>Aucun résultat. Essayez d'élargir votre rayon ou de modifier le secteur.</p>
                      </motion.div>
                    ) : (
                      <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        {mutation.data.prospects.map((prospect, i) => (
                          <motion.div key={prospect.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                            <ProspectResultCard prospect={prospect} onEnrich={() => setEnrichTarget(prospect)} />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {lastFilters && mutation.data && (
                    <p className="mt-3 text-xs" style={{ color: "#94a3b8" }}>
                      Mission : {lastFilters.sector} · {lastFilters.city} · {lastFilters.radius}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══ DATABASE TAB ══ */}
        {activeTab === "database" && (
          <motion.div key="database" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {insufficientCreditsDb && (
              <div className="mb-5 rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)", color: "#b45309" }}>
                Crédits insuffisants ({remaining} restants). Recharge ton compte pour lancer une recherche.
              </div>
            )}
            {dbError && (
              <div className="mb-5 rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", color: "#dc2626" }}>
                {dbError}
              </div>
            )}

            <div className="grid gap-5 lg:grid-cols-[320px_1fr] items-start">
              <DatabaseSearchForm onSearch={handleDatabaseSearch} isLoading={dbLoading} totalResults={dbData?.total} />
              <div style={{ ...GLASS_CARD, padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>Entreprises SIRENE</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span className="sa-live-dot" />
                    <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Base INSEE · temps réel</span>
                  </div>
                </div>
                <DatabaseResultsTable results={dbData?.results ?? []} total={dbData?.total ?? 0} page={dbData?.page ?? 1} perPage={dbData?.per_page ?? 25} isLoading={dbLoading} hasSearched={dbHasSearched} filters={dbFilters} onPageChange={handleDbPageChange} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {enrichTarget && (
          <EnrichPanel prospect={enrichTarget} onClose={() => setEnrichTarget(null)} userId={userId} onCreditsConsumed={consume} />
        )}
      </AnimatePresence>

      {/* ── Cockpit Intelligence (Insights + Market) ── */}
      <div style={{ marginTop: 20, marginBottom: 16 }}>
        <p style={{ color: "#6366f1", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>
          Cockpit Intelligence · Augmentation IA
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <CockpitInsights />
          <CockpitMarket />
        </div>
      </div>
    </div>
  </>
  );
}
