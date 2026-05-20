import { NextResponse } from "next/server";
import { prospectSearchSchema } from "@/lib/schemas/prospect-search";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function generateEmployees(tranche: string) {
  const map: Record<string, string> = {
    "0": "0", "1": "1-2", "2": "3-5", "3": "6-9",
    "11": "10-19", "12": "20-49", "21": "50-99", "22": "100-199",
    "31": "200-249", "32": "250-499", "41": "500-999", "42": "1000-1999",
    "51": "2000-4999", "52": "5000-9999", "53": "10000+",
  };
  return map[tranche] || "N/C";
}

function generateSize(tranche: string) {
  const t = parseInt(tranche || "0");
  if (t <= 3) return "TPE";
  if (t <= 12) return "PME";
  if (t <= 32) return "ETI";
  return "Grand groupe";
}

function slugify(name: string) {
  return name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const NAF_MAPPING: Record<string, string> = {
  logistique: "4941A,5210B,5229B",
  transport: "4941A,4941B,4942Z",
  tech: "6201Z,6202A,6311Z",
  technologie: "6201Z,6202A,6311Z",
  saas: "6201Z,6311Z",
  industrie: "2511Z,2512Z,2550A",
  btp: "4110A,4120A,4120B",
  commerce: "4711A,4711B,4711D",
  sante: "8610Z,8621Z,8622A",
  immobilier: "6810Z,6820A,6831Z",
  finance: "6411Z,6419Z,6491Z",
  conseil: "7022Z,7112B,7490B",
  marketing: "7311Z,7312Z,7319Z",
  restauration: "5610A,5610C,5629A",
};

function sectorToNaf(sector: string): string {
  const key = sector.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  for (const [k, v] of Object.entries(NAF_MAPPING)) {
    if (key.includes(k)) return v;
  }
  return "";
}

const CITY_TO_DEPT: Record<string, string> = {
  paris: "75", marseille: "13", lyon: "69", toulouse: "31", nice: "06",
  nantes: "44", montpellier: "34", strasbourg: "67", bordeaux: "33",
  lille: "59", rennes: "35", reims: "51", grenoble: "38", dijon: "21",
  angers: "49", nimes: "30", villeurbanne: "69", toulon: "83", limoges: "87",
  clermont: "63", "clermont-ferrand": "63", brest: "29", tours: "37",
  amiens: "80", aix: "13", "aix-en-provence": "13", caen: "14",
  metz: "57", nancy: "54", rouen: "76", orleans: "45", mulhouse: "68",
};

function cityToDept(city: string): string | undefined {
  const key = city.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[\s,]/)[0];
  return CITY_TO_DEPT[key];
}

interface GouvernementEntreprise {
  siren?: string;
  denomination?: string;
  nom_complet?: string;
  siege?: {
    ville?: string;
    code_postal?: string;
    tranche_effectif_salarie?: string;
  };
  tranche_effectif_salarie?: string;
}

interface EnrichedData {
  contact: string;
  phone: string;
  linkedin: string;
  revenue: string;
  score: number;
  reason: string;
}

// Appels parallèles un par code NAF, déduplication par SIREN
async function fetchByNafCodes(nafCodes: string[], dept?: string): Promise<GouvernementEntreprise[]> {
  const results = await Promise.all(
    nafCodes.map(naf => {
      const params = new URLSearchParams({ per_page: "10", activite_principale: naf });
      if (dept) params.set("departement", dept);
      return fetch(`https://recherche-entreprises.api.gouv.fr/search?${params}`)
        .then(r => r.ok ? r.json() : { results: [] })
        .then(data => (data.results as GouvernementEntreprise[]) || [])
        .catch(() => [] as GouvernementEntreprise[]);
    })
  );
  const all = results.flatMap(r => r);
  const unique = [...new Map(all.map(e => [e.siren, e])).values()];
  return unique.slice(0, 5);
}

// Recherche texte libre (fallback quand pas de code NAF ou 0 résultats)
async function fetchByText(query: string, dept?: string): Promise<GouvernementEntreprise[]> {
  const params = new URLSearchParams({ per_page: "5", q: query });
  if (dept) params.set("departement", dept);
  const res = await fetch(`https://recherche-entreprises.api.gouv.fr/search?${params}`);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results as GouvernementEntreprise[]) || [];
}

// Fallback intelligent : dept → national → texte dept → texte national
async function fetchGouvernement(sector: string, city: string): Promise<GouvernementEntreprise[]> {
  const dept = city ? cityToDept(city) : undefined;
  const nafCodesStr = sectorToNaf(sector);
  const nafCodes = nafCodesStr ? nafCodesStr.split(",").filter(Boolean) : [];

  if (nafCodes.length > 0) {
    // 1. NAF + département
    if (dept) {
      const res = await fetchByNafCodes(nafCodes, dept);
      if (res.length > 0) return res;
    }
    // 2. NAF sans département (national)
    const res = await fetchByNafCodes(nafCodes);
    if (res.length > 0) return res;
  }

  // 3. Texte libre + département
  if (dept) {
    const res = await fetchByText(sector, dept);
    if (res.length > 0) return res;
  }

  // 4. Texte libre sans département
  return fetchByText(`${sector} ${city || ""}`.trim());
}

