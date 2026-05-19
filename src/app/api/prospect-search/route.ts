import { prospectSearchSchema } from "@/lib/schemas/prospect-search";
import { searchMockProspects } from "@/lib/mock/prospects";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = prospectSearchSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const filters = parsed.data;
  const prospects = searchMockProspects(filters);
  const averageScore =
    prospects.length > 0
      ? Math.round(prospects.reduce((s, p) => s + p.score, 0) / prospects.length)
      : 0;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();

      const { data: entry, error } = await supabase
        .from("search_history")
        .insert({
          query: JSON.stringify(filters),
          results: prospects,
          credits_used: 2,
        })
        .select("id")
        .single();

      if (error) throw error;

      await supabase.from("activities").insert({
        type: "search",
        description: `Recherche ${filters.sector} — ${filters.city} : ${prospects.length} prospects analysés, score moyen ${averageScore}/100`,
      });

      return Response.json({
        prospects,
        total: prospects.length,
        searchId: entry.id,
      });
    } catch (err) {
      console.error("[prospect-search] Supabase error:", err);
    }
  }

  return Response.json({
    prospects,
    total: prospects.length,
    searchId: `search-${Date.now()}`,
  });
}
