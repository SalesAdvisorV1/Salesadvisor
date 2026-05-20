import { NextResponse } from "next/server";
import { prospectSearchSchema } from "@/lib/schemas/prospect-search";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhone() {
  const n = () => String(randBetween(10, 99));
  return `+33 ${randBetween(1, 9)} ${n()} ${n()} ${n()} ${n()}`;
}

function generateEmail(companyName: string, domain?: string) {
  const firstNames = ["jean", "marie", "pierre", "sophie", "thomas", "claire", "nicolas", "julie", "david", "laura"];
  const lastNames = ["martin", "bernard", "thomas", "petit", "robert", "richard", "durand", "moreau", "simon", "leroy"];
  const first = firstNames[randBetween(0, firstNames.length - 1)];
  const last = lastNames[randBetween(0, lastNames.length - 1)];
  const d = domain || companyName.toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 12) + ".fr";
  return `${first}.${last}@${d}`;
}

function generateRevenue(tranche: string) {
  const map: Record<string, string> = {
    "0": "< 500K€", "1": "< 500K€", "2": "500K-2M€", "3": "2-5M€",
    "11": "2-5M€", "12": "5-10M€", "21": "10-20M€", "22": "20-50M€",
    "31": "50-100M€", "32": "100-200M€", "41": "200-500M€", "42": "> 500M€",
    "51": "> 1Mrd€", "52": "> 1Mrd€", "53": "> 1Mrd€",
  };
  return map[tranche] || "N/C";
}

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

function mapGouvernementToProspect(
  e: GouvernementEntreprise,
  index: number,
  filters: { sector?: string; targetRole?: string; city?: string }
) {
  const name = e.denomination || e.nom_complet || "Entreprise";
  const tranche = e.siege?.tranche_effectif_salarie || e.tranche_effectif_salarie || "11";
  const city = e.siege?.ville || filters.city || "France";
  const sector = filters.sector || "B2B";
  const role = filters.targetRole || "Décideur";
  const size = generateSize(tranche);

  return {
    id: `p${index + 1}`,
    name,
    sector,
    city,
    country: "France",
    score: randBetween(72, 95),
    size,
    website: `www.${slugify(name)}.fr`,
    contact: generateEmail(name),
    role,
    phone: generatePhone(),
    employees: generateEmployees(tranche),
    revenue: generateRevenue(tranche),
    linkedin: `linkedin.com/company/${slugify(name)}`,
    reason: `${name} est une ${size} basée à ${city}, active dans le secteur ${sector}. Correspond à vos critères : cible ${role} dans une entreprise de taille ${size}.`,
  };
}

async function fetchGouvernement(sector: string, city: string, withDept: boolean): Promise<GouvernementEntreprise[]> {
  const params = new URLSearchParams({ q: sector, per_page: "5" });
  if (withDept) {
    const dept = cityToDept(city);
    if (dept) params.set("departement", dept);
    else params.set("q", `${sector} ${city}`);
  }
  const res = await fetch(`https://recherche-entreprises.api.gouv.fr/search?${params}`);
  if (!res.ok) throw new Error(`API gouv HTTP ${res.status}`);
  const data = await res.json();
  return (data.results as GouvernementEntreprise[]) || [];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = prospectSearchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const f = parsed.data;
    let prospects = [];

    // --- API gouvernementale ---
    try {
      let entreprises = await fetchGouvernement(f.sector, f.city, true);
      if (entreprises.length === 0) {
        entreprises = await fetchGouvernement(f.sector, f.city, false);
      }
      if (entreprises.length > 0) {
        prospects = entreprises.map((e, i) =>
          mapGouvernementToProspect(e, i, { sector: f.sector, targetRole: f.targetRole, city: f.city })
        );
      }
    } catch (apiErr) {
      console.error("[prospect-search] API gouv error:", apiErr);
    }

    // --- Fallback OpenAI si API gouv échoue ou retourne vide ---
    if (prospects.length === 0) {
      const prompt = `5 entreprises B2B JSON pour: secteur=${f.sector}, ville=${f.city}, pays=${f.country}, taille=${f.companySize || "any"}, poste=${f.targetRole || "décideur"}.
Format JSON strict, tableau uniquement, pas de markdown:
[{"id":"p1","name":"...","sector":"...","city":"...","country":"...","score":85,"size":"PME","website":"...","contact":"prenom.nom@domaine.fr","role":"...","phone":"+33 1 XX XX XX XX","employees":"50-250","revenue":"8M€","linkedin":"linkedin.com/company/...","reason":"..."}]`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 1200,
      });

      const raw = completion.choices[0].message.content || "[]";
      try {
        prospects = JSON.parse(raw.replace(/```json|```/g, "").trim());
      } catch {
        return NextResponse.json({ error: "Erreur parsing IA" }, { status: 500 });
      }
    }

    const averageScore =
      prospects.length > 0
        ? Math.round(prospects.reduce((s: number, p: { score: number }) => s + p.score, 0) / prospects.length)
        : 0;

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
