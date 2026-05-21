"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
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

  console.log('[credits] userId:', userId, 'amount:', taskCosts[task]);
  if (userId) {
    await fetch("/api/credits/decrement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount: taskCosts[task] }),
    });
  }

  return data;
}

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
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Assistance IA</h1>
        <p className="mt-1 text-sm text-gray-500 max-w-2xl">
          Génère un résumé prospect, un pitch personnalisé ou une préparation d'appel en quelques secondes.
        </p>
      </header>

      {insufficientCredits ? (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Crédits insuffisants ({remaining} restants) pour cette analyse ({taskCosts[selectedTask]} cr. requis).
        </div>
      ) : null}

      {mutation.isError ? (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
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

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">Résultat IA</h2>
            {mutation.data ? (
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                Généré
              </span>
            ) : null}
          </div>

          <div>
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
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl text-gray-400">
        ✦
      </div>
      <p className="mt-4 font-medium text-gray-700">
        Lance une analyse pour voir les résultats
      </p>
      <p className="mt-2 text-sm text-gray-400">
        Remplis le formulaire à gauche et choisis un type d'analyse.
      </p>
    </div>
  );
}

function AiLoadingState() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-20 rounded-xl bg-gray-100" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-32 rounded-xl bg-gray-100" />
        <div className="h-32 rounded-xl bg-gray-100" />
      </div>
      <div className="h-16 rounded-xl bg-gray-100" />
      <p className="text-center text-sm text-gray-400">Analyse IA en cours…</p>
    </div>
  );
}
