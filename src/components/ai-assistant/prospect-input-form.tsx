"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  aiProspectSchema,
  type AiProspectFormValues,
} from "@/lib/schemas/ai-assist";
import type { AiTaskType } from "@/types/ai-assistant";

const taskOptions: { value: AiTaskType; label: string; cost: number; description: string }[] = [
  { value: "summary", label: "Résumé entreprise", cost: 1, description: "Analyse rapide du prospect" },
  { value: "pitch", label: "Pitch personnalisé", cost: 3, description: "Email ou message LinkedIn prêt à envoyer" },
  { value: "call-prep", label: "Préparation appel", cost: 2, description: "Script + réponses aux objections" },
];

const inputClass =
  "w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 focus:outline-none transition-all placeholder:text-gray-400";

interface ProspectInputFormProps {
  onSubmit: (values: AiProspectFormValues, task: AiTaskType) => void;
  isLoading: boolean;
  selectedTask: AiTaskType;
  onTaskChange: (task: AiTaskType) => void;
}

export function ProspectInputForm({ onSubmit, isLoading, selectedTask, onTaskChange }: ProspectInputFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AiProspectFormValues>({
    resolver: zodResolver(aiProspectSchema),
    defaultValues: {
      companyName: "Translog France",
      sector: "Logistique",
      city: "Paris",
      targetRole: "Directeur logistique",
      context: "",
    },
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-5">Informations prospect</h2>

      <div className="space-y-2 mb-5">
        <p className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">Type d'analyse</p>
        {taskOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onTaskChange(opt.value)}
            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
              selectedTask === opt.value
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div>
              <span className="text-sm font-medium">{opt.label}</span>
              <span className={`ml-2 text-xs ${selectedTask === opt.value ? 'text-white/60' : 'text-gray-400'}`}>
                {opt.description}
              </span>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
              selectedTask === opt.value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {opt.cost} cr.
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit((values) => onSubmit(values, selectedTask))} className="space-y-4" noValidate>
        <Field label="Nom de l'entreprise" error={errors.companyName?.message}>
          <input {...register("companyName")} className={inputClass} placeholder="Translog France" />
        </Field>

        <Field label="Secteur" error={errors.sector?.message}>
          <input {...register("sector")} className={inputClass} placeholder="Logistique" />
        </Field>

        <Field label="Ville" error={errors.city?.message}>
          <input {...register("city")} className={inputClass} placeholder="Paris" />
        </Field>

        <Field label="Poste ciblé (optionnel)" error={errors.targetRole?.message}>
          <input {...register("targetRole")} className={inputClass} placeholder="Directeur logistique" />
        </Field>

        <Field label="Contexte / notes (optionnel)" error={errors.context?.message}>
          <textarea
            {...register("context")}
            className={`${inputClass} min-h-[80px] resize-none`}
            placeholder="Signaux détectés, notes de prospection…"
          />
        </Field>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white text-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 transition-all"
        >
          {isLoading ? "Analyse IA en cours…" : "Lancer l'analyse IA"}
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
