import { formatRelativeTime } from "@/lib/format";
import type { HistoryEntry } from "@/types/history";

interface HistoryTableProps {
  entries: HistoryEntry[];
  selectedId: string | null;
  onSelect: (entry: HistoryEntry) => void;
}

const SECTOR_COLORS: Record<string, { bg: string; text: string }> = {
  tech:          { bg: 'bg-blue-100',   text: 'text-blue-700' },
  saas:          { bg: 'bg-violet-100', text: 'text-violet-700' },
  finance:       { bg: 'bg-green-100',  text: 'text-green-700' },
  retail:        { bg: 'bg-orange-100', text: 'text-orange-700' },
  santé:         { bg: 'bg-red-100',    text: 'text-red-700' },
  industrie:     { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  immobilier:    { bg: 'bg-teal-100',   text: 'text-teal-700' },
  éducation:     { bg: 'bg-pink-100',   text: 'text-pink-700' },
};

function getSectorColors(sector: string): { bg: string; text: string } {
  const key = sector.toLowerCase();
  for (const [k, v] of Object.entries(SECTOR_COLORS)) {
    if (key.includes(k)) return v;
  }
  return { bg: 'bg-gray-100', text: 'text-gray-600' };
}

export function HistoryTable({ entries, selectedId, onSelect }: HistoryTableProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.8}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        <h2 className="text-sm font-semibold text-gray-900">Recherches passées</h2>
        {entries.length > 0 && (
          <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
            {entries.length}
          </span>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.5}>
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-600">Aucune recherche encore.</p>
          <p className="text-xs text-gray-400 mt-1">Commencez par le Prospect Finder.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gray-100" />
          <div className="space-y-0.5">
            {entries.map((entry) => {
              const isSelected = selectedId === entry.id;
              const sectorColors = getSectorColors(entry.sector);

              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => onSelect(entry)}
                  className={`w-full flex justify-between p-3.5 pl-8 rounded-xl cursor-pointer transition-all duration-150 text-left relative ${
                    isSelected
                      ? 'bg-gray-900 text-white'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-[7px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full border-2 border-white ${
                    isSelected ? 'bg-white' : sectorColors.bg.replace('bg-', 'bg-').replace('-100', '-400')
                  }`} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {entry.city}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : `${sectorColors.bg} ${sectorColors.text}`
                      }`}>
                        {entry.sector}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-500'
                      }`}>{entry.radius}</span>
                      {entry.companySize && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-500'
                        }`}>{entry.companySize}</span>
                      )}
                    </div>
                    <div className={`text-xs mt-1 ${isSelected ? 'text-white/50' : 'text-gray-400'}`}>
                      {formatRelativeTime(entry.createdAt)}
                    </div>
                  </div>
                  <div className="shrink-0 text-right ml-4">
                    <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                      {entry.prospectCount}
                    </div>
                    <div className={`text-[10px] ${isSelected ? 'text-white/50' : 'text-gray-400'}`}>prospects</div>
                    <div className={`text-[10px] mt-1 font-semibold px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : entry.averageScore >= 70
                          ? 'bg-green-100 text-green-700'
                          : entry.averageScore >= 50
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-600'
                    }`}>
                      {entry.averageScore}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
