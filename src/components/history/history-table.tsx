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
      <h2 className="text-sm font-semibold text-white mb-4">Recherches passées</h2>

      <div className="space-y-1">
        {entries.length === 0 ? (
          <p className="text-xs text-[#555]">Aucune recherche enregistrée.</p>
        ) : (
          entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect(entry)}
              className={`w-full flex justify-between p-4 rounded-xl cursor-pointer transition-all border ${
                selectedId === entry.id
                  ? "bg-[#161616] border-[#2a2a2a]"
                  : "border-transparent hover:bg-[#161616] hover:border-[#1e1e1e]"
              }`}
            >
              <div className="text-left min-w-0">
                <div className="text-sm font-semibold text-white">
                  {entry.sector} / {entry.city}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="bg-[#1e1e1e] text-[#888] text-xs px-2 py-0.5 rounded-full">{entry.radius}</span>
                  {entry.companySize && <span className="bg-[#1e1e1e] text-[#888] text-xs px-2 py-0.5 rounded-full">{entry.companySize}</span>}
                  {entry.targetRole && <span className="bg-[#1e1e1e] text-[#888] text-xs px-2 py-0.5 rounded-full">{entry.targetRole}</span>}
                </div>
                <div className="text-xs text-[#555] mt-1">
                  {formatRelativeTime(entry.createdAt)}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-semibold text-white">{entry.prospectCount}</div>
                <div className="text-xs text-[#555]">prospects</div>
                <div className="text-xs text-[#555] mt-0.5">score {entry.averageScore}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
