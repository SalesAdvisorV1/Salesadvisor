import Link from "next/link";
import { formatRelativeTime } from "@/lib/format";
import type { HistoryEntry } from "@/types/history";

export function HistoryDetail({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900">
          {entry.sector} / {entry.city}
        </h4>
        <div className="mt-2 flex flex-wrap gap-2">
          <Tag label={entry.radius} />
          <Tag label={entry.country} />
          {entry.companySize ? <Tag label={entry.companySize} /> : null}
          {entry.targetRole ? <Tag label={entry.targetRole} /> : null}
        </div>
        {entry.keywords ? (
          <p className="mt-2 text-xs text-gray-500">Mots-clés : {entry.keywords}</p>
        ) : null}
        <p className="mt-2 text-xs text-gray-400">
          {formatRelativeTime(entry.createdAt)} · {entry.prospectCount} prospects · score moyen {entry.averageScore}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Prospects trouvés</p>
        {entry.prospects.map((prospect) => (
          <article key={prospect.id} className="bg-gray-50 rounded-xl border border-gray-100 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h5 className="font-medium text-gray-900">{prospect.name}</h5>
                <p className="mt-1 text-sm text-gray-500">
                  {prospect.sector} · {prospect.city}, {prospect.country}
                </p>
                {prospect.website ? (
                  <p className="mt-0.5 text-xs text-gray-400">{prospect.website}</p>
                ) : null}
              </div>
              <span className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-semibold text-gray-700">
                {prospect.score}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-gray-500">{prospect.reason}</p>
          </article>
        ))}
      </div>

      <Link
        href="/prospect-finder"
        className="flex w-full items-center justify-center rounded-xl bg-gray-900 text-white px-4 py-3 text-sm font-medium hover:bg-gray-800 transition-all"
      >
        Relancer une recherche similaire →
      </Link>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs text-gray-600">
      {label}
    </span>
  );
}
