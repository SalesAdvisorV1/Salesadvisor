import { ProspectResult } from "@/types/prospect";

interface Props { prospect: ProspectResult; }

export function ProspectResultCard({ prospect }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white text-base">{prospect.name}</h3>
          <p className="text-sm text-gray-400">{prospect.sector} · {prospect.city}, {prospect.country}</p>
        </div>
        <span className="shrink-0 text-sm font-bold bg-white text-black rounded-full px-3 py-1">
          {prospect.score}/100
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {prospect.role && (
          <div>
            <p className="text-gray-500 text-xs">Poste ciblé</p>
            <p className="text-white">{prospect.role}</p>
          </div>
        )}
        {prospect.size && (
          <div>
            <p className="text-gray-500 text-xs">Taille</p>
            <p className="text-white">{prospect.size} · {prospect.employees}</p>
          </div>
        )}
        {prospect.revenue && (
          <div>
            <p className="text-gray-500 text-xs">CA estimé</p>
            <p className="text-white">{prospect.revenue}</p>
          </div>
        )}
        {prospect.website && (
          <div>
            <p className="text-gray-500 text-xs">Site web</p>
            <a href={`https://${prospect.website}`} target="_blank" rel="noopener noreferrer" className="text-white hover:underline truncate block">{prospect.website}</a>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-1 text-sm pt-1 border-t border-white/10">
        {prospect.contact && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs w-16">Email</span>
            <a href={`mailto:${prospect.contact}`} className="text-white hover:underline truncate">{prospect.contact}</a>
          </div>
        )}
        {prospect.phone && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs w-16">Tél</span>
            <a href={`tel:${prospect.phone}`} className="text-white">{prospect.phone}</a>
          </div>
        )}
        {prospect.linkedin && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs w-16">LinkedIn</span>
            <a href={`https://${prospect.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-white hover:underline truncate">{prospect.linkedin}</a>
          </div>
        )}
      </div>

      {prospect.reason && (
        <p className="text-xs text-gray-400 italic border-t border-white/10 pt-2">{prospect.reason}</p>
      )}
    </div>
  );
}
