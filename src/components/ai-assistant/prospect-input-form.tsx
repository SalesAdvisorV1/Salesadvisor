"use client";

import { useState } from "react";
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

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.78)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(99,102,241,0.12)",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
  padding: "24px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.70)",
  border: "1px solid rgba(99,102,241,0.18)",
  borderRadius: "10px",
  padding: "10px 14px",
  fontSize: "14px",
  color: "#0f172a",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
  display: "block",
};

interface ProspectInputFormProps {
  onSubmit: (values: AiProspectFormValues, task: AiTaskType) => void;
  isLoading: boolean;
  selectedTask: AiTaskType;
  onTaskChange: (task: AiTaskType) => void;
  defaultValues?: { companyName?: string; sector?: string; city?: string; targetRole?: string; context?: string };
}

export function ProspectInputForm({ onSubmit, isLoading, selectedTask, onTaskChange, defaultValues }: ProspectInputFormProps) {
  const [btnHover, setBtnHover] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AiProspectFormValues>({
    resolver: zodResolver(aiProspectSchema),
    defaultValues: {
      companyName: defaultValues?.companyName ?? "Translog France",
      sector: defaultValues?.sector ?? "Logistique",
      city: defaultValues?.city ?? "Paris",
      targetRole: defaultValues?.targetRole ?? "Directeur logistique",
      context: defaultValues?.context ?? "",
    },
  });

  return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", marginBottom: "20px", letterSpacing: "-0.01em" }}>
        Informations prospect
      </h2>

      {/* Task type selector */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
          Type d'analyse
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {taskOptions.map((opt) => {
            const isActive = selectedTask === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onTaskChange(opt.value)}
                className={isActive ? undefined : "sa-task-btn-inactive"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  border: isActive ? "1px solid transparent" : "1px solid rgba(99,102,241,0.14)",
                  background: isActive
                    ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                    : "rgba(255,255,255,0.70)",
                  color: isActive ? "#ffffff" : "#475569",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.18s ease",
                  boxShadow: isActive ? "0 4px 12px rgba(99,102,241,0.30)" : "none",
                }}
              >
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>{opt.label}</span>
                  <span style={{ marginLeft: "8px", fontSize: "11px", color: isActive ? "rgba(255,255,255,0.65)" : "#94a3b8" }}>
                    {opt.description}
                  </span>
                </div>
                <span
                  style={{
                    flexShrink: 0,
                    borderRadius: "999px",
                    padding: "1px 8px",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: isActive ? "rgba(255,255,255,0.18)" : "rgba(99,102,241,0.08)",
                    color: isActive ? "#ffffff" : "#4f46e5",
                    marginLeft: "8px",
                  }}
                >
                  {opt.cost} cr.
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fields */}
      <form onSubmit={handleSubmit((values) => onSubmit(values, selectedTask))} style={{ display: "flex", flexDirection: "column", gap: "14px" }} noValidate>
        <Field label="Nom de l'entreprise" error={errors.companyName?.message}>
          <input {...register("companyName")} style={inputStyle} placeholder="Translog France" />
        </Field>

        <Field label="Secteur" error={errors.sector?.message}>
          <input {...register("sector")} style={inputStyle} placeholder="Logistique" />
        </Field>

        <Field label="Ville" error={errors.city?.message}>
          <input {...register("city")} style={inputStyle} placeholder="Paris" />
        </Field>

        <Field label="Poste ciblé (optionnel)" error={errors.targetRole?.message}>
          <input {...register("targetRole")} style={inputStyle} placeholder="Directeur logistique" />
        </Field>

        <Field label="Contexte / notes (optionnel)" error={errors.context?.message}>
          <textarea
            {...register("context")}
            style={{ ...inputStyle, minHeight: "80px", resize: "none" }}
            placeholder="Signaux détectés, notes de prospection…"
          />
        </Field>

        <button
          type="submit"
          disabled={isLoading}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className="btn-shimmer"
          style={{
            marginTop: "4px",
            width: "100%",
            borderRadius: "12px",
            border: "none",
            padding: "12px 16px",
            fontWeight: 700,
            fontSize: "14px",
            color: "#ffffff",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.65 : 1,
            transition: "transform 0.15s, box-shadow 0.15s",
            transform: btnHover && !isLoading ? "translateY(-1px)" : "none",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            boxShadow: btnHover && !isLoading
              ? "0 8px 20px rgba(99,102,241,0.42)"
              : "0 4px 14px rgba(99,102,241,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            letterSpacing: "-0.01em",
          }}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                <path d="M22 12a10 10 0 0 0-10-10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Analyse IA en cours…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M12 2l2.4 7.4H22l-6.5 4.7 2.5 7.6L12 17.2l-6 4.5 2.5-7.6L2 9.4h7.6L12 2z" fill="rgba(255,255,255,0.92)" />
              </svg>
              Lancer l'analyse IA
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", marginBottom: "6px", fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </label>
      {children}
      {error ? <p style={{ marginTop: "4px", fontSize: "12px", color: "#ef4444" }}>{error}</p> : null}
    </div>
  );
}
