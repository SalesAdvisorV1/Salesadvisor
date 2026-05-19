import Link from "next/link";
import { formatRelativeTime, formatSearchLabel } from "@/lib/format";
import type { SearchHistoryItem } from "@/types/dashboard";

export function SearchHistoryPanel({ items }: { items: SearchHistoryItem[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-white">Historique des recherches</h3>
        <Link href="/history" className="text-[11px] text-[#444] hover:text-white transition-colors">
          Tout voir →
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-[#444] py-4 text-center">Aucune recherche enregistrée.</p>
      ) : (
        <div className="space-y-0.5">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/history?id=${item.id}`}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#161616] transition-colors group"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-white truncate">
                  {formatSearchLabel(item.sector, item.city)}
                </p>
                <p className="text-[11px] text-[#444] mt-0.5 tabular-nums">
                  {formatRelativeTime(item.createdAt)} · score {item.averageScore}
                </p>
              </div>

              <span className="shrink-0 ml-3 bg-[#1e1e1e] text-[#666] text-[11px] font-medium px-2.5 py-0.5 rounded-full tabular-nums">
                {item.prospectCount}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
