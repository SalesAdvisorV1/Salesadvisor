"use client";

import { useState, useEffect } from "react";
import type {
  AiAssistResponse,
  AiSummaryResult,
  AiPitchResult,
  AiCallPrepResult,
} from "@/types/ai-assistant";

const glassCard: React.CSSProperties = {
  borderRadius: "12px",
  border: "1px solid rgba(99,102,241,0.10)",
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  padding: "16px",
};

const gradientCard: React.CSSProperties = {
  borderRadius: "12px",
  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  padding: "16px",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#64748b",
};

export function AiResultCard({ response }: { response: AiAssistResponse }) {
  switch (response.task) {
    case "summary":
      return <SummaryResult result={response.result as AiSummaryResult} />;
    case "pitch":
      return <PitchResult result={response.result as AiPitchResult} />;
    case "call-prep":
      return <CallPrepResult result={response.result as AiCallPrepResult} />;
  }
}

function TypewriterText({ text, speed = 25 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
}

function SummaryResult({ result }: { result: AiSummaryResult }) {
  return (
    <div className="space-y-4">
      <div style={glassCard}>
        <h4 className="font-bold" style={{ color: "#0f172a" }}>
          <TypewriterText text={result.headline} />
        </h4>
        <p className="mt-2 text-sm leading-6" style={{ color: "#475569" }}>{result.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(22,163,74,0.05)",
            border: "1px solid rgba(22,163,74,0.15)",
            padding: "16px",
          }}
        >
          <div className="flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2.5} className="shrink-0">
              <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm font-semibold" style={{ color: "#15803d" }}>Points forts</p>
          </div>
          <ul className="mt-2 space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start text-sm" style={{ color: "#374151" }}>
                <span className="mr-2 shrink-0 font-medium" style={{ color: "#16a34a" }}>✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            borderRadius: "12px",
            background: "rgba(99,102,241,0.05)",
            border: "1px solid rgba(99,102,241,0.14)",
            padding: "16px",
          }}
        >
          <div className="flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth={2.5} className="shrink-0">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm font-semibold" style={{ color: "#4f46e5" }}>Opportunités</p>
          </div>
          <ul className="mt-2 space-y-2">
            {result.opportunities.map((o, i) => (
              <li key={i} className="flex items-start text-sm" style={{ color: "#374151" }}>
                <span className="mr-2 shrink-0 font-medium" style={{ color: "#6366f1" }}>→</span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PitchResult({ result }: { result: AiPitchResult }) {
  return (
    <div className="space-y-4">
      <div style={glassCard}>
        <p style={sectionLabel}>Objet</p>
        <p className="mt-1 font-medium" style={{ color: "#0f172a" }}>{result.subject}</p>
      </div>

      <div style={glassCard}>
        <p style={sectionLabel}>Corps du message</p>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-7" style={{ color: "#475569" }}>
          {result.body}
        </pre>
      </div>

      <div style={gradientCard}>
        <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.65)" }}>
          Call-to-action
        </p>
        <p className="mt-1 font-semibold" style={{ color: "#ffffff" }}>{result.cta}</p>
      </div>

      <CopyButton text={`Objet : ${result.subject}\n\n${result.body}\n\n${result.cta}`} />
    </div>
  );
}

function CallPrepResult({ result }: { result: AiCallPrepResult }) {
  return (
    <div className="space-y-4">
      <div
        style={{
          borderRadius: "12px",
          background: "rgba(245,158,11,0.06)",
          border: "1px solid rgba(245,158,11,0.20)",
          padding: "16px",
        }}
      >
        <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#b45309" }}>
          Accroche d'ouverture
        </p>
        <p className="mt-2 text-sm leading-6" style={{ color: "#374151" }}>{result.openingLine}</p>
      </div>

      <div style={glassCard}>
        <p style={sectionLabel}>Points clés</p>
        <ul className="mt-3 space-y-2">
          {result.keyPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
              <span
                style={{
                  flexShrink: 0,
                  borderRadius: "999px",
                  background: "rgba(99,102,241,0.10)",
                  color: "#4f46e5",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "0 6px",
                  minWidth: "22px",
                  textAlign: "center",
                  lineHeight: "20px",
                }}
              >
                {i + 1}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div style={glassCard}>
        <p style={sectionLabel}>Gestion des objections</p>
        <div className="mt-3 space-y-3">
          {result.objections.map((obj, i) => (
            <div
              key={i}
              style={{
                borderRadius: "10px",
                background: "rgba(99,102,241,0.04)",
                border: "1px solid rgba(99,102,241,0.10)",
                padding: "12px",
              }}
            >
              <p className="text-sm font-medium" style={{ color: "#dc2626" }}>
                — {obj.objection}
              </p>
              <p className="mt-1 text-sm leading-6" style={{ color: "#475569" }}>
                {obj.response}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={gradientCard}>
        <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.65)" }}>
          Closing
        </p>
        <p className="mt-2 text-sm leading-6" style={{ color: "#ffffff" }}>{result.closingLine}</p>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [hover, setHover] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%",
        borderRadius: "12px",
        padding: "10px 16px",
        fontSize: "14px",
        fontWeight: 500,
        minHeight: "44px",
        transition: "all 0.2s ease",
        cursor: "pointer",
        ...(copied
          ? {
              background: "rgba(22,163,74,0.06)",
              border: "1px solid rgba(22,163,74,0.20)",
              color: "#15803d",
            }
          : {
              background: hover ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.70)",
              border: "1px solid rgba(99,102,241,0.18)",
              color: hover ? "#4f46e5" : "#64748b",
            }),
      }}
    >
      {copied ? "✓ Copié dans le presse-papiers" : "Copier le message"}
    </button>
  );
}
