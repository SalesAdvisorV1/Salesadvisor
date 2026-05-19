import { formatRelativeTime } from "@/lib/format";
import type { ActivityItem } from "@/types/dashboard";

const TYPE_CONFIG: Record<ActivityItem["type"], { label: string; dot: string }> = {
  search:      { label: "Recherche",      dot: "bg-blue-500" },
  export:      { label: "Export",         dot: "bg-green-500" },
  ai:          { label: "IA",             dot: "bg-purple-500" },
  enrichment:  { label: "Enrichissement", dot: "bg-orange-500" },
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
      <h3 className="text-[13px] font-semibold text-white mb-4">Activité récente</h3>

      {items.length === 0 ? (
        <p className="text-xs text-[#444] text-center py-6">Aucune activité pour le moment.</p>
      ) : (
        <div className="space-y-0.5">
          {items.map((item) => {
            const config = TYPE_CONFIG[item.type];
            return (
              <article
                key={item.id}
                className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-[#161616] transition-colors cursor-default"
              >
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${config.dot}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] text-[#555] font-medium">{config.label}</span>
                    <h4 className="text-[13px] text-white truncate">{item.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#444] truncate">{item.description}</p>
                </div>
                <time className="shrink-0 text-[10px] text-[#333] pt-0.5 tabular-nums" dateTime={item.createdAt}>
                  {formatRelativeTime(item.createdAt)}
                </time>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
