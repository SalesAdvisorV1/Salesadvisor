import { ProspectResult } from "@/types/prospect";

interface Props { prospect: ProspectResult; }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.14em] text-[#333] mb-1 font-medium">{label}</p>
      <div className="text-[12px] text-[#888]">{children}</div>
    </div>
  );
}

export function ProspectResultCard({ prospect }: Props) {
  const score = prospect.score ?? 0;
  const scoreColor = score >= 80 ? 'bg-green-500/10 text-green-400 border-green-500/20'
    : score >= 60 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    : 'bg-[#1e1e1e] text-[#666] border-[#2a2a2a]';

  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] hover:bg-[#131313] transition-all duration-150">

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="text-[15px] font-bold text-white leading-tight">{prospect.name}</h3>
          <p className="text-[11px] text-[#555] mt-0.5 truncate">{prospect.sector} · {prospect.city}, {prospect.country}</p>
        </div>
        <span className={`border text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0 tabular-nums ${scoreColor}`}>
          {prospect.score}/100
        </span>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
        {prospect.role && <Field label="Poste ciblé">{prospect.role}</Field>}
        {prospect.size && <Field label="Taille">{prospect.size} · {prospect.employees}</Field>}
        {prospect.revenue && <Field label="CA estimé">{prospect.revenue}</Field>}
        {prospect.website && (
          <Field label="Site web">
            <a
              href={`https://${prospect.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors truncate block"
            >
              {prospect.website}
            </a>
          </Field>
        )}
      </div>

      {/* Contact row */}
      {(prospect.contact || prospect.phone || prospect.linkedin) && (
        <div className="border-t border-[#1a1a1a] pt-3 space-y-2">
          {prospect.contact && (
            <div className="flex items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.14em] text-[#333] w-12 shrink-0 font-medium">Email</span>
              <a href={`mailto:${prospect.contact}`} className="text-[12px] text-[#888] hover:text-white transition-colors truncate">
                {prospect.contact}
              </a>
            </div>
          )}
          {prospect.phone && (
            <div className="flex items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.14em] text-[#333] w-12 shrink-0 font-medium">Tél</span>
              <a href={`tel:${prospect.phone}`} className="text-[12px] text-[#888] hover:text-white transition-colors">
                {prospect.phone}
              </a>
            </div>
          )}
          {prospect.linkedin && (
            <div className="flex items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.14em] text-[#333] w-12 shrink-0 font-medium">LinkedIn</span>
              <a
                href={`https://${prospect.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[#888] hover:text-white transition-colors truncate"
              >
                {prospect.linkedin}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Reason */}
      {prospect.reason && (
        <p className="italic text-[11px] text-[#3a3a3a] border-t border-[#1a1a1a] pt-3 mt-3 leading-relaxed">
          {prospect.reason}
        </p>
      )}
    </div>
  );
}
