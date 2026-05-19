import Link from "next/link";
import { formatRelativeTime } from "@/lib/format";
import type { HistoryEntry } from "@/types/history";

export function HistoryDetail({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <h4 className="font-semibold text-white">
          {entry.sector} / {entry.city}
        </h4>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <Tag label={entry.radius} />
          <Tag label={entry.country} />
          {entry.companySize ? <Tag label={entry.companySize} /> : null}
          {entry.targetRole ? <Tag label={entry.targetRole} /> : null}
        </div>
        {entry.keywords ? (
          <p className="mt-2 text-xs text-slate-500">
            Mots-clés : {entry.keywords}
          </p>
        ) : null}
        <p className="mt-2 text-xs text-slate-500">
          {formatRelativeTime(entry.createdAt)} · {entry.prospectCount} prospects ·
          score moyen {entry.averageScore}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-400">Prospects trouvés</p>
        {entry.prospects.map((prospect) => (
          <article
            key={prospect.id}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h5 className="font-medium text-white">{prospect.name}</h5>
                <p className="mt-1 text-sm text-slate-400">
                  {prospect.sector} · {prospect.city}, {prospect.country}
                </p>
                {prospect.website ? (
                  <p className="mt-0.5 text-xs text-slate-500">{prospect.website}</p>
                ) : null}
              </div>
              <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-semibold text-white">
                {prospect.score}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{prospect.reason}</p>
          </article>
        ))}
      </div>

      <Link
        href="/prospect-finder"
        className="flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-900"
      >
        Relancer une recherche similaire →
      </Link>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-slate-400">
      {label}
    </span>
  );
}
