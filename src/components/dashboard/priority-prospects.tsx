import Link from "next/link";
import type { PriorityProspect } from "@/types/dashboard";

// Monochrome indigo avatars — same hue family, subtle variation
const AVATAR_TONES: { bg: string; color: string }[] = [
  { bg: 'rgba(99,102,241,0.12)',  color: '#4f46e5' },
  { bg: 'rgba(99,102,241,0.18)',  color: '#4338ca' },
  { bg: 'rgba(139,92,246,0.12)',  color: '#7c3aed' },
  { bg: 'rgba(139,92,246,0.18)',  color: '#6d28d9' },
];

function avatarTone(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_TONES[Math.abs(hash) % AVATAR_TONES.length];
}

function prospectHref(prospect: PriorityProspect) {
  const params = new URLSearchParams({
    company: prospect.name,
    sector: prospect.sector,
    city: prospect.city,
  });
  return `/ai-assistant?${params.toString()}`;
}

// Muted semantic scoring colors (red/green reserved for scores only)
function scoreBadgeStyle(score: number): { background: string; color: string } {
  if (score > 85) return { background: 'rgba(16,185,129,0.10)', color: '#059669' };
  if (score > 70) return { background: 'rgba(245,158,11,0.10)', color: '#b45309' };
  return { background: 'rgba(239,68,68,0.10)', color: '#dc2626' };
}

interface PriorityProspectsProps {
  items?: PriorityProspect[];
  prospects?: PriorityProspect[];
}

export function PriorityProspects({ items, prospects }: PriorityProspectsProps) {
  const list = items ?? prospects ?? [];

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(99,102,241,0.10)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: '#0f172a' }}>Prospects prioritaires</h3>
        <Link
          href="/prospect-finder"
          className="text-xs font-medium transition-colors"
          style={{ color: '#94a3b8' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#4f46e5'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8'; }}
        >
          Explorer →
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="text-xs py-4 text-center" style={{ color: '#94a3b8' }}>Aucun prospect pour le moment.</p>
      ) : (
        <div className="space-y-0.5">
          {list.map((prospect) => {
            const tone = avatarTone(prospect.name);
            const badge = scoreBadgeStyle(prospect.score);
            return (
              <Link
                key={prospect.id}
                href={prospectHref(prospect)}
                className="flex items-center justify-between px-2.5 py-2.5 rounded-xl transition-colors"
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(99,102,241,0.05)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: tone.bg, border: '1px solid rgba(99,102,241,0.10)' }}
                  >
                    <span className="text-[12px] font-semibold" style={{ color: tone.color }}>
                      {prospect.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold truncate" style={{ color: '#0f172a' }}>{prospect.name}</p>
                    <p className="text-xs truncate" style={{ color: '#94a3b8' }}>{prospect.sector} · {prospect.city}</p>
                  </div>
                </div>

                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums shrink-0 ml-3"
                  style={badge}
                >
                  {prospect.score}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
