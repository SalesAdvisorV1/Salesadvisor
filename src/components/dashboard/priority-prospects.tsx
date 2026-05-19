import Link from "next/link";
import type { PriorityProspect } from "@/types/dashboard";

function scoreColor(score: number) {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  return "text-[#666]";
}

export function PriorityProspects({ items }: { items: PriorityProspect[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-white">Prospects prioritaires</h3>
        <Link href="/prospect-finder" className="text-[11px] text-[#444] hover:text-white transition-colors">
          Explorer →
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-[#444] py-4 text-center">Aucun prospect pour le moment.</p>
      ) : (
        <div className="space-y-0.5">
          {items.map((prospect) => (
            <div
              key={prospect.id}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#161616] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-[#888]">
                    {prospect.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-white truncate">{prospect.name}</p>
                  <p className="text-[11px] text-[#444] truncate">{prospect.sector} · {prospect.city}</p>
                </div>
              </div>

              <div className={`text-sm font-black tabular-nums shrink-0 ml-3 ${scoreColor(prospect.score)}`}>
                {prospect.score}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
