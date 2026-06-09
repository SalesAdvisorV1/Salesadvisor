"use client";

// ─────────────────────────────────────────────────────────────────
//  COCKPIT MARKET — Panneau droite / radar marché
//  3 sections : Signaux d'achat du jour · Secteurs en croissance · News B2B
//  Toutes vides avec badge "Activation prochaine"
// ─────────────────────────────────────────────────────────────────

interface MarketCard {
  title: string;
  icon: string;
  subtitle: string;
  emptyText: string;
  color: string;
}

const CARDS: MarketCard[] = [
  {
    title: "Signaux d'achat",
    icon: "🔥",
    subtitle: "Détectés aujourd'hui",
    emptyText: "Levées de fonds, recrutements clés, ouvertures de bureaux. Les opportunités du jour s'afficheront ici.",
    color: "#ef4444",
  },
  {
    title: "Secteurs en croissance",
    icon: "📈",
    subtitle: "Top 5 sur 30 jours",
    emptyText: "Classement des secteurs B2B qui recrutent et investissent le plus actuellement.",
    color: "#f59e0b",
  },
  {
    title: "Veille B2B",
    icon: "📡",
    subtitle: "Actualités pertinentes",
    emptyText: "Actualités économiques et sectorielles susceptibles d'impacter votre prospection.",
    color: "#06b6d4",
  },
];

export function CockpitMarket() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.78)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: "1px solid rgba(99,102,241,0.10)",
      borderRadius: 16,
      padding: 18,
      boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
      display: "flex", flexDirection: "column", gap: 14,
      height: "100%",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ color: "#6366f1", fontSize: 10, fontWeight: 700, letterSpacing: 1.8, textTransform: "uppercase", margin: "0 0 4px" }}>
            Radar
          </p>
          <h3 style={{ color: "#0a0a0a", fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px", margin: 0 }}>
            Intelligence marché
          </h3>
        </div>
        <span style={{
          fontSize: 8, fontWeight: 800, letterSpacing: 0.8,
          padding: "3px 7px", borderRadius: 4,
          background: "rgba(99,102,241,0.08)",
          color: "#6366f1",
          textTransform: "uppercase",
        }}>
          Soon
        </span>
      </div>

      {CARDS.map((c, i) => (
        <div key={i} style={{
          border: "1px dashed rgba(0,0,0,0.10)",
          borderRadius: 12,
          padding: 14,
          background: "rgba(255,255,255,0.4)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{
              width: 26, height: 26, borderRadius: 7,
              background: `${c.color}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13,
            }}>{c.icon}</div>
            <div>
              <p style={{ color: "#0a0a0a", fontSize: 13, fontWeight: 700, margin: 0, letterSpacing: "-0.2px" }}>{c.title}</p>
              <p style={{ color: "#9ca3af", fontSize: 10, margin: 0, letterSpacing: 0.2 }}>{c.subtitle}</p>
            </div>
          </div>
          <p style={{ color: "#6b6b6b", fontSize: 11.5, margin: 0, lineHeight: 1.5 }}>
            {c.emptyText}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CockpitMarket;
