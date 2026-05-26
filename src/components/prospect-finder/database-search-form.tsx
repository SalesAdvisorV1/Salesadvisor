"use client";

import { useState } from "react";
import type { DatabaseSearchFilters } from "@/types/database-prospect";

// Top NAF sectors for B2B prospecting
const NAF_SECTORS = [
  { code: "", label: "Tous les secteurs" },
  { code: "41", label: "Construction de bâtiments" },
  { code: "42", label: "Génie civil" },
  { code: "43", label: "Travaux de construction spécialisés" },
  { code: "45", label: "Commerce et réparation automobiles" },
  { code: "46", label: "Commerce de gros interentreprises" },
  { code: "47", label: "Commerce de détail" },
  { code: "49", label: "Transports terrestres" },
  { code: "52", label: "Entreposage et transports auxiliaires" },
  { code: "55", label: "Hébergement" },
  { code: "56", label: "Restauration" },
  { code: "58", label: "Édition" },
  { code: "61", label: "Télécommunications" },
  { code: "62", label: "Activités informatiques" },
  { code: "63", label: "Services d'information" },
  { code: "64", label: "Activités financières" },
  { code: "68", label: "Activités immobilières" },
  { code: "69", label: "Activités juridiques et comptables" },
  { code: "70", label: "Activités des sièges sociaux / conseil" },
  { code: "71", label: "Architecture et ingénierie" },
  { code: "72", label: "Recherche-développement" },
  { code: "73", label: "Publicité et études de marché" },
  { code: "74", label: "Autres activités spécialisées" },
  { code: "77", label: "Location et crédit-bail" },
  { code: "78", label: "Activités liées à l'emploi" },
  { code: "79", label: "Agences de voyage" },
  { code: "80", label: "Enquêtes et sécurité" },
  { code: "81", label: "Services relatifs aux bâtiments" },
  { code: "82", label: "Services administratifs de bureau" },
  { code: "85", label: "Enseignement" },
  { code: "86", label: "Activités pour la santé" },
  { code: "90", label: "Arts, spectacles et activités récréatives" },
  { code: "96", label: "Autres services personnels" },
];

const DEPARTMENTS = [
  { code: "", label: "Tous les départements" },
  { code: "01", label: "01 — Ain" },
  { code: "02", label: "02 — Aisne" },
  { code: "03", label: "03 — Allier" },
  { code: "06", label: "06 — Alpes-Maritimes" },
  { code: "13", label: "13 — Bouches-du-Rhône" },
  { code: "14", label: "14 — Calvados" },
  { code: "21", label: "21 — Côte-d'Or" },
  { code: "25", label: "25 — Doubs" },
  { code: "29", label: "29 — Finistère" },
  { code: "30", label: "30 — Gard" },
  { code: "31", label: "31 — Haute-Garonne" },
  { code: "33", label: "33 — Gironde" },
  { code: "34", label: "34 — Hérault" },
  { code: "35", label: "35 — Ille-et-Vilaine" },
  { code: "37", label: "37 — Indre-et-Loire" },
  { code: "38", label: "38 — Isère" },
  { code: "40", label: "40 — Landes" },
  { code: "42", label: "42 — Loire" },
  { code: "44", label: "44 — Loire-Atlantique" },
  { code: "45", label: "45 — Loiret" },
  { code: "49", label: "49 — Maine-et-Loire" },
  { code: "51", label: "51 — Marne" },
  { code: "54", label: "54 — Meurthe-et-Moselle" },
  { code: "57", label: "57 — Moselle" },
  { code: "59", label: "59 — Nord" },
  { code: "60", label: "60 — Oise" },
  { code: "62", label: "62 — Pas-de-Calais" },
  { code: "63", label: "63 — Puy-de-Dôme" },
  { code: "64", label: "64 — Pyrénées-Atlantiques" },
  { code: "67", label: "67 — Bas-Rhin" },
  { code: "68", label: "68 — Haut-Rhin" },
  { code: "69", label: "69 — Rhône" },
  { code: "72", label: "72 — Sarthe" },
  { code: "74", label: "74 — Haute-Savoie" },
  { code: "75", label: "75 — Paris" },
  { code: "76", label: "76 — Seine-Maritime" },
  { code: "77", label: "77 — Seine-et-Marne" },
  { code: "78", label: "78 — Yvelines" },
  { code: "80", label: "80 — Somme" },
  { code: "83", label: "83 — Var" },
  { code: "84", label: "84 — Vaucluse" },
  { code: "85", label: "85 — Vendée" },
  { code: "87", label: "87 — Haute-Vienne" },
  { code: "91", label: "91 — Essonne" },
  { code: "92", label: "92 — Hauts-de-Seine" },
  { code: "93", label: "93 — Seine-Saint-Denis" },
  { code: "94", label: "94 — Val-de-Marne" },
  { code: "95", label: "95 — Val-d'Oise" },
  { code: "971", label: "971 — Guadeloupe" },
  { code: "972", label: "972 — Martinique" },
  { code: "973", label: "973 — Guyane" },
  { code: "974", label: "974 — La Réunion" },
];

