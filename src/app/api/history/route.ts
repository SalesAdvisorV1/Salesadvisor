import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { HistoryEntry } from "@/types/history";
import type { ProspectResult } from "@/types/prospect";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return Response.json({ entries: [] });
  }

  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("search_history")
      .select("id, query, results, credits_used, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    if ((data ?? []).length === 0) {
      return Response.json({ entries: [] });
    }

    const entries: HistoryEntry[] = (data ?? []).map((row) => {
      console.log("[history] raw row:", JSON.stringify(row));
      const filters = safeParseFilters(row.id, row.query);
      const prospects = (row.results as ProspectResult[]) ?? [];
      const averageScore =
        prospects.length > 0
          ? Math.round(prospects.reduce((s, p) => s + p.score, 0) / prospects.length)
          : 0;

      return {
        id: row.id,
        sector: filters.sector ?? "—",
        city: filters.city ?? "—",
        country: filters.country ?? "France",
        radius: filters.radius ?? "50 km",
        companySize: filters.companySize,
        keywords: filters.keywords,
        targetRole: filters.targetRole,
        prospectCount: prospects.length,
        averageScore,
        prospects,
        createdAt: row.created_at,
      };
    });

    return Response.json({ entries, total: entries.length });
  } catch (err) {
    console.error("[history] Supabase error:", err);
    return Response.json({ entries: [] });
  }
}

function safeParseFilters(rowId: string, query: string | null): Record<string, string> {
  try {
    return query ? JSON.parse(query) : {};
  } catch (err) {
    console.error(`[history] JSON parse failed for row ${rowId}, raw query:`, query, "error:", err);
    return {};
  }
}
