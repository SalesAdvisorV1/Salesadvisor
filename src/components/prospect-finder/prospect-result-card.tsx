import Link from "next/link";
import { ProspectResult } from "@/types/prospect";

interface Props { prospect: ProspectResult; }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400 mb-1 font-medium">{label}</p>
      <div className="text-[13px] text-gray-700">{children}</div>
    </div>
  );
}

export function ProspectResultCard({ prospect }: Props) {
  const score = prospect.score ?? 0;
  const scoreConfig = score >= 85
    ? { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200' }
    : score >= 70
    ? { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' }
    : { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200' };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="text-[15px] font-bold text-gray-900 leading-tight">{prospect.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{prospect.sector} · {prospect.city}, {prospect.country}</p>
        </div>
        <span className={`border text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0 tabular-nums ${scoreConfig.bg} ${scoreConfig.text} ${scoreConfig.border}`}>
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
              className="hover:text-black transition-colors truncate block text-blue-600"
            >
              {prospect.website}
            </a>
          </Field>
        )}
      </div>

      {/* Contact row */}
      {(prospect.contact || prospect.phone || prospect.linkedin) && (
        <div className="border-t border-gray-100 pt-3 space-y-2">
          {prospect.contact && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.12em] text-gray-400 w-12 shrink-0 font-medium">Email</span>
              <a href={`mailto:${prospect.contact}`} className="text-xs text-gray-600 hover:text-black transition-colors truncate">
                {prospect.contact}
              </a>
            </div>
          )}
          {prospect.phone && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.12em] text-gray-400 w-12 shrink-0 font-medium">Tél</span>
              <a href={`tel:${prospect.phone}`} className="text-xs text-gray-600 hover:text-black transition-colors">
                {prospect.phone}
              </a>
            </div>
          )}
          {prospect.linkedin && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.12em] text-gray-400 w-12 shrink-0 font-medium">LinkedIn</span>
              <a
                href={`https://${prospect.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-black transition-colors truncate"
              >
                {prospect.linkedin}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Reason */}
      {prospect.reason && (
        <p className="italic text-xs text-gray-400 border-t border-gray-100 pt-3 mt-3 leading-relaxed">
          {prospect.reason}
        </p>
      )}

      {/* IA CTA */}
      <Link
        href={`/ai-assistant?company=${encodeURIComponent(prospect.name)}&sector=${encodeURIComponent(prospect.sector)}&city=${encodeURIComponent(prospect.city)}`}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
      >
        <span>✦</span>
        Analyser avec IA
      </Link>
    </div>
  );
}
