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
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-gray-900">Historique des recherches</h3>
        <Link href="/history" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
          Tout voir →
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="text-xs text-gray-400 py-4 text-center">Aucune recherche enregistrée.</p>
      ) : (
        <div className="space-y-1">
          {list.map((item) => (
            <Link
              key={item.id}
              href={`/history?id=${item.id}`}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Sector icon */}
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-gray-500">
                    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-gray-900 truncate">
                    {formatSearchLabel(item.sector, item.city)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 tabular-nums">
                    {formatRelativeTime(item.createdAt)} · score {item.averageScore}
                  </p>
                </div>
              </div>

              <span className="shrink-0 ml-3 bg-gray-900 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full tabular-nums">
                {item.prospectCount}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
