"use client";

import { useQuery } from "@tanstack/react-query";
import { CreditPackCard } from "@/components/billing/credit-pack-card";
import { PlanCard } from "@/components/billing/plan-card";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { BillingData } from "@/types/billing";

async function fetchBilling(): Promise<BillingData> {
  const res = await fetch("/api/billing");
  if (!res.ok) throw new Error("Impossible de charger la facturation");
  return res.json();
}

export function BillingView() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["billing"],
    queryFn: fetchBilling,
    staleTime: 60_000,
  });

  const { remaining, total } = useCreditsStore();
  const percent = total > 0 ? Math.round((remaining / total) * 100) : 0;

  if (isLoading) {
    return <BillingSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-200">
          Impossible de charger la facturation
        </h2>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-2xl bg-slate-800 px-5 py-2.5 text-sm font-medium hover:bg-slate-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const renewalDate = new Date(data.renewalDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <p className="text-sm text-slate-400">Module 5</p>
        <h1 className="mt-1 text-3xl font-semibold">Crédits & Facturation</h1>
        <p className="mt-2 text-slate-400">
          Gère ton plan, recharge tes crédits et consulte ton historique de paiement.
        </p>
      </header>

      {/* Credits status */}
      <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Crédits disponibles</h2>
            <p className="text-sm text-slate-400">
              Renouvellement le {renewalDate}
            </p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold">{remaining}</span>
            <span className="ml-2 text-slate-500">/ {total}</span>
          </div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-white/70 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-right text-xs text-slate-500">{percent}% disponible</p>
      </div>

      {/* Plans */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Plans disponibles</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* Credit packs */}
      <section className="mt-10">
        <h2 className="mb-1 text-xl font-semibold">Packs de crédits supplémentaires</h2>
        <p className="mb-4 text-sm text-slate-400">
          Idéal si tu as besoin de crédits ponctuellement sans changer de plan.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.creditPacks.map((pack) => (
            <CreditPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-slate-600">
        MVP : paiement non intégré. Branchement Stripe prévu dans la prochaine version.
      </p>
    </div>
  );
}

function BillingSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-8">
      <div className="h-24 rounded-3xl bg-slate-800/60" />
      <div className="h-40 rounded-3xl bg-slate-800/60" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-3xl bg-slate-800/60" />
        ))}
      </div>
    </div>
  );
}
