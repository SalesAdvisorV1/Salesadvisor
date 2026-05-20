import type { CreditPack } from "@/types/billing";

export function CreditPackCard({ pack }: { pack: CreditPack }) {
  return (
    <div className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {pack.badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-gray-200 bg-white px-3 py-0.5 text-xs font-semibold text-gray-700 whitespace-nowrap shadow-sm">
          {pack.badge}
        </span>
      ) : null}

      <div className="text-3xl font-bold text-gray-900">{pack.credits}</div>
      <div className="mt-1 text-sm text-gray-500">crédits supplémentaires</div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-gray-900">{pack.price}€</span>
        <span className="text-gray-400 text-sm">
          · {(pack.price / pack.credits).toFixed(2)}€/crédit
        </span>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-xl bg-gray-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors"
      >
        Acheter ce pack
      </button>
    </div>
  );
}
