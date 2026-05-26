import { formatRelativeTime } from "@/lib/format";
import type { ActivityItem } from "@/types/dashboard";

// Monochrome indigo dots — same hue family, subtle variation per type
const TYPE_CONFIG: Record<ActivityItem["type"], { label: string; bg: string; iconColor: string; icon: React.ReactNode }> = {
  search: {
    label: "Recherche",
    bg: 'rgba(99,102,241,0.14)',
    iconColor: '#4f46e5',
    icon: (
      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  export: {
    label: "Export",
    bg: 'rgba(99,102,241,0.10)',
    iconColor: '#6366f1',
    icon: (
      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" />
        <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" />
      </svg>
    ),
  },
  ai: {
    label: "IA",
    bg: 'rgba(139,92,246,0.14)',
    iconColor: '#7c3aed',
    icon: (
      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
        <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  enrichment: {
    label: "Enrichissement",
    bg: 'rgba(139,92,246,0.10)',
    iconColor: '#8b5cf6',
    icon: (
      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
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
    <div
      className="rounded-2xl p-5 transition-shadow duration-200"
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(99,102,241,0.10)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: '#0f172a' }}>Activité récente</h3>
        {list.length > 0 && (
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums"
            style={{ background: 'rgba(99,102,241,0.08)', color: '#4f46e5' }}
          >
            {list.length}
          </span>
        )}
      </div>

      {list.length === 0 ? (
        <p className="text-xs text-center py-6" style={{ color: '#94a3b8' }}>Aucune activité pour le moment.</p>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-[14px] top-3 bottom-3 w-px"
            style={{ background: 'rgba(99,102,241,0.12)' }}
          />
          <div className="space-y-0.5">
            {list.map((item) => {
              const config = TYPE_CONFIG[item.type];
              return (
                <article
                  key={item.id}
                  className="flex items-start gap-3 pl-9 pr-2 py-2.5 rounded-xl transition-colors duration-150 cursor-default relative"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.04)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <div
                    className="absolute left-[5px] top-[10px] w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: config.bg,
                      border: '2px solid rgba(255,255,255,0.95)',
                      boxShadow: '0 0 0 1px rgba(99,102,241,0.10)',
                      color: config.iconColor,
                    }}
                  >
                    {config.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: '#94a3b8', letterSpacing: '0.04em' }}
                      >
                        {config.label}
                      </span>
                      <h4 className="text-[13px] font-medium truncate" style={{ color: '#0f172a' }}>{item.title}</h4>
                    </div>
                    <p className="text-xs truncate" style={{ color: '#94a3b8' }}>{item.description}</p>
                  </div>
                  <time
                    className="shrink-0 text-[10px] pt-0.5 tabular-nums"
                    style={{ color: '#94a3b8' }}
                    dateTime={item.createdAt}
                  >
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
