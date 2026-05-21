import { mockDashboardData } from "@/lib/mock/dashboard";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { DashboardData } from "@/types/dashboard";
import type { ProspectResult } from "@/types/prospect";

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return Response.json(mockDashboardData);
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const supabase = createAdminClient();
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [searchesRes, activitiesRes, recentHistoryRes, profileRes] = await Promise.all([
      supabase
        .from("search_history")
        .select("id, results, created_at")
        .gte("created_at", startOfMonth.toISOString()),
      supabase
        .from("activities")
        .select("id, type, description, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("search_history")
        .select("id, query, results, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
      userId
        ? supabase.from("profiles").select("credits_remaining, plan").eq("id", userId).single()
        : Promise.resolve({ data: null }),
    ]);

    const searches = searchesRes.data ?? [];
    const activities = activitiesRes.data ?? [];
    const recentHistory = recentHistoryRes.data ?? [];
    const profile = profileRes.data;

    const allProspects = searches.flatMap((r) => (r.results as ProspectResult[]) ?? []);
    const prospectsFound = allProspects.length;
    const averageScore =
      allProspects.length > 0
        ? Math.round(allProspects.reduce((s, p) => s + p.score, 0) / allProspects.length)
        : 0;

    const searchHistoryItems = recentHistory.map((row) => {
      const filters = safeParseFilters(row.query);
      const results = (row.results as ProspectResult[]) ?? [];
      const avg =
        results.length > 0
          ? Math.round(results.reduce((s, p) => s + p.score, 0) / results.length)
          : 0;
      return {
        id: row.id,
        sector: filters.sector ?? "—",
        city: filters.city ?? "—",
        prospectCount: results.length,
        averageScore: avg,
        createdAt: row.created_at,
      };
    });

    const topProspects = recentHistory
      .flatMap((row) => (row.results as ProspectResult[]) ?? [])
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((p) => ({ id: p.id, name: p.name, city: p.city, sector: p.sector, score: p.score }));

    const data: DashboardData = {
      user: mockDashboardData.user,
      stats: {
        searchesThisMonth: searches.length,
        prospectsFound,
        averageScore,
        creditsRemaining: profile?.credits_remaining ?? mockDashboardData.stats.creditsRemaining,
        creditsTotal: 100,
      },
      activities:
        activities.length > 0
          ? activities.map((a) => ({
              id: a.id,
              type: a.type as DashboardData["activities"][number]["type"],
              title: a.description.split(" : ")[0] ?? a.description,
              description: a.description.split(" : ")[1] ?? "",
              createdAt: a.created_at,
            }))
          : mockDashboardData.activities,
      searchHistory:
        searchHistoryItems.length > 0
          ? searchHistoryItems
          : mockDashboardData.searchHistory,
      priorityProspects:
        topProspects.length > 0
          ? topProspects
          : mockDashboardData.priorityProspects,
    };

    return Response.json(data);
  } catch (err) {
    console.error("[dashboard] Supabase error:", err);
    return Response.json(mockDashboardData);
  }
}

function safeParseFilters(query: string | null): Record<string, string> {
  try {
    return query ? JSON.parse(query) : {};
  } catch {
    return {};
  }
}
