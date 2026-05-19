import Link from "next/link";
import type { PriorityProspect } from "@/types/dashboard";

export function PriorityProspects({ items }: { items: PriorityProspect[] }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Prospects prioritaires</h3>
        <Link
          href="/prospect-finder"
          className="text-sm font-medium text-slate-400 hover:text-slate-300"
        >
          Explorer
        </Link>
      </div>
      <div className="mt-6 space-y-4">
        {items.map((prospect) => (
          <article
            key={prospect.id}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="font-medium">{prospect.name}</h4>
                <p className="text-sm text-slate-400">
                  {prospect.sector} · {prospect.city}
                </p>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-semibold text-white">
                {prospect.score}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
