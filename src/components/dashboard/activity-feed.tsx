import { formatRelativeTime } from "@/lib/format";
import type { ActivityItem } from "@/types/dashboard";

const TYPE_CONFIG: Record<ActivityItem["type"], { label: string; dot: string; icon: React.ReactNode }> = {
  search: {
    label: "Recherche",
    dot: "bg-blue-500",
    icon: (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  export: {
    label: "Export",
    dot: "bg-green-500",
    icon: (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" />
        <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" />
      </svg>
    ),
  },
  ai: {
    label: "IA",
    dot: "bg-violet-500",
    icon: (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
        <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  enrichment: {
    label: "Enrichissement",
    dot: "bg-orange-500",
    icon: (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" strokeLinecap="round" />
      </svg>
    ),
  },
};

interface ActivityFeedProps {
  items?: ActivityItem[];
  activities?: ActivityItem[];
}

export function ActivityFeed({ items, activities }: ActivityFeedProps) {
  const list = items ?? activities ?? [];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
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
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gray-100" />
          <div className="space-y-0.5">
            {list.map((item) => {
              const config = TYPE_CONFIG[item.type];
              return (
                <article
                  key={item.id}
                  className="flex items-start gap-3 pl-7 pr-2 py-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-150 cursor-default relative"
                >
                  <div className={`absolute left-[3px] top-[12px] w-[18px] h-[18px] rounded-full border-2 border-white ${config.dot} flex items-center justify-center shrink-0`}>
                    {config.icon}
                  </div>
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
