"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────
//  FILTRES AVANCÉS — Composant autonome
//  • Bouton trigger (à placer où on veut)
//  • Sidebar qui glisse depuis la droite
//  • 3 sections exhaustives : Entreprise / Contact / Signaux
//  • Post-it dev temporaire (fermable, état localStorage)
// ─────────────────────────────────────────────────────────────────

type Section = "company" | "contact" | "signals";

interface FilterOption { id: string; label: string; soon?: boolean }

const COMPANY_FILTERS: { title: string; options: FilterOption[] }[] = [
  {
    title: "Chiffre d'affaires",
    options: [
      { id: "ca-0-500k", label: "< 500 k€" },
      { id: "ca-500k-2m", label: "500 k€ – 2 M€" },
      { id: "ca-2m-10m", label: "2 M€ – 10 M€" },
      { id: "ca-10m-50m", label: "10 M€ – 50 M€" },
      { id: "ca-50m+", label: "> 50 M€" },
    ],
  },
  {
    title: "Effectif précis",
    options: [
      { id: "eff-1-9", label: "1 – 9" },
      { id: "eff-10-49", label: "10 – 49" },
      { id: "eff-50-249", label: "50 – 249" },
      { id: "eff-250-999", label: "250 – 999" },
      { id: "eff-1000+", label: "1000+" },
    ],
  },
  {
    title: "Ancienneté",
    options: [
      { id: "anc-0-3", label: "< 3 ans" },
      { id: "anc-3-10", label: "3 – 10 ans" },
      { id: "anc-10-20", label: "10 – 20 ans" },
      { id: "anc-20+", label: "> 20 ans" },
    ],
  },
  {
    title: "Forme juridique",
    options: [
      { id: "sas", label: "SAS / SASU" },
      { id: "sarl", label: "SARL / EURL" },
      { id: "sa", label: "SA" },
      { id: "sci", label: "SCI" },
      { id: "asso", label: "Association" },
      { id: "ei", label: "Entrepreneur individuel" },
    ],
  },
  {
    title: "Santé financière",
    options: [
      { id: "fin-growth", label: "🚀 En croissance", soon: true },
      { id: "fin-stable", label: "Stable", soon: true },
      { id: "fin-difficulty", label: "⚠️ En difficulté", soon: true },
    ],
  },
  {
    title: "Structure",
    options: [
      { id: "struct-mono", label: "Mono-établissement" },
      { id: "struct-multi", label: "Multi-établissements" },
      { id: "struct-group", label: "Tête de groupe" },
      { id: "struct-international", label: "Présence à l'international", soon: true },
    ],
  },
];

const CONTACT_FILTERS: { title: string; options: FilterOption[] }[] = [
  {
    title: "Niveau de séniorité",
    options: [
      { id: "sen-clevel", label: "C-Level (CEO, CFO...)" },
      { id: "sen-vp", label: "VP / Directeur" },
      { id: "sen-manager", label: "Manager" },
      { id: "sen-senior", label: "Senior" },
      { id: "sen-junior", label: "Junior / Opérationnel" },
    ],
  },
  {
    title: "Ancienneté dans le poste",
    options: [
      { id: "tenure-0-1", label: "🌱 Nouveau (< 1 an)", soon: true },
      { id: "tenure-1-3", label: "1 – 3 ans", soon: true },
      { id: "tenure-3-5", label: "3 – 5 ans", soon: true },
      { id: "tenure-5+", label: "5+ ans", soon: true },
    ],
  },
  {
    title: "Service / Département",
    options: [
      { id: "dept-direction", label: "Direction générale" },
      { id: "dept-sales", label: "Commercial / Sales" },
      { id: "dept-marketing", label: "Marketing" },
      { id: "dept-it", label: "IT / Tech" },
      { id: "dept-finance", label: "Finance / Compta" },
      { id: "dept-hr", label: "RH" },
      { id: "dept-purchasing", label: "Achats" },
      { id: "dept-logistics", label: "Logistique / Supply" },
      { id: "dept-ops", label: "Opérations" },
      { id: "dept-product", label: "Produit" },
    ],
  },
  {
    title: "Pouvoir de décision",
    options: [
      { id: "dec-decider", label: "🎯 Décideur final", soon: true },
      { id: "dec-influencer", label: "Influenceur", soon: true },
      { id: "dec-user", label: "Utilisateur", soon: true },
    ],
  },
  {
    title: "Présence digitale",
    options: [
      { id: "digital-linkedin", label: "Profil LinkedIn actif", soon: true },
      { id: "digital-posts", label: "Publie régulièrement", soon: true },
      { id: "digital-events", label: "Intervient en événement", soon: true },
    ],
  },
];

