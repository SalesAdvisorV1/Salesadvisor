import { ProspectResult } from "@/types/prospect";

interface Props { prospect: ProspectResult; }

export function ProspectResultCard({ prospect }: Props) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] hover:bg-[#141414] transition-all">
      <div className="flex justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">{prospect.name}</h3>
          <p className="text-xs text-[#555] mt-0.5">{prospect.sector} · {prospect.city}, {prospect.country}</p>
        </div>
        <span className="bg-white text-black text-xs font-bold px-2.5 py-1 rounded-full shrink-0 h-fit">
          {prospect.score}/100
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4">
        {prospect.role && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#333]">Poste ciblé</p>
            <p className="text-xs text-[#888]">{prospect.role}</p>
          </div>
        )}
        {prospect.size && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#333]">Taille</p>
            <p className="text-xs text-[#888]">{prospect.size} · {prospect.employees}</p>
          </div>
        )}
        {prospect.revenue && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#333]">CA estimé</p>
            <p className="text-xs text-[#888]">{prospect.revenue}</p>
          </div>
        )}
        {prospect.website && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#333]">Site web</p>
            <a href={`https://${prospect.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#888] hover:text-white transition-colors truncate block">{prospect.website}</a>
          </div>
        )}
      </div>

      <div className="border-t border-[#1a1a1a] pt-3 mt-3 space-y-1.5">
        {prospect.contact && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#333] w-14">Email</span>
            <a href={`mailto:${prospect.contact}`} className="text-xs text-[#888] hover:text-white transition-colors truncate">{prospect.contact}</a>
          </div>
        )}
        {prospect.phone && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#333] w-14">Tél</span>
            <a href={`tel:${prospect.phone}`} className="text-xs text-[#888]">{prospect.phone}</a>
          </div>
        )}
        {prospect.linkedin && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#333] w-14">LinkedIn</span>
            <a href={`https://${prospect.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#888] hover:text-white transition-colors truncate">{prospect.linkedin}</a>
          </div>
        )}
      </div>

      {prospect.reason && (
        <p className="italic text-xs text-[#444] border-t border-[#1a1a1a] pt-2 mt-2">{prospect.reason}</p>
      )}
    </div>
  );
}
