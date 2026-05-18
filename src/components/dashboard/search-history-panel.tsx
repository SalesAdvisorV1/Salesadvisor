import Link from "next/link";
import { formatRelativeTime, formatSearchLabel } from "@/lib/format";
import type { SearchHistoryItem } from "@/types/dashboard";

export function SearchHistoryPanel({ items }: { items: SearchHistoryItem[] }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Historique des recherches</h3>
        <Link
          href="/history"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          Tout voir
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">Aucune recherche enregistrée.</p>
        ) : (
          items.map((item) => (
            <Link
              key={item.id}
              href={`/history?id=${item.id}`}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 transition-colors hover:border-slate-700 hover:bg-slate-900"
            >
              <div>
                <div className="font-medium">
                  {formatSearchLabel(item.sector, item.city)}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {formatRelativeTime(item.createdAt)} · score{" "}
                  {item.averageScore}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-300">
                  {item.prospectCount}
                </div>
                <div className="text-xs text-slate-500">prospects</div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
