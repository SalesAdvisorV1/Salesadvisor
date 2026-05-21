import { NextResponse } from "next/server";
import { prospectSearchSchema } from "@/lib/schemas/prospect-search";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CITY_DEPT: Record<string, string> = {
  "paris": "75", "lyon": "69", "marseille": "13", "toulouse": "31",
  "bordeaux": "33", "nantes": "44", "strasbourg": "67", "lille": "59",
  "nice": "06", "rennes": "35", "grenoble": "38", "montpellier": "34",
  "nancy": "54", "metz": "57", "tours": "37", "rouen": "76",
  "clermont": "63", "dijon": "21", "angers": "49", "reims": "51",
  "toul": "54", "metz": "57", "nancy": "54", "strasbourg": "67"
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = prospectSearchSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    const f = parsed.data;

    const city = f.city.toLowerCase().trim();
    const dept = CITY_DEPT[city] || "";
    const query = encodeURIComponent(f.sector);

    let url = `https://recherche-entreprises.api.gouv.fr/search?per_page=20&q=${query}`;
    if (dept) url += `&departement=${dept}`;

    const apiRes = await fetch(url);
    const apiData = await apiRes.json();
    let entreprises = apiData.results || [];

    const sizeFilter = (f.companySize || "").toLowerCase();
    if (sizeFilter.includes("pme")) {
      entreprises = entreprises.filter((e: any) => e.categorie_entreprise !== "GE");
    }

    entreprises = entreprises.slice(0, 5);

    if (entreprises.length === 0) {
      return NextResponse.json({ prospects: [], total: 0, searchId: `search-${Date.now()}` });
    }

    const names = entreprises.map((e: any) => e.nom_complet).join(", ");
    const prompt = `Pour ces entreprises françaises du secteur ${f.sector} : ${names}
Pour chacune génère un JSON array :
[{"name":"nom exact","score":85,"contact":"prenom.nom@domaine.fr","reason":"pourquoi pertinent pour ${f.sector} à ${f.city}"}]
Réponds UNIQUEMENT avec le JSON brut.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
      temperature: 0.3,
    });

    let enriched: any[] = [];
    try {
      const raw = completion.choices[0].message.content || "[]";
      enriched = JSON.parse(raw.replace(/```json|```/g, "").trim());
    } catch { enriched = []; }

    const prospects = entreprises.map((e: any, i: number) => {
      const enrich = enriched[i] || {};
      return {
        id: e.siren || `p${i}`,
        name: e.nom_complet,
        sector: e.libelle_activite_principale || f.sector,
        city: e.siege?.ville || f.city,
        country: "France",
        score: enrich.score || 80,
        size: e.categorie_entreprise || "PME",
        employees: e.tranche_effectif_salarie || "N/C",
        website: null,
        contact: enrich.contact || null,
        role: f.targetRole || "Dirigeant",
        phone: null,
        revenue: null,
        linkedin: null,
        reason: enrich.reason || `Entreprise du secteur ${f.sector}`,
      };
    });

    const avgScore = Math.round(prospects.reduce((s: number, p: any) => s + p.score, 0) / prospects.length);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminClient();
        const { data: entry } = await supabase.from("search_history").insert({
          query: JSON.stringify(f), results: prospects, credits_used: 2
        }).select("id").single();
        await supabase.from("activities").insert({
          type: "search",
          description: `Recherche ${f.sector} — ${f.city} : ${prospects.length} prospects, score moyen ${avgScore}/100`
        });
        return NextResponse.json({ prospects, total: prospects.length, searchId: entry?.id });
      } catch (err) { console.error(err); }
    }

    return NextResponse.json({ prospects, total: prospects.length, searchId: `search-${Date.now()}` });
  } catch (err) {
    console.error("[prospect-search] Error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
