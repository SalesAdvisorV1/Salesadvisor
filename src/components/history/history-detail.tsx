import Link from "next/link";
import { formatRelativeTime } from "@/lib/format";
import type { HistoryEntry } from "@/types/history";

function getScoreStyle(score: number) {
  if (score >= 70) return "bg-green-50 text-green-700 border-green-200";
  if (score >= 50) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-600 border-red-200";
}

export function HistoryDetail({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-bold text-gray-900">
              {entry.sector} · {entry.city}
            </h4>
            <p className="mt-0.5 text-xs text-gray-400">
              {formatRelativeTime(entry.createdAt)}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-xl font-bold text-gray-900">{entry.prospectCount}</div>
            <div className="text-[10px] text-gray-400">prospects</div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Tag label={entry.radius} />
          <Tag label={entry.country} />
          {entry.companySize ? <Tag label={entry.companySize} /> : null}
          {entry.targetRole ? <Tag label={entry.targetRole} /> : null}
        </div>
        {entry.keywords ? (
          <p className="mt-2 text-xs text-gray-500 italic">Mots-clés : {entry.keywords}</p>
        ) : null}
        <p className="mt-2 text-xs text-gray-400">
          Score moyen : <span className="font-semibold text-gray-600">{entry.averageScore}</span>
        </p>
      </div>

      <div className="space-y-2.5">
        <p className="text-sm font-semibold text-gray-700">
          {entry.prospectCount} prospect{entry.prospectCount > 1 ? "s" : ""} trouvé{entry.prospectCount > 1 ? "s" : ""}
        </p>
        {entry.prospects.map((prospect) => (
          <article key={prospect.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h5 className="font-semibold text-gray-900 truncate">{prospect.name}</h5>
                <p className="mt-0.5 text-sm text-gray-500">
                  {prospect.sector} · {prospect.city}, {prospect.country}
                </p>
                {prospect.website ? (
                  <a
                    href={prospect.website.startsWith("http") ? prospect.website : `https://${prospect.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 text-xs text-blue-500 hover:text-blue-700 hover:underline block truncate"
                  >
                    {prospect.website}
                  </a>
                ) : null}
              </div>
              <span className={`shrink-0 rounded-full border px-3 py-1 text-sm font-bold ${getScoreStyle(prospect.score)}`}>
                {prospect.score}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-gray-500 border-t border-gray-50 pt-2">{prospect.reason}</p>
          </article>
        ))}
      </div>

      <Link
        href={`/prospect-finder?sector=${encodeURIComponent(entry.sector)}&city=${encodeURIComponent(entry.city)}&radius=${encodeURIComponent(entry.radius)}`}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-white px-4 py-3 text-sm font-medium hover:bg-gray-800 transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        Relancer une recherche similaire
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-600">
      {label}
    </span>
  );
}
