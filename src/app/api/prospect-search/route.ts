import { NextResponse } from "next/server";
import { prospectSearchSchema } from "@/lib/schemas/prospect-search";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CITY_DEPT: Record<string, string> = {
  "paris": "75","lyon": "69","marseille": "13","toulouse": "31",
  "bordeaux": "33","nantes": "44","strasbourg": "67","lille": "59",
  "nice": "06","rennes": "35","grenoble": "38","montpellier": "34",
  "nancy": "54","metz": "57","tours": "37","rouen": "76",
  "clermont": "63","dijon": "21","angers": "49","reims": "51",
  "toul": "54","troyes": "10","caen": "14","amiens": "80"
};

function formatCA(ca: number): string {
  if (ca >= 1000000000) return `${(ca/1000000000).toFixed(1)}Md€`;
  if (ca >= 1000000) return `${Math.round(ca/1000000)}M€`;
  if (ca >= 1000) return `${Math.round(ca/1000)}K€`;
  return `${ca}€`;
}

function formatEmployees(tranche: string): string {
  const map: Record<string, string> = {
    "NN": "N/C","00": "0","01": "1-2","02": "3-5","03": "6-9",
    "11": "10-19","12": "20-49","21": "50-99","22": "100-199",
    "31": "200-249","32": "250-499","41": "500-999","42": "1000-1999",
    "51": "2000-4999","52": "5000-9999","53": "+10000"
  };
  return map[tranche] || "N/C";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = prospectSearchSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    const f = parsed.data;

    const city = f.city.toLowerCase().trim();
    const dept = CITY_DEPT[city] || "";
    const query = encodeURIComponent(f.sector);

    let url = `https://recherche-entreprises.api.gouv.fr/search?per_page=25&q=${query}`;
    if (dept) url += `&departement=${dept}`;

    const apiRes = await fetch(url);
    const apiData = await apiRes.json();
    let entreprises: any[] = apiData.results || [];

    // Filtre : garder uniquement les entreprises dont le SIEGE est dans le département
    if (dept) {
      const withSiege = entreprises.filter((e: any) => e.siege?.departement === dept);
      entreprises = withSiege.length >= 3 ? withSiege : entreprises;
    }

    // Filtre taille
    const sizeFilter = (f.companySize || "").toLowerCase();
    if (sizeFilter.includes("pme") && !sizeFilter.includes("eti")) {
      entreprises = entreprises.filter((e: any) => e.categorie_entreprise !== "GE");
    }

    entreprises = entreprises.slice(0, 5);

    if (entreprises.length === 0) {
      return NextResponse.json({ prospects: [], total: 0, searchId: `search-${Date.now()}` });
    }

    // Enrichissement OpenAI minimal (juste score + raison + contact)
    const names = entreprises.map((e: any) => e.nom_complet).join(", ");
    const prompt = `Entreprises françaises secteur ${f.sector} : ${names}. Pour chacune génère JSON array : [{"name":"nom exact","score":82,"contact":"prenom.nom@domaine.fr","reason":"raison courte pertinence ${f.sector}"}]. JSON brut uniquement.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
      temperature: 0.3,
    });

    let enriched: any[] = [];
    try {
      const raw = completion.choices[0].message.content || "[]";
      enriched = JSON.parse(raw.replace(/```json|```/g, "").trim());
    } catch { enriched = []; }

    const prospects = entreprises.map((e: any, i: number) => {
      const enrich = enriched[i] || {};
      const dirigeant = e.dirigeants?.find((d: any) => d.type_dirigeant === "personne physique");
      const finances = e.finances ? Object.values(e.finances)[0] as any : null;
      const ca = finances?.ca ? formatCA(finances.ca) : null;

      return {
        id: e.siren || `p${i}`,
        name: e.nom_complet,
        sector: e.libelle_activite_principale || f.sector,
        city: e.siege?.libelle_commune || e.siege?.ville || f.city,
        country: "France",
        score: enrich.score || 80,
        size: e.categorie_entreprise || "PME",
        employees: formatEmployees(e.tranche_effectif_salarie || "NN"),
        website: null,
        contact: enrich.contact || null,
        role: dirigeant ? `${dirigeant.qualite || f.targetRole || "Dirigeant"}` : f.targetRole || "Dirigeant",
        contactName: dirigeant ? `${dirigeant.prenoms} ${dirigeant.nom}` : null,
        phone: null,
        revenue: ca,
        linkedin: null,
        reason: enrich.reason || `Entreprise du secteur ${f.sector}`,
        siren: e.siren,
        address: e.siege?.adresse || null,
      };
    });

    const avgScore = Math.round(prospects.reduce((s: number, p: any) => s + p.score, 0) / prospects.length);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminClient();
        const token = request.headers.get("authorization")?.replace("Bearer ", "");
        let userId: string | null = null;
        if (token) {
          const { data: { user } } = await supabase.auth.getUser(token);
          if (user) userId = user.id;
        }
        const { data: entry } = await supabase.from("search_history").insert({
          query: JSON.stringify(f), results: prospects, credits_used: 2
        }).select("id").single();
        await supabase.from("activities").insert({
          type: "search",
          description: `Recherche ${f.sector} — ${f.city} : ${prospects.length} prospects, score moyen ${avgScore}/100`
        });
        if (userId) {
          await supabase.rpc("decrement_credits", { user_id: userId, amount: 2 });
        }
        return NextResponse.json({ prospects, total: prospects.length, searchId: entry?.id });
      } catch (err) { console.error(err); }
    }

    return NextResponse.json({ prospects, total: prospects.length, searchId: `search-${Date.now()}` });
  } catch (err) {
    console.error("[prospect-search] Error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