// Enrichissement batch : un seul appel OpenAI pour toutes les entreprises
async function enrichBatchWithOpenAI(
  companies: Array<{ name: string; city: string; sector: string; role: string; size: string }>
): Promise<EnrichedData[]> {
  const list = companies
    .map((c, i) => `${i + 1}. "${c.name}" à ${c.city}, secteur ${c.sector}, taille ${c.size}, cible ${c.role}`)
    .join("\n");

  const prompt = `Pour ces ${companies.length} entreprises françaises, génère un tableau JSON (pas de markdown) :
${list}

Format exact : [{"contact":"prenom.nom@domaine.fr","phone":"+33 X XX XX XX XX","linkedin":"linkedin.com/company/slug","revenue":"X-YM€","score":85,"reason":"Raison courte du match"}, ...]
Score entre 72 et 95. Email réaliste basé sur le nom de l'entreprise.`;

  const defaultFor = (c: { name: string; sector: string; size: string; city: string }): EnrichedData => ({
    contact: `contact@${slugify(c.name)}.fr`,
    phone: "+33 1 00 00 00 00",
    linkedin: `linkedin.com/company/${slugify(c.name)}`,
    revenue: "N/C",
    score: 80,
    reason: `${c.name} est une entreprise ${c.size} active dans le secteur ${c.sector} à ${c.city}.`,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200 * companies.length,
    });
    const raw = (completion.choices[0].message.content || "[]").replace(/```json|```/g, "").trim();
    const parsed: EnrichedData[] = JSON.parse(raw);
    return companies.map((c, i) => {
      const d = parsed[i] || {};
      return {
        contact: d.contact || `contact@${slugify(c.name)}.fr`,
        phone: d.phone || "+33 1 00 00 00 00",
        linkedin: d.linkedin || `linkedin.com/company/${slugify(c.name)}`,
        revenue: d.revenue || "N/C",
        score: typeof d.score === "number" ? Math.min(95, Math.max(72, d.score)) : 80,
        reason: d.reason || `${c.name} correspond à vos critères de prospection.`,
      };
    });
  } catch {
    return companies.map(defaultFor);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = prospectSearchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const f = parsed.data;
    let prospects: object[] = [];

    try {
      const entreprises = await fetchGouvernement(f.sector, f.city);

      if (entreprises.length > 0) {
        // Prépare les métadonnées de chaque entreprise
        const companyMeta = entreprises.map(e => ({
          name: e.denomination || e.nom_complet || "Entreprise",
          tranche: e.siege?.tranche_effectif_salarie || e.tranche_effectif_salarie || "11",
          city: e.siege?.ville || f.city || "France",
          sector: f.sector || "B2B",
          role: f.targetRole || "Décideur",
        }));

        // Un seul appel OpenAI pour toutes les entreprises
        const enriched = await enrichBatchWithOpenAI(
          companyMeta.map(c => ({ ...c, size: generateSize(c.tranche) }))
        );

        prospects = companyMeta.map((c, i) => ({
          id: `p${i + 1}`,
          name: c.name,
          sector: c.sector,
          city: c.city,
          country: "France",
          score: enriched[i].score,
          size: generateSize(c.tranche),
          website: `www.${slugify(c.name)}.fr`,
          contact: enriched[i].contact,
          role: c.role,
          phone: enriched[i].phone,
          employees: generateEmployees(c.tranche),
          revenue: enriched[i].revenue,
          linkedin: enriched[i].linkedin,
          reason: enriched[i].reason,
        }));
      }
    } catch (apiErr) {
      console.error("[prospect-search] API gouv error:", apiErr);
    }

    if (prospects.length === 0) {
      return NextResponse.json({ prospects: [], total: 0, searchId: `search-${Date.now()}` });
    }

    const averageScore =
      Math.round(prospects.reduce((s: number, p) => s + (p as { score: number }).score, 0) / prospects.length);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminClient();
        const { data: entry, error } = await supabase
          .from("search_history")
          .insert({ query: JSON.stringify(f), results: prospects, credits_used: 2 })
          .select("id")
          .single();
        if (error) throw error;
        await supabase.from("activities").insert({
          type: "search",
          description: `Recherche ${f.sector} — ${f.city} : ${prospects.length} prospects, score moyen ${averageScore}/100`,
        });
        return NextResponse.json({ prospects, total: prospects.length, searchId: entry.id });
      } catch (err) {
        console.error("[prospect-search] Supabase error:", err);
      }
    }

    return NextResponse.json({ prospects, total: prospects.length, searchId: `search-${Date.now()}` });
  } catch (err) {
    console.error("[prospect-search] Error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
