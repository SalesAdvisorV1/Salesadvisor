"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  prospectSearchSchema,
  type ProspectSearchFormValues,
} from "@/lib/schemas/prospect-search";

const radiusOptions = ["10 km", "20 km", "50 km", "100 km"] as const;

const inputClass =
  "w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 focus:outline-none transition-all placeholder:text-gray-400";

interface ProspectSearchFormProps {
  onSubmit: (values: ProspectSearchFormValues) => void;
  isLoading: boolean;
}

export function ProspectSearchForm({ onSubmit, isLoading }: ProspectSearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProspectSearchFormValues>({
    resolver: zodResolver(prospectSearchSchema),
    defaultValues: {
      sector: "Logistique",
      city: "Paris",
      country: "France",
      radius: "50 km",
      companySize: "PME, ETI",
      keywords: "recrutement supply chain transport",
      targetRole: "Directeur logistique",
    },
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">Filtres de recherche</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Secteur" error={errors.sector?.message}>
          <input {...register("sector")} className={inputClass} placeholder="Logistique" />
        </Field>

        <Field label="Ville" error={errors.city?.message}>
          <input {...register("city")} className={inputClass} placeholder="Paris" />
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
          <input {...register("companySize")} className={inputClass} placeholder="PME, ETI..." />
        </Field>

        <Field label="Mots-clés" error={errors.keywords?.message}>
          <input {...register("keywords")} className={inputClass} placeholder="recrutement supply chain" />
        </Field>

        <Field label="Poste ciblé" error={errors.targetRole?.message}>
          <input {...register("targetRole")} className={inputClass} placeholder="Directeur logistique" />
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
