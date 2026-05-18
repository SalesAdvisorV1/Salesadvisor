import type { Plan } from "@/types/billing";

export function PlanCard({ plan }: { plan: Plan }) {
  const isHighlighted = plan.highlighted;

  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-6 ${
        isHighlighted
          ? "border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-slate-900/60"
          : "border-slate-800 bg-slate-900/60"
      }`}
    >
      {isHighlighted ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-0.5 text-xs font-semibold text-white">
          Plan actuel
        </span>
      ) : null}

      {plan.current && !isHighlighted ? (
        <span className="mb-2 inline-block rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-400">
          Actuel
        </span>
      ) : null}

      <div className="text-lg font-semibold">{plan.name}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-bold">{plan.price}€</span>
        <span className="text-slate-500">/{plan.period === "month" ? "mois" : "an"}</span>
      </div>
      <div className="mt-1 text-sm text-blue-300">{plan.credits} crédits / mois</div>

      <ul className="mt-6 flex-1 space-y-2">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="mt-0.5 text-emerald-400">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={plan.current}
        className={`mt-6 w-full rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors ${
          plan.current
            ? "cursor-default bg-slate-800 text-slate-500"
            : isHighlighted
              ? "bg-blue-500 text-white hover:bg-blue-400"
              : "border border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-900"
        }`}
      >
        {plan.current ? "Plan actuel" : "Choisir ce plan"}
      </button>
    </div>
  );
}
