"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { CreditsOverview } from "@/components/dashboard/credits-overview";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { PriorityProspects } from "@/components/dashboard/priority-prospects";
import { SearchHistoryPanel } from "@/components/dashboard/search-history-panel";
import { StatCard } from "@/components/dashboard/stat-card";
import { useDashboard } from "@/hooks/use-dashboard";

const CHART_DATA = [
  { day: 'Lun', recherches: 2 },
  { day: 'Mar', recherches: 5 },
  { day: 'Mer', recherches: 3 },
  { day: 'Jeu', recherches: 8 },
  { day: 'Ven', recherches: 6 },
  { day: 'Sam', recherches: 1 },
  { day: 'Dim', recherches: 4 },
];

export function DashboardView() {
  const { data, isLoading, isError, refetch } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Impossible de charger le dashboard
        </h2>
        <p className="mt-2 text-sm text-red-500">
          Vérifie ta connexion et réessaie.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
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
          icon="search"
        />
        <StatCard
          title="Prospects trouvés"
          value={stats.prospectsFound}
          subtitle="entreprises qualifiées"
          icon="users"
        />
        <StatCard
          title="Score moyen"
          value={`${stats.averageScore}/100`}
          subtitle="qualité globale"
          icon="star"
        />
        <StatCard
          title="Crédits restants"
          value={stats.creditsRemaining}
          subtitle={`sur ${stats.creditsTotal} disponibles`}
          icon="credit"
        />
      </div>

      {/* Recharts activity chart */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Recherches des 7 derniers jours</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={CHART_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              labelStyle={{ color: '#111827', fontWeight: 600 }}
              itemStyle={{ color: '#6b7280' }}
            />
            <Line
              type="monotone"
              dataKey="recherches"
              stroke="#111827"
              strokeWidth={2}
              dot={{ fill: '#111827', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <ActivityFeed items={activities} />
        <CreditsOverview />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SearchHistoryPanel items={searchHistory} />
        <PriorityProspects items={priorityProspects} />
      </div>
    </div>
  );
}
