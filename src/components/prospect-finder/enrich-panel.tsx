"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProspectResult } from "@/types/prospect";
import type { EnrichmentResult, EnrichStreamEvent } from "@/types/enrich";

interface EnrichPanelProps {
  prospect: ProspectResult;
  onClose: () => void;
  userId?: string | null;
  onCreditsConsumed?: (amount: number) => void;
}

type StepStatus = "pending" | "loading" | "done";
interface Step { id: number; label: string; status: StepStatus }

const INITIAL_STEPS: Step[] = [
  { id: 1, label: "Analyse du site web…", status: "pending" },
  { id: 2, label: "Extraction des informations…", status: "pending" },
  { id: 3, label: "Calcul du score IA…", status: "pending" },
  { id: 4, label: "Détection des décideurs…", status: "pending" },
  { id: 5, label: "Rédaction de l'email…", status: "pending" },
];

export function EnrichPanel({ prospect, onClose, userId, onCreditsConsumed }: EnrichPanelProps) {
  const [urlInput, setUrlInput] = useState(prospect.website ?? "");
  const [phase, setPhase] = useState<"input" | "running" | "done" | "error">("input");
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [result, setResult] = useState<EnrichmentResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleStart() {
    setPhase("running");
    setSteps(INITIAL_STEPS.map((s) => ({ ...s })));
    setResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: prospect.name,
          sector: prospect.sector,
          city: prospect.city,
          website: urlInput,
        }),
      });

      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const evt = JSON.parse(line) as EnrichStreamEvent;
            if (evt.event === "step") {
              setSteps((prev) =>
                prev.map((s) =>
                  s.id === evt.step ? { ...s, status: evt.status, label: evt.label } : s
                )
              );
            } else if (evt.event === "result") {
              setResult(evt.data);
              setPhase("done");
              if (userId) {
                fetch("/api/credits/decrement", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ userId, amount: 5 }),
                }).catch(() => {});
                onCreditsConsumed?.(5);
              }
            } else if (evt.event === "error") {
              setErrorMsg(evt.message);
              setPhase("error");
            }
          } catch { /* partial JSON, skip */ }
        }
      }
    } catch {
      setErrorMsg("Connexion interrompue. Réessaie.");
      setPhase("error");
    }
  }

  function handleCopyEmail() {
    if (!result) return;
    const text = `Objet : ${result.email_draft.subject}\n\n${result.email_draft.body}\n\n${result.email_draft.cta}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleRetry() {
    setPhase("input");
    setSteps(INITIAL_STEPS.map((s) => ({ ...s })));
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          background: "rgba(15,23,42,0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      {/* Panel */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 300 }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 51,
          width: "100%",
          maxWidth: "540px",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(99,102,241,0.15)",
          boxShadow: "-8px 0 40px rgba(15,23,42,0.12)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            padding: "20px 24px 16px",
            borderBottom: "1px solid rgba(99,102,241,0.08)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  boxShadow: "0 3px 10px rgba(99,102,241,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                  <path d="M12 2l2.4 7.4H22l-6.5 4.7 2.5 7.6L12 17.2l-6 4.5 2.5-7.6L2 9.4h7.6L12 2z" fill="white" opacity={0.9} />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.012em", lineHeight: 1.2 }}>
                  Enrichissement IA
                </p>
                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                  {prospect.name}
                  {prospect.sector ? ` · ${prospect.sector}` : ""}
                  {prospect.city ? ` · ${prospect.city}` : ""}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: "9999px",
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.14)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                transition: "all 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget;
                t.style.background = "rgba(99,102,241,0.14)";
                t.style.color = "#4f46e5";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget;
                t.style.background = "rgba(99,102,241,0.06)";
                t.style.color = "#64748b";
              }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Credits notice */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", fontSize: "11px", color: "#94a3b8" }}>
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            5 crédits · Scoring · Décideurs · Email personnalisé
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>

          {/* URL Input phase */}
          {phase === "input" && (
            <div>
              <label style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "8px",
              }}>
                URL du site web
              </label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://www.entreprise.fr"
                onKeyDown={(e) => { if (e.key === "Enter") handleStart(); }}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(99,102,241,0.18)",
                  background: "rgba(255,255,255,0.80)",
                  fontSize: "14px",
                  color: "#0f172a",
                  outline: "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  display: "block",
                  marginBottom: "6px",
                }}
              />
              <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "16px" }}>
                Optionnel — laisse vide pour enrichir depuis le nom uniquement.
              </p>

              <button
                type="button"
                onClick={handleStart}
                className="btn-shimmer"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  letterSpacing: "-0.01em",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(99,102,241,0.42)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(99,102,241,0.35)";
                }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                Lancer l'enrichissement IA
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}

          {/* Steps */}
          {(phase === "running" || phase === "done") && (
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {steps.map((step) => (
                  <motion.div
                    key={step.id}
                    animate={{ opacity: step.status === "pending" ? 0.4 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background:
                        step.status === "done"
                          ? "rgba(99,102,241,0.06)"
                          : step.status === "loading"
                          ? "rgba(99,102,241,0.03)"
                          : "transparent",
                      border:
                        step.status === "done"
                          ? "1px solid rgba(99,102,241,0.14)"
                          : "1px solid transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* Icon */}
                    <div style={{ flexShrink: 0, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {step.status === "done" ? (
                        <div style={{
                          width: 24, height: 24, borderRadius: "50%",
                          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.8}>
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      ) : step.status === "loading" ? (
                        <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="rgba(99,102,241,0.18)" strokeWidth="2.5" />
                          <path d="M21 12a9 9 0 0 0-9-9" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <div style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid rgba(99,102,241,0.15)" }} />
                      )}
                    </div>

                    <span style={{
                      fontSize: "13px",
                      fontWeight: step.status === "loading" ? 600 : 500,
                      color:
                        step.status === "done"
                          ? "#4f46e5"
                          : step.status === "loading"
                          ? "#0f172a"
                          : "#94a3b8",
                    }}>
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {phase === "error" && (
            <div style={{
              padding: "14px 16px",
              borderRadius: "12px",
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.20)",
              marginBottom: "16px",
            }}>
              <p style={{ fontSize: "13px", color: "#dc2626", fontWeight: 500 }}>{errorMsg}</p>
              <button
                type="button"
                onClick={handleRetry}
                style={{ marginTop: "8px", fontSize: "12px", color: "#6366f1", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                ← Réessayer
              </button>
            </div>
          )}

          {/* Results */}
          <AnimatePresence>
            {result && phase === "done" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                {/* Score card */}
                <div style={{
                  padding: "16px",
                  borderRadius: "14px",
                  background: "rgba(99,102,241,0.04)",
                  border: "1px solid rgba(99,102,241,0.12)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <ScoreRingLarge score={result.score} />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: "6px" }}>
                        Score de potentiel commercial
                      </p>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {(result.score_reasons ?? []).map((r, i) => (
                          <li key={i} style={{ fontSize: "12px", color: "#475569", display: "flex", alignItems: "flex-start", gap: "6px" }}>
                            <span style={{ color: "#6366f1", flexShrink: 0, fontWeight: 700, marginTop: "1px" }}>·</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(99,102,241,0.10)",
                }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: "8px" }}>
                    Résumé entreprise
                  </p>
                  <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#374151" }}>{result.description}</p>
                  {result.size_estimate && (
                    <span style={{
                      display: "inline-block",
                      marginTop: "10px",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      background: "rgba(99,102,241,0.08)",
                      border: "1px solid rgba(99,102,241,0.14)",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#4f46e5",
                    }}>
                      {result.size_estimate}
                    </span>
                  )}
                </div>

                {/* Decision makers */}
                {(result.decision_makers ?? []).length > 0 && (
                  <div style={{
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(99,102,241,0.10)",
                  }}>
                    <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: "10px" }}>
                      Décideurs identifiés
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {result.decision_makers.map((dm, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: "10px", flexShrink: 0,
                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "white", fontSize: "11px", fontWeight: 700,
                            boxShadow: "0 2px 8px rgba(99,102,241,0.28)",
                          }}>
                            {dm.name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("")}
                          </div>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", lineHeight: 1.2, marginBottom: "3px" }}>
                              {dm.name}
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                              <p style={{ fontSize: "11px", color: "#64748b" }}>{dm.title}</p>
                              <span style={{
                                padding: "1px 6px",
                                borderRadius: "5px",
                                fontSize: "10px",
                                fontWeight: 600,
                                background: dm.confidence === "found" ? "rgba(16,185,129,0.10)" : "rgba(99,102,241,0.08)",
                                color: dm.confidence === "found" ? "#059669" : "#4f46e5",
                                border: `1px solid ${dm.confidence === "found" ? "rgba(16,185,129,0.20)" : "rgba(99,102,241,0.16)"}`,
                              }}>
                                {dm.confidence === "found" ? "● Trouvé" : "◆ Inféré"}
                              </span>
                            </div>
                          </div>
                          {dm.linkedin && (
                            <a
                              href={`https://${dm.linkedin.replace(/^https?:\/\//, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ flexShrink: 0, color: "#6366f1", opacity: 0.8, transition: "opacity 0.15s" }}
                              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.8")}
                            >
                              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Email */}
                <div style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(99,102,241,0.10)",
                }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: "10px" }}>
                    Email de prospection
                  </p>

                  {/* Subject */}
                  <div style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "rgba(99,102,241,0.05)",
                    border: "1px solid rgba(99,102,241,0.10)",
                    marginBottom: "10px",
                  }}>
                    <p style={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>Objet</p>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{result.email_draft.subject}</p>
                  </div>

                  {/* Body */}
                  <pre style={{
                    fontSize: "12.5px",
                    lineHeight: 1.65,
                    color: "#374151",
                    whiteSpace: "pre-wrap",
                    fontFamily: "inherit",
                    margin: "0 0 8px",
                    maxHeight: "150px",
                    overflowY: "auto",
                  }}>
                    {result.email_draft.body}
                  </pre>

                  {/* CTA line */}
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#4f46e5", marginBottom: "12px" }}>
                    {result.email_draft.cta}
                  </p>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    style={{
                      width: "100%",
                      padding: "9px 14px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 500,
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      ...(copied
                        ? { background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.20)", color: "#15803d" }
                        : { background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.18)", color: "#4f46e5" }),
                    }}
                  >
                    {copied ? (
                      <>
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" />
                        </svg>
                        Copié dans le presse-papiers
                      </>
                    ) : (
                      <>
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        Copier l'email
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}

// ── Score ring for results ──

function ScoreRingLarge({ score }: { score: number }) {
  const s = Math.min(100, Math.max(0, score));
  const color = s >= 85 ? "#10b981" : s >= 70 ? "#f59e0b" : "#ef4444";
  const label = s >= 85 ? "Excellent" : s >= 70 ? "Bon" : "Moyen";
  const radius = 28;
  const stroke = 4;
  const norm = radius - stroke / 2;
  const circ = norm * 2 * Math.PI;
  const offset = circ - (s / 100) * circ;

  return (
    <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={72} height={72} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx={36} cy={36} r={norm} fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth={stroke} />
        <circle cx={36} cy={36} r={norm} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      </svg>
      <div style={{ position: "relative", textAlign: "center", lineHeight: 1 }}>
        <div style={{ fontSize: "20px", fontWeight: 800, color, letterSpacing: "-0.02em" }}>{s}</div>
        <div style={{ fontSize: "9px", fontWeight: 600, color, opacity: 0.75, textTransform: "uppercase", letterSpacing: "0.04em", marginTop: "2px" }}>{label}</div>
      </div>
    </div>
  );
}