const SIGNAL_FILTERS: { title: string; options: FilterOption[] }[] = [
  {
    title: "Recrutement",
    options: [
      { id: "rec-active", label: "🔥 Recrute activement", soon: true },
      { id: "rec-sales", label: "Recrute commerciaux", soon: true },
      { id: "rec-tech", label: "Recrute tech / IT", soon: true },
      { id: "rec-clevel", label: "Recrute C-Level", soon: true },
      { id: "rec-massive", label: "Recrutement massif (+10 postes)", soon: true },
    ],
  },
  {
    title: "Financement",
    options: [
      { id: "fund-recent", label: "💰 Levée < 12 mois", soon: true },
      { id: "fund-seed", label: "Seed", soon: true },
      { id: "fund-seriesA", label: "Série A", soon: true },
      { id: "fund-seriesBplus", label: "Série B et +", soon: true },
    ],
  },
  {
    title: "Changements stratégiques",
    options: [
      { id: "change-newceo", label: "Nouveau dirigeant", soon: true },
      { id: "change-newcommercial", label: "Nouveau Dir. Commercial", soon: true },
      { id: "change-merger", label: "Fusion / Acquisition", soon: true },
      { id: "change-pivot", label: "Pivot stratégique", soon: true },
    ],
  },
  {
    title: "Croissance",
    options: [
      { id: "growth-headcount", label: "📈 Effectif +10% sur 12 mois", soon: true },
      { id: "growth-revenue", label: "CA en croissance", soon: true },
      { id: "growth-newoffice", label: "Ouverture de site", soon: true },
      { id: "growth-international", label: "Expansion internationale", soon: true },
    ],
  },
  {
    title: "Marché & opportunités",
    options: [
      { id: "market-tender", label: "🏛️ Marché public remporté", soon: true },
      { id: "market-contract", label: "Gros contrat signé", soon: true },
      { id: "market-press", label: "Mention presse récente", soon: true },
      { id: "market-award", label: "Prix / Récompense reçu", soon: true },
    ],
  },
  {
    title: "Concurrents vulnérables",
    options: [
      { id: "comp-badreviews", label: "⚠️ Mauvais avis concurrent", soon: true },
      { id: "comp-churn", label: "Départs équipe concurrent", soon: true },
      { id: "comp-pricing", label: "Hausse tarifaire concurrent", soon: true },
    ],
  },
  {
    title: "Technologies utilisées",
    options: [
      { id: "tech-crm", label: "Utilise un CRM (Salesforce, HubSpot...)", soon: true },
      { id: "tech-erp", label: "Utilise un ERP (SAP, Oracle...)", soon: true },
      { id: "tech-noerp", label: "Pas d'ERP identifié", soon: true },
    ],
  },
];

const SECTION_DATA: Record<Section, { label: string; icon: string; groups: typeof COMPANY_FILTERS }> = {
  company: { label: "Entreprise", icon: "🏢", groups: COMPANY_FILTERS },
  contact: { label: "Contact", icon: "👤", groups: CONTACT_FILTERS },
  signals: { label: "Signaux d'achat", icon: "🎯", groups: SIGNAL_FILTERS },
};

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────

