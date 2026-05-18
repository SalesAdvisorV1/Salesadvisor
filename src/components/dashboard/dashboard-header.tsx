import Link from "next/link";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm text-blue-400">Tableau de bord</p>
        <h1 className="mt-1 text-3xl font-semibold">
          Bonjour, {userName}
        </h1>
        <p className="mt-2 max-w-xl text-slate-400">
          Voici un aperçu de ton activité, tes crédits et tes dernières
          recherches de prospects.
        </p>
      </div>
      <Link
        href="/prospect-finder"
        className="inline-flex w-fit items-center justify-center rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-400"
      >
        Nouvelle recherche
      </Link>
    </div>
  );
}
