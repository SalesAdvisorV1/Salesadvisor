"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { CreditsOverview } from "@/components/dashboard/credits-overview";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { PriorityProspects } from "@/components/dashboard/priority-prospects";
import { SearchHistoryPanel } from "@/components/dashboard/search-history-panel";
import { StatCard } from "@/components/dashboard/stat-card";
import { useDashboard } from "@/hooks/use-dashboard";

const CHART_DATA = [
  { day: 'J-13', recherches: 1, prospects: 4 },
  { day: 'J-12', recherches: 3, prospects: 12 },
  { day: 'J-11', recherches: 2, prospects: 8 },
  { day: 'J-10', recherches: 4, prospects: 16 },
  { day: 'J-9',  recherches: 1, prospects: 3 },
  { day: 'J-8',  recherches: 5, prospects: 20 },
  { day: 'Lun',  recherches: 2, prospects: 9 },
  { day: 'Mar',  recherches: 5, prospects: 21 },
  { day: 'Mer',  recherches: 3, prospects: 14 },
  { day: 'Jeu',  recherches: 8, prospects: 32 },
  { day: 'Ven',  recherches: 6, prospects: 24 },
  { day: 'Sam',  recherches: 1, prospects: 5 },
  { day: 'Dim',  recherches: 4, prospects: 17 },
  { day: "Auj.", recherches: 3, prospects: 11 },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.05 },
  }),
};

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
          className="mt-6 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 min-h-[44px]"
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-6">
        {[
          { title: "Recherches", value: stats.searchesThisMonth, subtitle: "ce mois-ci", icon: "search" as const },
          { title: "Prospects trouvés", value: stats.prospectsFound, subtitle: "entreprises qualifiées", icon: "users" as const },
          { title: "Score moyen", value: `${stats.averageScore}/100`, subtitle: "qualité globale", icon: "star" as const },
          { title: "Crédits restants", value: stats.creditsRemaining, subtitle: `sur ${stats.creditsTotal} disponibles`, icon: "credit" as const },
        ].map((card, i) => (
          <motion.div key={card.title} custom={i} variants={fadeUp} initial="hidden" animate="visible">
            <StatCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        className="mt-6 rounded-2xl p-5 transition-shadow duration-200"
        style={{
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(99,102,241,0.10)',
          boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: '#0f172a' }}>Activité — 14 derniers jours</h3>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#64748b' }}>
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#6366f1' }} />
              Recherches
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#64748b' }}>
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#8b5cf6' }} />
              Prospects
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={CHART_DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRecherches" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProspects" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.30} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.10)" />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(99,102,241,0.18)',
                borderRadius: '12px',
                fontSize: '12px',
                boxShadow: '0 8px 24px rgba(99,102,241,0.15)',
                padding: '10px 14px',
                backdropFilter: 'blur(10px)',
              }}
              labelStyle={{ color: '#0a0a0a', fontWeight: 700, marginBottom: 4 }}
              itemStyle={{ color: '#6b7280', padding: '1px 0' }}
              cursor={{ stroke: 'rgba(99,102,241,0.25)', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="recherches"
              name="Recherches"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#colorRecherches)"
              dot={{ fill: '#6366f1', r: 2.5 }}
              activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="prospects"
              name="Prospects"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#colorProspects)"
              dot={{ fill: '#8b5cf6', r: 2.5 }}
              activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr] items-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <ActivityFeed items={activities} />
        <CreditsOverview />
      </motion.div>

      <motion.div
        className="mt-6 grid gap-6 lg:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <SearchHistoryPanel items={searchHistory} />
        <PriorityProspects items={priorityProspects} />
      </motion.div>
    </div>
  );
}
