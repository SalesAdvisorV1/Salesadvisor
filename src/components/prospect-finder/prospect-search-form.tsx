"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  prospectSearchSchema,
  type ProspectSearchFormValues,
} from "@/lib/schemas/prospect-search";

const SECTORS = [
  "Logistique", "Transport", "Tech", "SaaS", "Industrie", "BTP",
  "Santé", "Finance", "Commerce", "Conseil", "Marketing",
  "Immobilier", "Restauration", "Éducation",
];

const CITIES = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Nantes",
  "Strasbourg", "Lille", "Nice", "Rennes", "Grenoble", "Montpellier",
  "Nancy", "Metz", "Tours", "Rouen", "Clermont-Ferrand", "Dijon",
  "Angers", "Reims", "Saint-Étienne", "Le Havre", "Toulon", "Brest",
  "Limoges", "Nîmes", "Perpignan", "Orléans", "Caen", "Mulhouse",
];

const SIZE_OPTIONS = ["TPE", "PME", "ETI", "GE"] as const;
type CompanySize = typeof SIZE_OPTIONS[number];

const radiusOptions = ["10 km", "20 km", "50 km", "100 km"] as const;

const inputClass =
  "w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 focus:outline-none transition-all placeholder:text-gray-400";

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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">Filtres de recherche</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Secteur" error={errors.sector?.message}>
          <input
            {...register("sector")}
            list="sector-list"
            className={inputClass}
            placeholder="Logistique, Tech…"
            autoComplete="off"
          />
          <datalist id="sector-list">
            {SECTORS.map((s) => <option key={s} value={s} />)}
          </datalist>
        </Field>

        <Field label="Ville" error={errors.city?.message}>
          <input
            {...register("city")}
            list="city-list"
            className={inputClass}
            placeholder="Paris, Lyon…"
            autoComplete="off"
          />
          <datalist id="city-list">
            {CITIES.map((c) => <option key={c} value={c} />)}
          </datalist>
        </Field>

        <Field label="Pays" error={errors.country?.message}>
          <input {...register("country")} className={inputClass} placeholder="France" />
        </Field>

        <Field label="Rayon" error={errors.radius?.message}>
          <select {...register("radius")} className={inputClass}>
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
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                    active
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white border-gray-200 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Mots-clés" error={errors.keywords?.message}>
          <input {...register("keywords")} className={inputClass} placeholder="recrutement supply chain…" />
        </Field>

        <Field label="Poste ciblé" error={errors.targetRole?.message}>
          <input
            {...register("targetRole")}
            list="role-list"
            className={inputClass}
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
          className="mt-2 bg-gray-900 text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800 transition-all w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Recherche en cours…" : "Lancer la recherche (2 cr.)"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-700 uppercase tracking-wider">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
