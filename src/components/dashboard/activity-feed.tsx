import { formatRelativeTime } from "@/lib/format";
import type { ActivityItem } from "@/types/dashboard";

const typeLabels: Record<ActivityItem["type"], string> = {
  search: "Recherche",
  export: "Export",
  ai: "IA",
  enrichment: "Enrichissement",
};

const typeColors: Record<ActivityItem["type"], string> = {
  search: "bg-blue-500/15 text-blue-300",
  export: "bg-violet-500/15 text-violet-300",
  ai: "bg-amber-500/15 text-amber-300",
  enrichment: "bg-emerald-500/15 text-emerald-300",
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <h3 className="text-xl font-semibold">Activité récente</h3>
      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">Aucune activité pour le moment.</p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[item.type]}`}
                    >
                      {typeLabels[item.type]}
                    </span>
                    <h4 className="font-medium">{item.title}</h4>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                </div>
                <time
                  className="shrink-0 text-xs text-slate-500"
                  dateTime={item.createdAt}
                >
                  {formatRelativeTime(item.createdAt)}
                </time>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
