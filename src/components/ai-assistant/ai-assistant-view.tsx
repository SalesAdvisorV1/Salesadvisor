"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiResultCard } from "@/components/ai-assistant/ai-result-card";
import { ProspectInputForm } from "@/components/ai-assistant/prospect-input-form";
import type { AiProspectFormValues } from "@/lib/schemas/ai-assist";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { AiAssistResponse, AiTaskType } from "@/types/ai-assistant";

const taskCosts: Record<AiTaskType, number> = {
  summary: 1,
  pitch: 3,
  "call-prep": 2,
};

async function runAiAssist(
  task: AiTaskType,
  prospect: AiProspectFormValues,
): Promise<AiAssistResponse> {
  const res = await fetch("/api/ai-assist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, prospect }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Analyse impossible");
  }

  return res.json();
}

export function AiAssistantView() {
  const [selectedTask, setSelectedTask] = useState<AiTaskType>("summary");
  const { remaining, consume, initialized } = useCreditsStore();

  const mutation = useMutation({
    mutationFn: ({ task, prospect }: { task: AiTaskType; prospect: AiProspectFormValues }) =>
      runAiAssist(task, prospect),
    onSuccess: (_data, variables) => {
      consume(taskCosts[variables.task]);
    },
  });

  const handleSubmit = (values: AiProspectFormValues, task: AiTaskType) => {
    const cost = taskCosts[task];
    if (initialized && remaining < cost) return;
    mutation.mutate({ task, prospect: values });
  };

  const insufficientCredits =
    initialized && remaining < taskCosts[selectedTask];

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-500">Module 3</p>
        <h1 className="mt-1 text-3xl font-semibold">Assistance IA</h1>
        <p className="mt-2 max-w-3xl text-slate-400">
          Génère un résumé prospect, un pitch personnalisé ou une préparation
          d'appel en quelques secondes.
        </p>
      </header>

      {insufficientCredits ? (
        <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Crédits insuffisants ({remaining} restants) pour cette analyse (
          {taskCosts[selectedTask]} cr. requis).
        </div>
      ) : null}

      {mutation.isError ? (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {(mutation.error as Error).message}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <ProspectInputForm
          onSubmit={handleSubmit}
          isLoading={mutation.isPending}
          selectedTask={selectedTask}
          onTaskChange={setSelectedTask}
        />

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Résultat IA</h2>
            {mutation.data ? (
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                Généré
              </span>
            ) : null}
          </div>

          <div className="mt-6">
            {mutation.isPending ? (
              <AiLoadingState />
            ) : mutation.data ? (
              <AiResultCard response={mutation.data} />
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
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
        ✦
      </div>
      <p className="mt-4 font-medium text-slate-300">
        Lance une analyse pour voir les résultats
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Remplis le formulaire à gauche et choisis un type d'analyse.
      </p>
    </div>
  );
}

function AiLoadingState() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-20 rounded-2xl bg-slate-800/60" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-32 rounded-2xl bg-slate-800/60" />
        <div className="h-32 rounded-2xl bg-slate-800/60" />
      </div>
      <div className="h-16 rounded-2xl bg-slate-800/60" />
      <p className="text-center text-sm text-slate-500">Analyse IA en cours…</p>
    </div>
  );
}
