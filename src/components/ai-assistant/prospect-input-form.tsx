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

interface ProspectInputFormProps {
  onSubmit: (values: AiProspectFormValues, task: AiTaskType) => void;
  isLoading: boolean;
  selectedTask: AiTaskType;
  onTaskChange: (task: AiTaskType) => void;
}

export function ProspectInputForm({
  onSubmit,
  isLoading,
  selectedTask,
  onTaskChange,
}: ProspectInputFormProps) {
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
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold">Informations prospect</h2>

      <div className="mt-6 space-y-2">
        <p className="text-sm text-slate-400">Type d'analyse</p>
        {taskOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onTaskChange(opt.value)}
            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
              selectedTask === opt.value
                ? "border-blue-500/50 bg-blue-500/10 text-white"
                : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-600"
            }`}
          >
            <div>
              <span className="font-medium">{opt.label}</span>
              <span className="ml-2 text-sm text-slate-500">{opt.description}</span>
            </div>
            <span className="shrink-0 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
              {opt.cost} cr.
            </span>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit((values) => onSubmit(values, selectedTask))}
        className="mt-6 space-y-4"
        noValidate
      >
        <Field label="Nom de l'entreprise" error={errors.companyName?.message}>
          <input
            {...register("companyName")}
            className={inputClass}
            placeholder="Translog France"
          />
        </Field>

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

        <Field label="Poste ciblé (optionnel)" error={errors.targetRole?.message}>
          <input
            {...register("targetRole")}
            className={inputClass}
            placeholder="Directeur logistique"
          />
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
          className="mt-2 w-full rounded-2xl bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Analyse IA en cours…" : "Lancer l'analyse IA"}
        </button>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500";

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
      <label className="mb-2 block text-sm text-slate-300">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
