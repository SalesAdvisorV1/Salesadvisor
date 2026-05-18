import type { CreditPack } from "@/types/billing";

export function CreditPackCard({ pack }: { pack: CreditPack }) {
  return (
    <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      {pack.badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-semibold text-white">
          {pack.badge}
        </span>
      ) : null}

      <div className="text-3xl font-bold">{pack.credits}</div>
      <div className="mt-1 text-sm text-slate-400">crédits supplémentaires</div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-2xl font-semibold">{pack.price}€</span>
        <span className="text-slate-500 text-sm">
          · {(pack.price / pack.credits).toFixed(2)}€/crédit
        </span>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:border-blue-500/50 hover:bg-blue-500/5"
      >
        Acheter ce pack
      </button>
    </div>
  );
}
