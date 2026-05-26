"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import {
  prospectSearchSchema,
  type ProspectSearchFormValues,
} from "@/lib/schemas/prospect-search";

const SECTORS = [
  "Logistique", "Transport", "Tech", "SaaS", "Industrie", "BTP",
  "Santé", "Finance", "Commerce", "Conseil", "Marketing",
  "Immobilier", "Restauration", "Éducation",
];

interface GeoCommune {
  nom: string;
  codesPostaux: string[];
}

const SIZE_OPTIONS = ["TPE", "PME", "ETI", "GE"] as const;
type CompanySize = typeof SIZE_OPTIONS[number];

// Estimated prospect count (pure heuristic, no API call)
function estimateCount(sector: string, radius: string, sizes: string): number {
  if (!sector.trim()) return 0;
  const SECTOR_BASE: Record<string, number> = {
    btp: 280000, construction: 280000, travaux: 280000,
    commerce: 450000, distribution: 350000,
    transport: 160000, logistique: 110000,
    restauration: 240000,
    santé: 200000, médical: 140000,
    tech: 95000, saas: 35000, informatique: 115000, logiciel: 60000,
    industrie: 170000,
    conseil: 130000, consulting: 85000,
    immobilier: 100000,
    finance: 80000,
    marketing: 50000, publicité: 38000,
    éducation: 70000, formation: 55000,
  };
  const s = sector.toLowerCase();
  let base = 100000;
  for (const [key, val] of Object.entries(SECTOR_BASE)) {
    if (s.includes(key)) { base = val; break; }
  }
  const r = parseInt(radius || "50");
  const rf = r <= 10 ? 0.015 : r <= 20 ? 0.05 : r <= 50 ? 0.12 : 0.28;
  const n = Math.max(1, (sizes || "").split(",").filter((x) => x.trim()).length);
  const sf = Math.min(1.0, 0.2 + n * 0.2);
  const result = Math.round(base * rf * sf);
  return Math.max(10, Math.min(99999, Math.round(result / 5) * 5));
}

const QUICK_PRESETS: { label: string; sector: string; city: string; sizes: CompanySize[] }[] = [
  { label: "BTP · Paris",         sector: "BTP",       city: "Paris",     sizes: ["PME"] },
  { label: "Transport · Lyon",    sector: "Transport",  city: "Lyon",      sizes: ["PME", "ETI"] },
  { label: "Tech · Bordeaux",     sector: "Tech",       city: "Bordeaux",  sizes: ["TPE", "PME"] },
  { label: "Santé · Marseille",   sector: "Santé",      city: "Marseille", sizes: ["PME"] },
];

const radiusOptions = ["10 km", "20 km", "50 km", "100 km"] as const;

const inputClass =
  "w-full rounded-xl px-4 py-3 text-sm transition-all duration-150 placeholder:text-slate-400";
const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.7)',
  border: '1px solid rgba(99,102,241,0.18)',
  color: '#0f172a',
  outline: 'none',
};

function getRoleSuggestions(sector: string): string[] {
  const s = sector.toLowerCase();
  if (s.includes("logistique") || s.includes("transport")) {
    return ["Directeur Logistique", "Responsable Supply Chain", "Chef de Projet Transport", "Directeur des Opérations"];
  }
  if (s.includes("tech") || s.includes("saas")) {
    return ["CTO", "CEO", "Directeur Commercial", "VP Sales", "Head of Growth"];
  }
  if (s.includes("btp")) {
    return ["Directeur de Travaux", "Conducteur de Travaux", "Chargé d'Affaires"];
  }
  return ["Directeur Général", "Directeur Commercial", "PDG", "Responsable Achats"];
}

interface ProspectSearchFormProps {
  onSubmit: (values: ProspectSearchFormValues) => void;
  isLoading: boolean;
}