export function AdvancedFiltersPanel() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<Section>("company");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [stickyVisible, setStickyVisible] = useState(true);

  const dismissSticky = () => setStickyVisible(false);

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const reset = () => setSelected(new Set());

  return (
    <>
      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "10px 18px", borderRadius: 9999,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "-0.2px",
          border: "none", cursor: "pointer",
          boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.45)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(99,102,241,0.35)"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="4" y1="6" x2="20" y2="6" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="10" y1="18" x2="14" y2="18" />
        </svg>
        Filtres avancés
        <span style={{ background: "rgba(255,255,255,0.25)", padding: "2px 7px", borderRadius: 999, fontSize: 9, fontWeight: 800, letterSpacing: 1 }}>BETA</span>
        {selected.size > 0 && (
          <span style={{ background: "#fff", color: "#6366f1", padding: "2px 7px", borderRadius: 999, fontSize: 11, fontWeight: 800 }}>
            {selected.size}
          </span>
        )}
      </button>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)",
            backdropFilter: "blur(4px)", zIndex: 9000,
            animation: "sa-fade-in 0.2s ease",
          }}
        />
      )}

      {/* SIDEBAR */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "min(540px, 100vw)",
        background: "linear-gradient(180deg, #ffffff 0%, #fafaff 100%)",
        boxShadow: "-20px 0 60px rgba(15,23,42,0.15)",
        zIndex: 9001,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
        display: "flex", flexDirection: "column",
        fontFamily: "system-ui,-apple-system,BlinkMacSystemFont,sans-serif",
      }}>
        {/* HEADER */}
        <div style={{ padding: "24px 28px 18px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <div>
              <p style={{ color: "#6366f1", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 6px" }}>
                Ciblage de précision
              </p>
              <h2 style={{ color: "#0a0a0a", fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>
                Filtres avancés
              </h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: 32, height: 32, borderRadius: 10,
                background: "rgba(0,0,0,0.04)", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#0a0a0a", fontSize: 18, fontWeight: 600,
              }}
            >
              ✕
            </button>
          </div>
          <p style={{ color: "#6b6b6b", fontSize: 13, margin: "8px 0 0", lineHeight: 1.5 }}>
            Affinez votre ciblage selon l'entreprise, les contacts, ou les signaux d'achat en temps réel.
          </p>
        </div>

        {/* SECTION TABS */}
        <div style={{ display: "flex", gap: 4, padding: "16px 28px 0" }}>
          {(Object.keys(SECTION_DATA) as Section[]).map(s => (
            <button
              key={s}
              onClick={() => setSection(s)}
              style={{
                flex: 1, padding: "10px 14px", borderRadius: 10,
                background: section === s ? "#0a0a0a" : "transparent",
                color: section === s ? "#fff" : "#6b6b6b",
                border: section === s ? "none" : "1px solid rgba(0,0,0,0.08)",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                transition: "all 0.15s",
              }}
            >
              <span>{SECTION_DATA[s].icon}</span>
              {SECTION_DATA[s].label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "22px 28px 100px" }}>
          {SECTION_DATA[section].groups.map(group => (
            <div key={group.title} style={{ marginBottom: 26 }}>
              <p style={{ color: "#0a0a0a", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 12px" }}>
                {group.title}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {group.options.map(opt => {
                  const active = selected.has(opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggle(opt.id)}
                      style={{
                        padding: "8px 13px", borderRadius: 9999,
                        background: active ? "#0a0a0a" : opt.soon ? "rgba(99,102,241,0.05)" : "rgba(255,255,255,0.9)",
                        color: active ? "#fff" : opt.soon ? "#6366f1" : "#0a0a0a",
                        border: active ? "none" : `1px solid ${opt.soon ? "rgba(99,102,241,0.18)" : "rgba(0,0,0,0.08)"}`,
                        fontSize: 12.5, fontWeight: 600,
                        cursor: "pointer", letterSpacing: "-0.1px",
                        display: "inline-flex", alignItems: "center", gap: 5,
                        transition: "all 0.15s",
                      }}
                    >
                      {opt.label}
                      {opt.soon && !active && (
                        <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: 0.8, background: "rgba(99,102,241,0.15)", color: "#6366f1", padding: "1px 5px", borderRadius: 4 }}>
                          SOON
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{
          padding: "16px 28px", borderTop: "1px solid rgba(0,0,0,0.08)",
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
        }}>
          <button
            onClick={reset}
            style={{
              padding: "10px 16px", borderRadius: 10,
              background: "transparent", color: "#6b6b6b",
              border: "1px solid rgba(0,0,0,0.1)",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            Réinitialiser
          </button>
          <button
            onClick={() => setOpen(false)}
            style={{
              flex: 1, padding: "12px 20px", borderRadius: 10,
              background: "#0a0a0a", color: "#fff",
              fontSize: 14, fontWeight: 700, letterSpacing: "-0.2px",
              border: "none", cursor: "pointer",
            }}
          >
            Appliquer{selected.size > 0 && ` (${selected.size})`}
          </button>
        </div>
      </div>

      {/* POST-IT DEV TEMPORAIRE */}
      {stickyVisible && (
        <div style={{
          position: "fixed", bottom: 20, left: 20, zIndex: 8500,
          maxWidth: 280,
          background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
          border: "1px solid #f59e0b",
          borderRadius: 12,
          padding: "12px 14px 12px 16px",
          boxShadow: "0 8px 24px rgba(245,158,11,0.25), 0 2px 6px rgba(0,0,0,0.08)",
          transform: "rotate(-1.5deg)",
          fontFamily: "system-ui,-apple-system,sans-serif",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>📌</span>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: "#92400e", textTransform: "uppercase" }}>
                  Rappel dev
                </span>
              </div>
              <p style={{ color: "#78350f", fontSize: 12, fontWeight: 600, lineHeight: 1.45, margin: 0 }}>
                Chercher des API d'enrichissement B2B pour rendre les filtres avancés effectifs (Pappers, Bodacc, LinkedIn, etc.)
              </p>
            </div>
            <button
              onClick={dismissSticky}
              style={{
                background: "rgba(146,64,14,0.1)", border: "none",
                width: 22, height: 22, borderRadius: 6,
                cursor: "pointer", color: "#78350f", fontSize: 13, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}
              title="Masquer (réapparaîtra à la prochaine session)"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes sa-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default AdvancedFiltersPanel;
