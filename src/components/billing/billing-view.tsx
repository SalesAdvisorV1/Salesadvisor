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
      <div className="mx-auto max-w-lg rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Impossible de charger la facturation
        </h2>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
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
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Crédits & Facturation</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gère ton plan, recharge tes crédits et consulte ton historique de paiement.
        </p>
      </header>

      {/* Credits status */}
      <div className="mb-7 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Crédits disponibles</h2>
            <p className="text-sm text-gray-500">Renouvellement le {renewalDate}</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold text-gray-900">{remaining}</span>
            <span className="ml-2 text-gray-400">/ {total}</span>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gray-900 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-right text-xs text-gray-400">{percent}% disponible</p>
      </div>

      {/* Plans */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Plans disponibles</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* Credit packs */}
      <section className="mt-10">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">Packs de crédits supplémentaires</h2>
        <p className="mb-4 text-sm text-gray-500">
          Idéal si tu as besoin de crédits ponctuellement sans changer de plan.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.creditPacks.map((pack) => (
            <CreditPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-gray-400">
        MVP : paiement non intégré. Branchement Stripe prévu dans la prochaine version.
      </p>
    </div>
  );
}

function BillingSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-6">
      <div className="h-20 rounded-xl bg-gray-100" />
      <div className="h-36 rounded-xl bg-gray-100" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-56 rounded-xl bg-gray-100" />
        ))}
      </div>
    </div>
  );
}
