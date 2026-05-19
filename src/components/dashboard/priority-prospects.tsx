import Link from "next/link";
import type { PriorityProspect } from "@/types/dashboard";

export function PriorityProspects({ items }: { items: PriorityProspect[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Prospects prioritaires</h3>
        <Link
          href="/prospect-finder"
          className="text-xs text-[#555] hover:text-white transition-colors"
        >
          Explorer
        </Link>
      </div>
      <div className="space-y-1">
        {items.map((prospect) => (
          <div
            key={prospect.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-[#161616] transition-all border border-transparent hover:border-[#1e1e1e] cursor-pointer"
          >
            <div>
              <div className="text-sm font-medium text-white">{prospect.name}</div>
              <div className="text-xs text-[#555]">
                {prospect.sector} · {prospect.city}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center text-xs font-bold text-white shrink-0">
              {prospect.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
