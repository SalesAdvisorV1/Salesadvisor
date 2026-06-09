"use client";

// ─────────────────────────────────────────────────────────────────
//  COCKPIT INSIGHTS — Panneau gauche / contextuel
//  3 sections : Suggestions IA · ICP du jour · Recherches récentes
//  Toutes vides avec badge "Activation prochaine"
// ─────────────────────────────────────────────────────────────────

interface Card {
  title: string;
  icon: string;
  subtitle: string;
  emptyText: string;
  color: string;
}

const CARDS: Card[] = [
  {
    title: "Suggestions IA",
    icon: "✨",
    subtitle: "Prospects à fort potentiel",
    emptyText: "L'IA analysera votre historique pour suggérer des prospects similaires à vos meilleurs clients.",
    color: "#6366f1",
  },
  {
    title: "ICP du jour",
    icon: "🎯",
    subtitle: "Votre client idéal en focus",
    emptyText: "Définissez votre client idéal pour recevoir une recommandation ciblée chaque jour.",
    color: "#8b5cf6",
  },
  {
    title: "Recherches récentes",
    icon: "🕘",
    subtitle: "Reprendre une recherche",
    emptyText: "Vos recherches récentes s'afficheront ici pour un accès rapide.",
    color: "#10b981",
  },
];

export function CockpitInsights() {
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
            Insights
          </p>
          <h3 style={{ color: "#0a0a0a", fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px", margin: 0 }}>
            Intelligence personnelle
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

export default CockpitInsights;
