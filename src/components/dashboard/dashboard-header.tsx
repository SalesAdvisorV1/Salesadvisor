import Link from "next/link";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8 pt-4">
      <div>
        <h1 className="text-2xl font-black text-gray-900 leading-tight">
          Bonjour, {userName}
        </h1>
        <p className="text-sm text-gray-500 mt-1 max-w-md leading-relaxed">
          Aperçu de ton activité, tes crédits et tes dernières recherches de prospects.
        </p>
      </div>

      <Link
        href="/prospect-finder"
        className="inline-flex w-fit items-center gap-2 bg-gray-900 text-white text-[13px] font-semibold px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors duration-150 shrink-0"
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
