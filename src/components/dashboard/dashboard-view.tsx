"use client";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { CreditsOverview } from "@/components/dashboard/credits-overview";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { PriorityProspects } from "@/components/dashboard/priority-prospects";
import { SearchHistoryPanel } from "@/components/dashboard/search-history-panel";
import { StatCard } from "@/components/dashboard/stat-card";
import { useDashboard } from "@/hooks/use-dashboard";

export function DashboardView() {
  const { data, isLoading, isError, refetch } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-200">
          Impossible de charger le dashboard
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Vérifie ta connexion et réessaie.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-2xl bg-slate-800 px-5 py-2.5 text-sm font-medium hover:bg-slate-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const { stats, activities, searchHistory, priorityProspects, user } = data;

  return (
    <div className="mx-auto max-w-7xl">
      <DashboardHeader userName={user.name} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Recherches"
          value={stats.searchesThisMonth}
          subtitle="ce mois-ci"
        />
        <StatCard
          title="Prospects trouvés"
          value={stats.prospectsFound}
          subtitle="entreprises qualifiées"
        />
        <StatCard
          title="Score moyen"
          value={`${stats.averageScore}/100`}
          subtitle="qualité globale"
        />
        <StatCard
          title="Crédits restants"
          value={stats.creditsRemaining}
          subtitle={`sur ${stats.creditsTotal} disponibles`}
          highlight
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <ActivityFeed items={activities} />
        <CreditsOverview />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SearchHistoryPanel items={searchHistory} />
        <PriorityProspects items={priorityProspects} />
      </div>
    </div>
  );
}
