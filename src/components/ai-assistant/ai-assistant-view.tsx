"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { AiResultCard } from "@/components/ai-assistant/ai-result-card";
import { ProspectInputForm } from "@/components/ai-assistant/prospect-input-form";
import type { AiProspectFormValues } from "@/lib/schemas/ai-assist";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { AiAssistResponse, AiTaskType } from "@/types/ai-assistant";
import { createClient } from "@/lib/supabase/client";

const taskCosts: Record<AiTaskType, number> = {
  summary: 1,
  pitch: 3,
  "call-prep": 2,
};

async function runAiAssist(task: AiTaskType, prospect: AiProspectFormValues, userId: string | null): Promise<AiAssistResponse> {
  const res = await fetch("/api/ai-assist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, prospect, userId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Analyse impossible");
  }

  const data = await res.json();

  if (userId) {
    await fetch("/api/credits/decrement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount: taskCosts[task] }),
    });
  }

  return data;
}

const resultCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.78)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(99,102,241,0.12)",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
  padding: "24px",
};

export function AiAssistantView() {
  const [selectedTask, setSelectedTask] = useState<AiTaskType>("summary");
  const [userId, setUserId] = useState<string | null>(null);
  const { remaining, consume, initialized } = useCreditsStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id || null));
  }, []);

  const prefill: Partial<AiProspectFormValues> = {
    companyName: searchParams.get("company") ?? undefined,
    sector: searchParams.get("sector") ?? undefined,
    city: searchParams.get("city") ?? undefined,
  };

  const mutation = useMutation({
    mutationFn: ({ task, prospect }: { task: AiTaskType; prospect: AiProspectFormValues }) =>
      runAiAssist(task, prospect, userId),
    onSuccess: (_data, variables) => {
      consume(taskCosts[variables.task]);
    },
  });

  const handleSubmit = (values: AiProspectFormValues, task: AiTaskType) => {
    const cost = taskCosts[task];
    if (initialized && remaining < cost) return;
    mutation.mutate({ task, prospect: values });
  };

  const insufficientCredits = initialized && remaining < taskCosts[selectedTask];

  return (
    <div className="mx-auto max-w-7xl">
      <motion.header
        className="mb-6 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold" style={{ color: "#0f172a" }}>Assistance IA</h1>
        <p className="mt-1 text-sm max-w-2xl" style={{ color: "#64748b" }}>
          Génère un résumé prospect, un pitch personnalisé ou une préparation d'appel en quelques secondes.
        </p>
      </motion.header>

      {insufficientCredits ? (
        <div
          className="mb-5 rounded-xl px-4 py-3 text-sm"
          style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.22)", color: "#b45309" }}
        >
          Crédits insuffisants ({remaining} restants) pour cette analyse ({taskCosts[selectedTask]} cr. requis).
        </div>
      ) : null}

      {mutation.isError ? (
        <div
          className="mb-5 rounded-xl px-4 py-3 text-sm"
          style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.22)", color: "#dc2626" }}
        >
          {(mutation.error as Error).message}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <ProspectInputForm
          onSubmit={handleSubmit}
          isLoading={mutation.isPending}
          selectedTask={selectedTask}
          onTaskChange={setSelectedTask}
          defaultValues={prefill}
        />

        <div style={resultCardStyle}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold" style={{ color: "#0f172a" }}>Résultat IA</h2>
            {mutation.data ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.18)",
                  borderRadius: "999px",
                  padding: "3px 10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#4f46e5",
                }}
              >
                ✓ Généré
              </motion.span>
            ) : null}
          </div>

          <div>
            {mutation.isPending ? (
              <AiLoadingState />
            ) : mutation.data ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AiResultCard response={mutation.data} />
              </motion.div>
            ) : (
              <AiEmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AiEmptyState() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 0", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "64px",
          height: "64px",
          borderRadius: "18px",
          background: "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.12)",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l2.4 7.4H22l-6.5 4.7 2.5 7.6L12 17.2l-6 4.5 2.5-7.6L2 9.4h7.6L12 2z" fill="#6366f1" />
        </svg>
      </div>
      <p className="mt-4 font-medium" style={{ color: "#0f172a" }}>
        Lance une analyse pour voir les résultats
      </p>
      <p className="mt-2 text-sm" style={{ color: "#64748b" }}>
        Remplis le formulaire à gauche et choisis un type d'analyse.
      </p>
    </div>
  );
}

function AiLoadingState() {
  return (
    <div className="space-y-3">
      <div
        className="animate-pulse"
        style={{ borderRadius: "12px", border: "1px solid rgba(99,102,241,0.08)", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <div style={{ height: "18px", width: "70%", background: "rgba(99,102,241,0.12)", borderRadius: "6px" }} />
        <div style={{ height: "13px", width: "100%", background: "rgba(99,102,241,0.07)", borderRadius: "6px" }} />
        <div style={{ height: "13px", width: "85%", background: "rgba(99,102,241,0.07)", borderRadius: "6px" }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div
          className="animate-pulse"
          style={{ borderRadius: "12px", background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.10)", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <div style={{ height: "13px", width: "80px", background: "rgba(99,102,241,0.15)", borderRadius: "6px" }} />
          <div style={{ height: "12px", width: "100%", background: "rgba(99,102,241,0.08)", borderRadius: "6px" }} />
          <div style={{ height: "12px", width: "85%", background: "rgba(99,102,241,0.08)", borderRadius: "6px" }} />
        </div>
        <div
          className="animate-pulse"
          style={{ borderRadius: "12px", background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.10)", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <div style={{ height: "13px", width: "80px", background: "rgba(139,92,246,0.15)", borderRadius: "6px" }} />
          <div style={{ height: "12px", width: "100%", background: "rgba(139,92,246,0.08)", borderRadius: "6px" }} />
          <div style={{ height: "12px", width: "85%", background: "rgba(139,92,246,0.08)", borderRadius: "6px" }} />
        </div>
      </div>
      <div className="animate-pulse" style={{ borderRadius: "12px", background: "rgba(99,102,241,0.06)", height: "48px" }} />
      <p style={{ textAlign: "center", fontSize: "13px", color: "#64748b" }}>Analyse IA en cours…</p>
    </div>
  );
}
