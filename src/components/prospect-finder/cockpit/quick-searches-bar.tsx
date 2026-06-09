"use client";

// ─────────────────────────────────────────────────────────────────
//  QUICK SEARCHES BAR — Bandeau de démarrage rapide
//  6 preset cards premium avec icône secteur + ville
//  Au clic : dispatch event "sa-quick-search" écouté par le formulaire
// ─────────────────────────────────────────────────────────────────

const PRESETS = [
  { icon: "🏗️", sector: "BTP", city: "Paris", color: "#f59e0b" },
  { icon: "🚛", sector: "Transport", city: "Lyon", color: "#6366f1" },
  { icon: "💻", sector: "Tech", city: "Bordeaux", color: "#8b5cf6" },
  { icon: "⚕️", sector: "Santé", city: "Marseille", color: "#10b981" },
  { icon: "🍽️", sector: "Restauration", city: "Nantes", color: "#ec4899" },
  { icon: "🏭", sector: "Industrie", city: "Lille", color: "#06b6d4" },
];

export function QuickSearchesBar() {
  const handleClick = (sector: string, city: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sa-quick-search", { detail: { sector, city } }));
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 14 }}>⚡</span>
        <p style={{
          color: "#6366f1", fontSize: 10, fontWeight: 700,
          letterSpacing: 1.8, textTransform: "uppercase", margin: 0,
        }}>
          Démarrage rapide · Presets de prospection
        </p>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 10,
      }}>
        {PRESETS.map((p) => (
          <button
            key={p.sector + p.city}
            onClick={() => handleClick(p.sector, p.city)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.78)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(99,102,241,0.12)",
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
              textAlign: "left",
              boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 6px 16px ${p.color}30`;
              e.currentTarget.style.borderColor = `${p.color}80`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 2px rgba(15,23,42,0.04)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.12)";
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: `${p.color}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, flexShrink: 0,
            }}>
              {p.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                color: "#0a0a0a", fontSize: 12.5, fontWeight: 700,
                margin: 0, letterSpacing: "-0.2px",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{p.sector}</p>
              <p style={{
                color: "#94a3b8", fontSize: 10.5, margin: 0, letterSpacing: 0.1,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{p.city}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickSearchesBar;
