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

      {entries.length === 0 ? (
        <p className="text-xs text-gray-400 py-4 text-center">Aucune recherche enregistrée.</p>
      ) : (
        <div className="space-y-1">
          {entries.map((entry, i) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect(entry)}
              className={`w-full flex justify-between p-3.5 rounded-xl cursor-pointer transition-all text-left ${
                selectedId === entry.id
                  ? 'bg-gray-900 text-white'
                  : i % 2 === 0
                  ? 'bg-white hover:bg-gray-50'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="min-w-0">
                <div className={`text-sm font-semibold ${selectedId === entry.id ? 'text-white' : 'text-gray-900'}`}>
                  {entry.sector} / {entry.city}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedId === entry.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>{entry.radius}</span>
                  {entry.companySize && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedId === entry.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>{entry.companySize}</span>
                  )}
                  {entry.targetRole && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedId === entry.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>{entry.targetRole}</span>
                  )}
                </div>
                <div className={`text-xs mt-1 ${selectedId === entry.id ? 'text-white/60' : 'text-gray-400'}`}>
                  {formatRelativeTime(entry.createdAt)}
                </div>
              </div>
              <div className="shrink-0 text-right ml-4">
                <div className={`text-sm font-bold ${selectedId === entry.id ? 'text-white' : 'text-gray-900'}`}>
                  {entry.prospectCount}
                </div>
                <div className={`text-xs ${selectedId === entry.id ? 'text-white/60' : 'text-gray-400'}`}>prospects</div>
                <div className={`text-xs mt-0.5 ${selectedId === entry.id ? 'text-white/60' : 'text-gray-400'}`}>
                  score {entry.averageScore}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
