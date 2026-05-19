"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  prospectSearchSchema,
  type ProspectSearchFormValues,
} from "@/lib/schemas/prospect-search";

const radiusOptions = ["10 km", "20 km", "50 km", "100 km"] as const;

interface ProspectSearchFormProps {
  onSubmit: (values: ProspectSearchFormValues) => void;
  isLoading: boolean;
}

export function ProspectSearchForm({
  onSubmit,
  isLoading,
}: ProspectSearchFormProps) {
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
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold">Filtres de recherche</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-4"
        noValidate
      >
        <Field label="Secteur" error={errors.sector?.message}>
          <input
            {...register("sector")}
            className={inputClass}
            placeholder="Logistique"
          />
        </Field>

        <Field label="Ville" error={errors.city?.message}>
          <input
            {...register("city")}
            className={inputClass}
            placeholder="Paris"
          />
        </Field>

        <Field label="Pays" error={errors.country?.message}>
          <input
            {...register("country")}
            className={inputClass}
            placeholder="France"
          />
        </Field>

        <Field label="Rayon" error={errors.radius?.message}>
          <select {...register("radius")} className={inputClass}>
            {radiusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Taille entreprise" error={errors.companySize?.message}>
          <input
            {...register("companySize")}
            className={inputClass}
            placeholder="PME, ETI..."
          />
        </Field>

        <Field label="Mots-clés" error={errors.keywords?.message}>
          <input
            {...register("keywords")}
            className={inputClass}
            placeholder="recrutement supply chain"
          />
        </Field>

        <Field label="Poste ciblé" error={errors.targetRole?.message}>
          <input
            {...register("targetRole")}
            className={inputClass}
            placeholder="Directeur logistique"
          />
        </Field>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-gray-100 transition-all w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Recherche en cours…" : "Lancer la recherche (2 cr.)"}
        </button>
      </form>

    </div>
  );
}

const inputClass =
  "w-full border border-[#222] bg-[#111] text-white rounded-xl px-4 py-3 focus:border-white/30 focus:outline-none transition-all placeholder:text-[#444]";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[#555] uppercase tracking-widest">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
