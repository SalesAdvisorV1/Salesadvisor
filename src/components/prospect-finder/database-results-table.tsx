"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DatabaseProspect, DatabaseSearchFilters } from "@/types/database-prospect";

interface DatabaseResultsTableProps {
  results: DatabaseProspect[];
  total: number;
  page: number;
  perPage: number;
  isLoading: boolean;
  hasSearched: boolean;
  filters: DatabaseSearchFilters | null;
  onPageChange: (page: number) => void;
}

function exportToCsv(prospects: DatabaseProspect[]) {
  const headers = [
    "Nom",
    "SIREN",
    "SIRET",
    "Secteur NAF",
    "Libellé activité",
    "Effectifs",
    "Date création",
    "Adresse",
    "Code postal",
    "Ville",
    "Département",
  ];

  const rows = prospects.map((p) => [
    p.nom_complet,
    p.siren,
    p.siret,
    p.activite_principale,
    p.libelle_activite_principale,
    p.libelle_tranche_effectif,
    p.date_creation,
    p.adresse,
    p.code_postal,
    p.ville,
    p.departement,
  ]);

  const csvContent =
    "﻿" + // UTF-8 BOM for Excel
    [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => {
            const val = String(cell ?? "").replace(/"/g, '""');
            return `"${val}"`;
          })
          .join(";")
      )
      .join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `prospects-salesadvisor-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function DatabaseResultsTable({
  results,
  total,
  page,
  perPage,
  isLoading,
  hasSearched,
  onPageChange,
}: DatabaseResultsTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const totalPages = Math.ceil(total / perPage);

  const toggleAll = useCallback(() => {
    if (selected.size === results.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(results.map((r) => r.siren)));
    }
  }, [selected.size, results]);

  const toggleOne = useCallback((siren: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(siren)) next.delete(siren);
      else next.add(siren);
      return next;
    });
  }, []);

  const selectedProspects = results.filter((r) => selected.has(r.siren));

  if (!hasSearched && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.16)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            color: "#4f46e5",
          }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M3 9h18M9 21V9" strokeLinecap="round" />
          </svg>
        </div>
        <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "260px", lineHeight: 1.6 }}>
          Définissez vos filtres et lancez une recherche pour accéder à la base SIRENE
        </p>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ overflowX: "auto" }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(99,102,241,0.10)" }}>
              {["", "Entreprise", "Activité", "Effectifs", "Localisation", "Création"].map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: "10px 12px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#475569",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(15,23,42,0.04)" }}>
                {[40, 180, 140, 100, 130, 90].map((w, j) => (
                  <td key={j} style={{ padding: "12px 12px" }}>
                    <div
                      style={{
                        height: "12px",
                        width: `${w}px`,
                        borderRadius: "6px",
                        background: "rgba(99,102,241,0.07)",
                        animation: "pulse 1.5s ease-in-out infinite",
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    );
  }

  if (results.length === 0 && hasSearched) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "rgba(245,158,11,0.10)",
            border: "1px solid rgba(245,158,11,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            color: "#b45309",
          }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35M8 11h6" strokeLinecap="round" />
          </svg>
        </div>
        <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "260px", lineHeight: 1.6 }}>
          Aucune entreprise trouvée. Essayez d'élargir vos critères.
        </p>
      </motion.div>
    );
  }

  const allSelected = results.length > 0 && selected.size === results.length;

  return (
    <AnimatePresence mode="wait">
      <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "12px", color: "#64748b" }}>
            {selected.size > 0 ? (
              <span style={{ color: "#4f46e5", fontWeight: 600 }}>
                {selected.size} sélectionné{selected.size > 1 ? "s" : ""}
              </span>
            ) : (
              <>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>
                  {Math.min((page - 1) * perPage + 1, total)}–{Math.min(page * perPage, total)}
                </span>{" "}
                sur {total.toLocaleString("fr-FR")} entreprises
              </>
            )}
          </span>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {selected.size > 0 && (
              <button
                type="button"
                onClick={() => exportToCsv(selectedProspects)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                  <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Exporter {selected.size} CSV
              </button>
            )}
            <button
              type="button"
              onClick={() => exportToCsv(results)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(99,102,241,0.22)",
                background: "rgba(99,102,241,0.06)",
                color: "#4f46e5",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Exporter page ({results.length})
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(99,102,241,0.10)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "rgba(99,102,241,0.04)" }}>
                <th style={{ padding: "10px 14px", width: "36px" }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    style={{ accentColor: "#6366f1", width: "14px", height: "14px", cursor: "pointer" }}
                  />
                </th>
                {["Entreprise", "Activité", "Effectifs", "Localisation", "Créée le"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 12px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#475569",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((prospect, i) => {
                const isChecked = selected.has(prospect.siren);
                return (
                  <tr
                    key={prospect.siren + i}
                    style={{
                      borderTop: "1px solid rgba(15,23,42,0.05)",
                      background: isChecked ? "rgba(99,102,241,0.04)" : "transparent",
                      transition: "background 0.1s ease",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleOne(prospect.siren)}
                  >
                    <td style={{ padding: "11px 14px" }} onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOne(prospect.siren)}
                        style={{ accentColor: "#6366f1", width: "14px", height: "14px", cursor: "pointer" }}
                      />
                    </td>

                    {/* Name + SIREN */}
                    <td style={{ padding: "11px 12px", maxWidth: "200px" }}>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#0f172a",
                          fontSize: "13px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "190px",
                        }}
                        title={prospect.nom_complet}
                      >
                        {prospect.nom_complet || prospect.nom_raison_sociale}
                      </div>
                      <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                        SIREN {prospect.siren}
                      </div>
                    </td>

                    {/* Activity */}
                    <td style={{ padding: "11px 12px", maxWidth: "160px" }}>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#475569",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "150px",
                        }}
                        title={prospect.libelle_activite_principale}
                      >
                        {prospect.libelle_activite_principale || prospect.activite_principale}
                      </div>
                      {prospect.activite_principale && (
                        <span
                          style={{
                            marginTop: "3px",
                            display: "inline-block",
                            fontSize: "10px",
                            fontWeight: 600,
                            color: "#6366f1",
                            background: "rgba(99,102,241,0.08)",
                            padding: "1px 6px",
                            borderRadius: "4px",
                          }}
                        >
                          {prospect.activite_principale}
                        </span>
                      )}
                    </td>

                    {/* Size */}
                    <td style={{ padding: "11px 12px", whiteSpace: "nowrap" }}>
                      {prospect.libelle_tranche_effectif ? (
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#475569",
                            background: "rgba(15,23,42,0.05)",
                            padding: "3px 8px",
                            borderRadius: "6px",
                          }}
                        >
                          {prospect.libelle_tranche_effectif}
                        </span>
                      ) : (
                        <span style={{ fontSize: "11px", color: "#cbd5e1" }}>—</span>
                      )}
                    </td>

                    {/* Location */}
                    <td style={{ padding: "11px 12px", whiteSpace: "nowrap" }}>
                      <div style={{ fontSize: "12px", color: "#475569" }}>
                        {prospect.ville || "—"}
                      </div>
                      {prospect.code_postal && (
                        <div style={{ fontSize: "11px", color: "#94a3b8" }}>{prospect.code_postal}</div>
                      )}
                    </td>

                    {/* Date */}
                    <td style={{ padding: "11px 12px", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>
                        {prospect.date_creation
                          ? new Date(prospect.date_creation).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "short",
                            })
                          : "—"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              marginTop: "16px",
            }}
          >
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(99,102,241,0.20)",
                background: page <= 1 ? "rgba(99,102,241,0.03)" : "rgba(99,102,241,0.06)",
                color: page <= 1 ? "#cbd5e1" : "#4f46e5",
                fontSize: "13px",
                fontWeight: 600,
                cursor: page <= 1 ? "not-allowed" : "pointer",
              }}
            >
              ← Précédent
            </button>

            <span style={{ fontSize: "12px", color: "#64748b", padding: "0 8px" }}>
              Page <strong style={{ color: "#0f172a" }}>{page}</strong> / {totalPages.toLocaleString("fr-FR")}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(99,102,241,0.20)",
                background: page >= totalPages ? "rgba(99,102,241,0.03)" : "rgba(99,102,241,0.06)",
                color: page >= totalPages ? "#cbd5e1" : "#4f46e5",
                fontSize: "13px",
                fontWeight: 600,
                cursor: page >= totalPages ? "not-allowed" : "pointer",
              }}
            >
              Suivant →
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
