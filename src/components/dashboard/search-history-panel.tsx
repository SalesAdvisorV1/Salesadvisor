import Link from "next/link";
import { formatRelativeTime, formatSearchLabel } from "@/lib/format";
import type { SearchHistoryItem } from "@/types/dashboard";

interface SearchHistoryPanelProps {
  items?: SearchHistoryItem[];
  searches?: SearchHistoryItem[];
}

export function SearchHistoryPanel({ items, searches }: SearchHistoryPanelProps) {
  const list = items ?? searches ?? [];

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(99,102,241,0.10)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: '#0f172a' }}>Historique des recherches</h3>
        <Link
          href="/history"
          className="text-xs font-medium transition-colors"
          style={{ color: '#94a3b8' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#4f46e5'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8'; }}
        >
          Tout voir →
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="text-xs py-4 text-center" style={{ color: '#94a3b8' }}>Aucune recherche enregistrée.</p>
      ) : (
        <div className="space-y-0.5">
          {list.map((item) => (
            <Link
              key={item.id}
              href={`/history?id=${item.id}`}
              className="flex items-center justify-between px-2.5 py-2.5 rounded-xl transition-colors group"
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(99,102,241,0.05)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.10)',
                    color: '#4f46e5',
                  }}
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold truncate" style={{ color: '#0f172a' }}>
                    {formatSearchLabel(item.sector, item.city)}
                  </p>
                  <p className="text-xs mt-0.5 tabular-nums" style={{ color: '#94a3b8' }}>
                    {formatRelativeTime(item.createdAt)} · score {item.averageScore}
                  </p>
                </div>
              </div>

              <span
                className="shrink-0 ml-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full tabular-nums"
                style={{ background: '#0f172a', color: '#ffffff' }}
              >
                {item.prospectCount}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
