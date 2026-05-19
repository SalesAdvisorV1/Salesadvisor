import Link from "next/link";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#444] font-medium mb-1">Tableau de bord</p>
        <h1 className="text-2xl font-black text-white leading-tight">
          Bonjour, {userName}
        </h1>
        <p className="text-[13px] text-[#555] mt-1.5 max-w-md leading-relaxed">
          Aperçu de ton activité, tes crédits et tes dernières recherches de prospects.
        </p>
      </div>

      <Link
        href="/prospect-finder"
        className="inline-flex w-fit items-center gap-2 bg-white text-black text-[13px] font-bold px-5 py-2.5 rounded-lg hover:bg-[#e8e8e8] transition-colors duration-150 shrink-0"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        Nouvelle recherche
      </Link>
    </div>
  );
}