const SIZE_RANGES = [
  { min: "", max: "", label: "Toutes tailles" },
  { min: "00", max: "03", label: "TPE (0–9 salariés)" },
  { min: "11", max: "12", label: "PE (10–49 salariés)" },
  { min: "21", max: "31", label: "PME (50–249 salariés)" },
  { min: "32", max: "41", label: "ETI (250–999 salariés)" },
  { min: "42", max: "53", label: "Grande entreprise (1 000+)" },
];

interface DatabaseSearchFormProps {
  onSearch: (filters: DatabaseSearchFilters) => void;
  isLoading: boolean;
  totalResults?: number;
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(99,102,241,0.18)",
  background: "rgba(255,255,255,0.85)",
  color: "#0f172a",
  fontSize: "14px",
  outline: "none",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "36px",
  cursor: "pointer",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(99,102,241,0.18)",
  background: "rgba(255,255,255,0.85)",
  color: "#0f172a",
  fontSize: "14px",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "#475569",
  marginBottom: "6px",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

export function DatabaseSearchForm({ onSearch, isLoading, totalResults }: DatabaseSearchFormProps) {
  const [q, setQ] = useState("");
  const [sector, setSector] = useState("");
  const [department, setDepartment] = useState("");
  const [sizeIndex, setSizeIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const size = SIZE_RANGES[sizeIndex];
    onSearch({
      q: q.trim() || undefined,
      activite_principale: sector || undefined,
      departement: department || undefined,
      tranche_effectif_min: size.min || undefined,
      tranche_effectif_max: size.max || undefined,
      page: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(99,102,241,0.12)",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </div>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
            Filtres de recherche
          </span>
          {typeof totalResults === "number" && (
            <span
              style={{
                marginLeft: "auto",
                fontSize: "11px",
                fontWeight: 600,
                background: "rgba(99,102,241,0.08)",
                color: "#4f46e5",
                padding: "2px 8px",
                borderRadius: "999px",
              }}
            >
              {totalResults.toLocaleString("fr-FR")} résultats
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Free text search */}
          <div>
            <label style={labelStyle}>Nom d'entreprise (optionnel)</label>
            <input
              type="text"
              placeholder="Ex : Dupont, TechFlow, BTP…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Sector */}
          <div>
            <label style={labelStyle}>Secteur d'activité (NAF)</label>
            <select value={sector} onChange={(e) => setSector(e.target.value)} style={selectStyle}>
              {NAF_SECTORS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label style={labelStyle}>Département</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} style={selectStyle}>
              {DEPARTMENTS.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div>
            <label style={labelStyle}>Taille d'entreprise</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {SIZE_RANGES.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSizeIndex(i)}
                  style={{
                    padding: "5px 11px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 600,
                    border: "1px solid",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    ...(sizeIndex === i
                      ? {
                          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                          borderColor: "transparent",
                          color: "#ffffff",
                        }
                      : {
                          background: "rgba(99,102,241,0.04)",
                          borderColor: "rgba(99,102,241,0.18)",
                          color: "#475569",
                        }),
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            marginTop: "16px",
            width: "100%",
            padding: "11px",
            borderRadius: "10px",
            border: "none",
            background: isLoading
              ? "rgba(99,102,241,0.4)"
              : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "opacity 0.15s ease",
          }}
        >
          {isLoading ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2.5}
                style={{ animation: "spin 1s linear infinite" }}
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Recherche en cours…
            </>
          ) : (
            <>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              Rechercher dans la base
            </>
          )}
        </button>

        <p style={{ marginTop: "10px", fontSize: "11px", color: "#94a3b8", textAlign: "center" }}>
          Source : SIRENE / INSEE · 12M+ entreprises françaises · 1 crédit par recherche
        </p>
      </div>
    </form>
  );
}
