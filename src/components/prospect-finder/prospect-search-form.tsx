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
  const roleSuggestions = getRoleSuggestions(sector);

  const toggleSize = (size: CompanySize) => {
    const next = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(next);
    setValue("companySize", next.join(", "));
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

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 text-white font-semibold py-3.5 rounded-full w-full transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
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
