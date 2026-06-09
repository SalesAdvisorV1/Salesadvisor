"use client";

// ─────────────────────────────────────────────────────────────────
//  COCKPIT STATS — 4 indicateurs en haut de page
//  Tous les chiffres sont à 0 + badge "Activation prochaine"
//  À brancher quand backend prêt
// ─────────────────────────────────────────────────────────────────

interface Stat {
  label: string;
  value: string;
  unit?: string;
  icon: string;
  trend?: string;
  color: string;
}

const STATS: Stat[] = [
  { label: "Recherches aujourd'hui", value: "0", icon: "🔍", color: "#6366f1" },
  { label: "Prospects identifiés", value: "0", icon: "🎯", color: "#8b5cf6" },
  { label: "Score IA moyen", value: "—", unit: "/100", icon: "⚡", color: "#10b981" },
  { label: "Crédits restants", value: "—", icon: "💎", color: "#f59e0b" },
];

export function CockpitStats() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12,
      marginBottom: 16,
    }}>
      {STATS.map((s, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(99,102,241,0.10)",
          borderRadius: 14,
          padding: "14px 16px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(99,102,241,0.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 2px rgba(15,23,42,0.04)"; }}
        >
          {/* Accent gradient strip */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, ${s.color}, ${s.color}33)`,
          }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: `${s.color}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14,
            }}>{s.icon}</div>
            <span style={{
              fontSize: 8, fontWeight: 800, letterSpacing: 0.8,
              padding: "2px 6px", borderRadius: 4,
              background: "rgba(99,102,241,0.08)",
              color: "#6366f1",
              textTransform: "uppercase",
            }}>
              Soon
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
            <span style={{
              fontSize: 24, fontWeight: 800, color: "#0a0a0a",
              letterSpacing: "-0.5px", lineHeight: 1,
            }}>{s.value}</span>
            {s.unit && (
              <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>{s.unit}</span>
            )}
          </div>
          <p style={{
            fontSize: 11, color: "#6b6b6b", margin: 0,
            fontWeight: 500, letterSpacing: "-0.1px",
          }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CockpitStats;
