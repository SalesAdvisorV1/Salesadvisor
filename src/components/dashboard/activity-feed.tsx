import { formatRelativeTime } from "@/lib/format";
import type { ActivityItem } from "@/types/dashboard";

const typeLabels: Record<ActivityItem["type"], string> = {
  search: "Recherche",
  export: "Export",
  ai: "IA",
  enrichment: "Enrichissement",
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Activité récente</h3>
      <div className="space-y-1">
        {items.length === 0 ? (
          <p className="text-xs text-[#555] py-4 text-center">Aucune activité pour le moment.</p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="flex gap-3 p-3 rounded-xl hover:bg-[#161616] transition-all duration-150 border border-transparent hover:border-[#1e1e1e]"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="bg-[#1e1e1e] text-[#888] text-[10px] px-2.5 py-1 rounded-full">
                    {typeLabels[item.type]}
                  </span>
                  <h4 className="text-sm font-medium text-white">{item.title}</h4>
                </div>
                <p className="text-xs text-[#555]">{item.description}</p>
              </div>
              <time
                className="shrink-0 text-[10px] text-[#333] ml-auto pt-0.5"
                dateTime={item.createdAt}
              >
                {formatRelativeTime(item.createdAt)}
              </time>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