export function ProspectSearchForm({ onSubmit, isLoading }: ProspectSearchFormProps) {
  const [selectedSizes, setSelectedSizes] = useState<CompanySize[]>(["PME", "ETI"]);
  const [cityInput, setCityInput] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<GeoCommune[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cityWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cityWrapperRef.current && !cityWrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setCityInput(val);
    setValue("city", val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.length < 2) {
      setCitySuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(val)}&fields=nom,codesPostaux&boost=population&limit=10`
        );
        const data: GeoCommune[] = await res.json();
        setCitySuggestions(data);
        setShowSuggestions(true);
      } catch {
        setCitySuggestions([]);
      }
    }, 300);
  }

  function handleCitySelect(commune: GeoCommune) {
    setCityInput(commune.nom);
    setValue("city", commune.nom);
    setCitySuggestions([]);
    setShowSuggestions(false);
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProspectSearchFormValues>({
    resolver: zodResolver(prospectSearchSchema),
    defaultValues: {
      sector: "",
      city: "",
      country: "France",
      radius: "50 km",
      companySize: "PME, ETI",
      keywords: "",
      targetRole: "",
    },
  });

  const cityRegister = register("city");
  const sector = watch("sector") ?? "";
  const radius = watch("radius") ?? "50 km";
  const companySize = watch("companySize") ?? "";
  const roleSuggestions = getRoleSuggestions(sector);
  const estimate = estimateCount(sector, radius, companySize);

  const toggleSize = (size: CompanySize) => {
    const next = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(next);
    setValue("companySize", next.join(", "));
  };

  const applyPreset = (preset: typeof QUICK_PRESETS[0]) => {
    setValue("sector", preset.sector);
    setCityInput(preset.city);
    setValue("city", preset.city);
    setSelectedSizes(preset.sizes);
    setValue("companySize", preset.sizes.join(", "));
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(99,102,241,0.10)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
      }}
    >
      <h2 className="text-base font-semibold mb-5" style={{ color: '#0f172a' }}>Filtres de recherche</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Secteur" error={errors.sector?.message}>
          <input
            {...register("sector")}
            list="sector-list"
            className={inputClass}
            style={inputStyle}
            placeholder="Logistique, Tech…"
            autoComplete="off"
          />
          <datalist id="sector-list">
            {SECTORS.map((s) => <option key={s} value={s} />)}
          </datalist>
        </Field>

        <Field label="Ville" error={errors.city?.message}>
          <div ref={cityWrapperRef} className="relative">
            <input
              name="city"
              ref={cityRegister.ref}
              onBlur={cityRegister.onBlur}
              value={cityInput}
              onChange={handleCityChange}
              onFocus={() => citySuggestions.length > 0 && setShowSuggestions(true)}
              className={inputClass}
              style={inputStyle}
              placeholder="Paris, Lyon…"
              autoComplete="off"
            />
            {showSuggestions && citySuggestions.length > 0 && (
              <ul
                className="absolute left-0 right-0 rounded-xl mt-1 z-50 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(99,102,241,0.18)',
                  boxShadow: '0 10px 28px rgba(99,102,241,0.16)',
                }}
              >
                {citySuggestions.map((c) => (
                  <li
                    key={`${c.nom}-${c.codesPostaux[0]}`}
                    onMouseDown={() => handleCitySelect(c)}
                    className="py-2 px-4 cursor-pointer text-sm transition-colors"
                    style={{ color: '#0f172a' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLLIElement).style.background = 'rgba(99,102,241,0.08)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLLIElement).style.background = 'transparent'; }}
                  >
                    {c.nom}{c.codesPostaux[0] ? ` (${c.codesPostaux[0]})` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Field>

        <Field label="Pays" error={errors.country?.message}>
          <input {...register("country")} className={inputClass} style={inputStyle} placeholder="France" />
        </Field>

        <Field label="Rayon" error={errors.radius?.message}>
          <select {...register("radius")} className={inputClass} style={inputStyle}>
            {radiusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </Field>

        <Field label="Taille entreprise" error={errors.companySize?.message}>
          <div className="flex gap-2">
            {SIZE_OPTIONS.map((size) => {
              const active = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={active
                    ? {
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: '#ffffff',
                        border: '1px solid transparent',
                        boxShadow: '0 4px 14px rgba(99,102,241,0.28), 0 1px 0 rgba(255,255,255,0.25) inset',
                      }
                    : {
                        background: 'rgba(255,255,255,0.6)',
                        color: '#475569',
                        border: '1px solid rgba(99,102,241,0.16)',
                      }
                  }
                >
                  {size}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Mots-clés" error={errors.keywords?.message}>
          <input {...register("keywords")} className={inputClass} style={inputStyle} placeholder="recrutement supply chain…" />
        </Field>

        <Field label="Poste ciblé" error={errors.targetRole?.message}>
          <input
            {...register("targetRole")}
            list="role-list"
            className={inputClass}
            style={inputStyle}
            placeholder="Directeur Logistique…"
            autoComplete="off"
          />
          <datalist id="role-list">
            {roleSuggestions.map((r) => <option key={r} value={r} />)}
          </datalist>
        </Field>

        {/* Estimated count badge */}
        {estimate > 0 && (
          <div
            style={{
              marginTop: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 14px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.07) 100%)",
              border: "1px solid rgba(99,102,241,0.16)",
              animation: "sa-count-up 0.25s ease",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth={2}>
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#4f46e5" }}>
              ~{estimate.toLocaleString("fr-FR")} prospects
            </span>
            <span style={{ fontSize: "11px", color: "#94a3b8" }}>potentiels · estimation IA</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-shimmer mt-3 text-white font-semibold py-3.5 rounded-full w-full transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            boxShadow: '0 4px 14px rgba(99,102,241,0.28), 0 1px 0 rgba(255,255,255,0.25) inset',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              const t = e.currentTarget as HTMLButtonElement;
              t.style.transform = 'translateY(-1px)';
              t.style.boxShadow = '0 8px 22px rgba(99,102,241,0.40), 0 1px 0 rgba(255,255,255,0.25) inset';
            }
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget as HTMLButtonElement;
            t.style.transform = 'translateY(0)';
            t.style.boxShadow = '0 4px 14px rgba(99,102,241,0.28), 0 1px 0 rgba(255,255,255,0.25) inset';
          }}
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                <path d="M22 12a10 10 0 0 0-10-10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Recherche en cours…
            </span>
          ) : (
            "Lancer la recherche (2 cr.)"
          )}
        </button>
        {/* Quick preset chips */}
        <div style={{ marginTop: "14px" }}>
          <p style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            marginBottom: "8px",
          }}>
            Recherches rapides
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {QUICK_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p)}
                className="sa-preset-chip"
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(99,102,241,0.18)",
                  background: "rgba(99,102,241,0.04)",
                  color: "#4f46e5",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  minHeight: "32px",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: '#64748b', letterSpacing: '0.04em' }}
      >
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs" style={{ color: '#dc2626' }}>{error}</p> : null}
    </div>
  );
}
