import Link from "next/link";
import type { PriorityProspect } from "@/types/dashboard";

const AVATAR_COLORS = [
  'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500',
  'bg-pink-500', 'bg-teal-500', 'bg-cyan-500', 'bg-amber-500',
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function prospectHref(prospect: PriorityProspect) {
  const params = new URLSearchParams({
    company: prospect.name,
    sector: prospect.sector,
    city: prospect.city,
  });
  return `/ai-assistant?${params.toString()}`;
}

function scoreBadge(score: number): string {
  if (score > 85) return 'bg-green-50 text-green-700';
  if (score > 70) return 'bg-orange-50 text-orange-700';
  return 'bg-red-50 text-red-700';
}

interface PriorityProspectsProps {
  items?: PriorityProspect[];
  prospects?: PriorityProspect[];
}

export function PriorityProspects({ items, prospects }: PriorityProspectsProps) {
  const list = items ?? prospects ?? [];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-gray-900">Prospects prioritaires</h3>
        <Link href="/prospect-finder" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
          Explorer →
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="text-xs text-gray-400 py-4 text-center">Aucun prospect pour le moment.</p>
      ) : (
        <div className="space-y-1">
          {list.map((prospect) => (
            <Link
              key={prospect.id}
              href={prospectHref(prospect)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-lg ${avatarColor(prospect.name)} flex items-center justify-center shrink-0`}>
                  <span className="text-[11px] font-bold text-white">
                    {prospect.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-gray-900 truncate">{prospect.name}</p>
                  <p className="text-xs text-gray-400 truncate">{prospect.sector} · {prospect.city}</p>
                </div>
              </div>

              <span className={`text-xs font-bold px-2 py-0.5 rounded-full tabular-nums shrink-0 ml-3 ${scoreBadge(prospect.score)}`}>
                {prospect.score}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
