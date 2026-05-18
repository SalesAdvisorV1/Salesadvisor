import type { ProspectResult } from "@/types/prospect";

export function ProspectResultCard({ prospect }: { prospect: ProspectResult }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-medium">{prospect.name}</h4>
          <p className="mt-1 text-sm text-slate-400">
            {prospect.sector} · {prospect.city}, {prospect.country}
          </p>
          {prospect.website ? (
            <p className="mt-1 text-xs text-slate-500">{prospect.website}</p>
          ) : null}
        </div>
        <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-semibold text-blue-300">
          {prospect.score}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{prospect.reason}</p>
    </article>
  );
}
