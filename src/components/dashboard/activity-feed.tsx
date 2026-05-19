import { formatRelativeTime } from "@/lib/format";
import type { ActivityItem } from "@/types/dashboard";

const TYPE_CONFIG: Record<ActivityItem["type"], { label: string; dot: string }> = {
  search:      { label: "Recherche",      dot: "bg-blue-500" },
  export:      { label: "Export",         dot: "bg-green-500" },
  ai:          { label: "IA",             dot: "bg-violet-500" },
  enrichment:  { label: "Enrichissement", dot: "bg-orange-500" },
};

interface ActivityFeedProps {
  items?: ActivityItem[];
  activities?: ActivityItem[];
}

export function ActivityFeed({ items, activities }: ActivityFeedProps) {
  const list = items ?? activities ?? [];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-gray-900">Activité récente</h3>
        {list.length > 0 && (
          <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded-full tabular-nums">
            {list.length}
          </span>
        )}
      </div>

      {list.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-6">Aucune activité pour le moment.</p>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-100" />
          <div className="space-y-1">
            {list.map((item) => {
              const config = TYPE_CONFIG[item.type];
              return (
                <article
                  key={item.id}
                  className="flex items-start gap-3 pl-5 pr-2 py-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-default relative"
                >
                  <div className={`absolute left-[3px] top-[14px] w-3 h-3 rounded-full border-2 border-white ${config.dot}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{config.label}</span>
                      <h4 className="text-[13px] text-gray-800 font-medium truncate">{item.title}</h4>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{item.description}</p>
                  </div>
                  <time className="shrink-0 text-[10px] text-gray-400 pt-0.5 tabular-nums" dateTime={item.createdAt}>
                    {formatRelativeTime(item.createdAt)}
                  </time>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
