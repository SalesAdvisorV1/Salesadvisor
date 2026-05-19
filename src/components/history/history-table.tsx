import { formatRelativeTime } from "@/lib/format";
import type { HistoryEntry } from "@/types/history";

interface HistoryTableProps {
  entries: HistoryEntry[];
  selectedId: string | null;
  onSelect: (entry: HistoryEntry) => void;
}

export function HistoryTable({ entries, selectedId, onSelect }: HistoryTableProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Recherches passées</h2>

      <div className="rounded-2xl border border-gray-100 overflow-hidden">
        {entries.length === 0 ? (
          <p className="text-xs text-gray-400 p-4">Aucune recherche enregistrée.</p>
        ) : (
          entries.map((entry, i) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect(entry)}
              className={`w-full flex justify-between p-4 cursor-pointer transition-all border-l-2 ${
                selectedId === entry.id
                  ? 'bg-blue-50 border-l-blue-600'
                  : i % 2 === 0
                  ? 'bg-white border-l-transparent hover:bg-blue-50'
                  : 'bg-gray-50 border-l-transparent hover:bg-blue-50'
              } ${i < entries.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="text-left min-w-0">
                <div className="text-sm font-semibold text-gray-900">
                  {entry.sector} / {entry.city}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{entry.radius}</span>
                  {entry.companySize && <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{entry.companySize}</span>}
                  {entry.targetRole && <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{entry.targetRole}</span>}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatRelativeTime(entry.createdAt)}
                </div>
              </div>
              <div className="shrink-0 text-right ml-4">
                <div className="text-sm font-bold text-gray-900">{entry.prospectCount}</div>
                <div className="text-xs text-gray-400">prospects</div>
                <div className="text-xs text-gray-400 mt-0.5">score {entry.averageScore}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
