import { NextResponse } from "next/server";
import { prospectSearchSchema } from "@/lib/schemas/prospect-search";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function generateEmployees(tranche: string): string {
  const map: Record<string, string> = {
    "0": "0", "1": "1-2", "2": "3-5", "3": "6-9",
    "11": "10-19", "12": "20-49", "21": "50-99", "22": "100-199",
    "31": "200-249", "32": "250-499", "41": "500-999", "42": "1000-1999",
    "51": "2000-4999", "52": "5000-9999", "53": "10000+",
  };
  return map[tranche] || "N/C";
}

function slugify(name: string): string {
  return name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const NAF_MAPPING: Record<string, string> = {
  logistique: "49.41A,52.10B,52.29B",
  transport: "49.41A,49.41B,49.42Z",
  tech: "62.01Z,62.02A,63.11Z",
  technologie: "62.01Z,62.02A,63.11Z",
  saas: "62.01Z,63.11Z",
  industrie: "25.11Z,25.12Z,25.50A",
  btp: "41.10A,41.20A,41.20B",
  commerce: "47.11A,47.11B,47.11D",
  sante: "86.10Z,86.21Z,86.22A",
  immobilier: "68.10Z,68.20A,68.31Z",
  finance: "64.11Z,64.19Z,64.91Z",
  conseil: "70.22Z,71.12B,74.90B",
  marketing: "73.11Z,73.12Z,73.19Z",
  restauration: "56.10A,56.10C,56.29A",
};

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

function normalizeCity(city: string): string {
  return city.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

interface GouvernementEntreprise {
  siren?: string;
  nom_complet?: string;
  denomination?: string;
  categorie_entreprise?: string;
  tranche_effectif_salarie?: string;
  libelle_activite_principale?: string;
  siege?: {
    ville?: string;
    code_postal?: string;
    departement?: string;
    tranche_effectif_salarie?: string;
  };
}

interface EnrichedData {
  contact: string;
  score: number;
  reason: string;
}

async function fetchGouvernement(sector: string, city: string): Promise<GouvernementEntreprise[]> {
  const dept = city ? cityToDept(city) : undefined;
  const sectorKey = sector.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[\s,]/)[0];
  const nafCodes = NAF_MAPPING[sectorKey];

  const queries: URLSearchParams[] = [];

  if (nafCodes) {
    for (const code of nafCodes.split(",").slice(0, 3)) {
      const p = new URLSearchParams({ per_page: "5", q: code });
      if (dept) p.set("departement", dept);
      queries.push(p);
    }
  } else {
    const p = new URLSearchParams({ per_page: "10", q: sector });
    if (dept) p.set("departement", dept);
    queries.push(p);
  }

  const results = await Promise.allSettled(
    queries.map(p =>
      fetch(`https://recherche-entreprises.api.gouv.fr/search?${p}`)
        .then(r => r.ok ? r.json() : { results: [] })
        .then((d: { results?: GouvernementEntreprise[] }) => (d.results || []) as GouvernementEntreprise[])
    )
  );

  const seen = new Set<string>();
  const all: GouvernementEntreprise[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") {
      for (const e of r.value) {
        const key = e.siren || e.nom_complet || "";
        if (key && !seen.has(key)) {
          seen.add(key);
          all.push(e);
        }
      }
    }
  }
  return all.slice(0, 15);
}

