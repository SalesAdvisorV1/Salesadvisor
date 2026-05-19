import { formatRelativeTime } from "@/lib/format";
import type { HistoryEntry } from "@/types/history";

interface HistoryTableProps {
  entries: HistoryEntry[];
  selectedId: string | null;
  onSelect: (entry: HistoryEntry) => void;
}

export function HistoryTable({ entries, selectedId, onSelect }: HistoryTableProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold">Recherches passées</h2>

      <div className="mt-6 space-y-3">
        {entries.length === 0 ? (
          <p className="text-sm text-slate-500">Aucune recherche enregistrée.</p>
        ) : (
          entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect(entry)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                selectedId === entry.id
                  ? "border-white/20 bg-white/10"
                  : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-medium text-white">
                    {entry.sector} / {entry.city}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span>{entry.radius}</span>
                    {entry.companySize ? <span>· {entry.companySize}</span> : null}
                    {entry.targetRole ? <span>· {entry.targetRole}</span> : null}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {formatRelativeTime(entry.createdAt)}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-sm font-semibold text-white">
                    {entry.prospectCount}
                  </div>
                  <div className="text-xs text-slate-500">prospects</div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    score {entry.averageScore}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
