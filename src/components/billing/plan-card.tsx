import type { Plan } from "@/types/billing";

export function PlanCard({ plan }: { plan: Plan }) {
  const isHighlighted = plan.highlighted;

  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 ${
        isHighlighted
          ? "border-transparent text-white shadow-lg shadow-indigo-500/30"
          : "border-gray-200 bg-white text-gray-900"
      }`}
      style={
        isHighlighted
          ? { background: 'linear-gradient(150deg, #6366f1 0%, #7c5cf6 55%, #8b5cf6 100%)' }
          : undefined
      }
    >
      {isHighlighted ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white text-indigo-600 px-3 py-0.5 text-xs font-bold whitespace-nowrap shadow-sm">
          Plan actuel
        </span>
      ) : null}

      {plan.current && !isHighlighted ? (
        <span className="mb-2 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
          Actuel
        </span>
      ) : null}

      <div className={`text-lg font-bold ${isHighlighted ? 'text-white' : 'text-gray-900'}`}>{plan.name}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={`text-3xl font-bold ${isHighlighted ? 'text-white' : 'text-gray-900'}`}>
          {plan.price}€
        </span>
        <span className={isHighlighted ? 'text-white/50' : 'text-gray-400'}>
          /{plan.period === "month" ? "mois" : "an"}
        </span>
      </div>
      <div className={`mt-1 text-sm ${isHighlighted ? 'text-white/70' : 'text-gray-500'}`}>
        {plan.credits} crédits / mois
      </div>

      <ul className="mt-6 flex-1 space-y-2">
        {plan.features.map((feature, i) => (
          <li key={i} className={`flex items-start gap-2 text-sm ${isHighlighted ? 'text-white/85' : 'text-gray-600'}`}>
            <span className={`mt-0.5 text-xs font-bold ${isHighlighted ? 'text-white' : 'text-indigo-500'}`}>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={plan.current}
        className={`mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
          plan.current
            ? "cursor-default bg-gray-100 text-gray-400"
            : isHighlighted
              ? "bg-white text-indigo-600 hover:bg-indigo-50"
              : "sa-btn-primary"
        }`}
      >
        {plan.current ? "Plan actuel" : "Choisir ce plan"}
      </button>
    </div>
  );
}