async function enrichBatchWithOpenAI(
  companies: Array<{ name: string; city: string; sector: string; role: string; size: string }>
): Promise<EnrichedData[]> {
  const list = companies
    .map((c, i) => `${i + 1}. "${c.name}" à ${c.city}, secteur ${c.sector}, taille ${c.size}, cible ${c.role}`)
    .join("\n");

  const prompt = `Pour ces ${companies.length} entreprises françaises, génère un tableau JSON (sans markdown) :
${list}

Format exact : [{"contact":"contact@domaine.fr","score":85,"reason":"Raison courte du match"}, ...]
Règles :
- contact : "contact@" suivi du domaine estimé du site de l'entreprise (ex: contact@acme.fr)
- score : entre 72 et 95 selon la pertinence réelle pour la cible
- reason : phrase courte expliquant pourquoi cette entreprise correspond
Ne retourne QUE le tableau JSON.`;

  const defaultFor = (c: { name: string; sector: string; size: string; city: string }): EnrichedData => ({
    contact: `contact@${slugify(c.name)}.fr`,
    score: 80,
    reason: `${c.name} est une entreprise ${c.size} active dans le secteur ${c.sector} à ${c.city}.`,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 120 * companies.length,
    });
    const raw = (completion.choices[0].message.content || "[]").replace(/```json|```/g, "").trim();
    const parsed: EnrichedData[] = JSON.parse(raw);
    return companies.map((c, i) => {
      const d = parsed[i] || {};
      return {
        contact: d.contact || `contact@${slugify(c.name)}.fr`,
        score: typeof d.score === "number" ? Math.min(95, Math.max(72, d.score)) : 80,
        reason: d.reason || `${c.name} correspond à vos critères de prospection.`,
      };
    });
  } catch {
    return companies.map(defaultFor);
  }
}

function filterBySize(entreprises: GouvernementEntreprise[], companySize: string | undefined): GouvernementEntreprise[] {
  if (!companySize) return entreprises;
  const size = companySize.toUpperCase();
  return entreprises.filter(e => {
    const cat = (e.categorie_entreprise || "").toUpperCase();
    if (size.includes("PME") && cat === "GE") return false;
    if (size.includes("ETI") && (cat === "GE" || cat === "TPE")) return false;
    return true;
  });
}

function sortByCity(entreprises: GouvernementEntreprise[], city: string): GouvernementEntreprise[] {
  if (!city) return entreprises;
  const dept = cityToDept(city);
  const normalizedCity = normalizeCity(city);

  return [...entreprises].sort((a, b) => {
    const scoreA = cityScore(a, normalizedCity, dept);
    const scoreB = cityScore(b, normalizedCity, dept);
    return scoreB - scoreA;
  });
}

function cityScore(e: GouvernementEntreprise, normalizedCity: string, dept: string | undefined): number {
  const siegeVille = normalizeCity(e.siege?.ville || "");
  const siegeDept = e.siege?.departement || "";
  if (siegeVille === normalizedCity) return 2;
  if (dept && siegeDept === dept) return 1;
  return 0;
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
      const rawEntreprises = await fetchGouvernement(f.sector, f.city);
      const filtered = filterBySize(rawEntreprises, f.companySize);
      const entreprises = sortByCity(filtered, f.city).slice(0, 10);

      if (entreprises.length > 0) {
        const companyMeta = entreprises.map(e => {
          const name = e.nom_complet || e.denomination || "Entreprise";
          const city = e.siege?.ville || f.city || "France";
          const tranche = e.siege?.tranche_effectif_salarie || e.tranche_effectif_salarie || "";
          const categorie = e.categorie_entreprise || "N/C";
          const sector = e.libelle_activite_principale || f.sector || "B2B";
          return { name, city, tranche, categorie, sector, role: f.targetRole || "Décideur" };
        });

        const enriched = await enrichBatchWithOpenAI(
          companyMeta.map(c => ({ name: c.name, city: c.city, sector: c.sector, role: c.role, size: c.categorie }))
        );

        prospects = companyMeta.map((c, i) => ({
          id: `p${i + 1}`,
          name: c.name,
          sector: c.sector,
          city: c.city,
          country: "France",
          score: enriched[i].score,
          size: c.categorie,
          website: null,
          contact: enriched[i].contact,
          role: c.role,
          phone: null,
          employees: generateEmployees(c.tranche),
          revenue: null,
          linkedin: null,
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
