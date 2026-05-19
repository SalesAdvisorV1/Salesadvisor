import Link from "next/link";
import { formatRelativeTime, formatSearchLabel } from "@/lib/format";
import type { SearchHistoryItem } from "@/types/dashboard";

export function SearchHistoryPanel({ items }: { items: SearchHistoryItem[] }) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Historique des recherches</h3>
        <Link
          href="/history"
          className="text-xs text-[#555] hover:text-white transition-colors"
        >
          Tout voir
        </Link>
      </div>

      <div>
        {items.length === 0 ? (
          <p className="text-xs text-[#555]">Aucune recherche enregistrée.</p>
        ) : (
          items.map((item) => (
            <Link
              key={item.id}
              href={`/history?id=${item.id}`}
              className="flex justify-between py-3 border-b border-[#1a1a1a] last:border-0 hover:bg-[#161616] rounded-lg px-2 transition-all cursor-pointer"
            >
              <div>
                <div className="text-sm font-medium text-white">
                  {formatSearchLabel(item.sector, item.city)}
                </div>
                <div className="text-xs text-[#555] mt-0.5">
                  {formatRelativeTime(item.createdAt)} · score {item.averageScore}
                </div>
              </div>
              <div className="flex items-center">
                <span className="bg-[#1e1e1e] text-[#888] text-xs px-2 py-0.5 rounded-full">
                  {item.prospectCount}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
