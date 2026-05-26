import { z } from "zod";
import type { DatabaseProspect, DatabaseSearchResponse } from "@/types/database-prospect";

const TRANCHE_LABELS: Record<string, string> = {
  "00": "0 salarié",
  "01": "1-2 salariés",
  "02": "3-5 salariés",
  "03": "6-9 salariés",
  "11": "10-19 salariés",
  "12": "20-49 salariés",
  "21": "50-99 salariés",
  "22": "100-199 salariés",
  "31": "200-249 salariés",
  "32": "250-499 salariés",
  "41": "500-999 salariés",
  "42": "1 000-1 999 salariés",
  "51": "2 000-4 999 salariés",
  "52": "5 000-9 999 salariés",
  "53": "10 000+ salariés",
};

const searchSchema = z.object({
  q: z.string().optional().default(""),
  activite_principale: z.string().optional().default(""),
  departement: z.string().optional().default(""),
  tranche_effectif_min: z.string().optional().default(""),
  tranche_effectif_max: z.string().optional().default(""),
  page: z.number().int().min(1).optional().default(1),
});

function normalizeAdresse(hit: Record<string, unknown>): string {
  const parts: string[] = [];
  const geo = hit.siege as Record<string, unknown> | undefined;
  if (!geo) return "";
  if (geo.numero_voie) parts.push(String(geo.numero_voie));
  if (geo.type_voie) parts.push(String(geo.type_voie));
  if (geo.libelle_voie) parts.push(String(geo.libelle_voie));
  return parts.join(" ");
}

function mapHit(hit: Record<string, unknown>): DatabaseProspect {
  const siege = (hit.siege ?? {}) as Record<string, unknown>;
  const tranche = String(hit.tranche_effectif_salarie ?? "");
  return {
    siren: String(hit.siren ?? ""),
    siret: String(siege.siret ?? hit.siren ?? ""),
    nom_complet: String(hit.nom_complet ?? hit.nom_raison_sociale ?? ""),
    nom_raison_sociale: String(hit.nom_raison_sociale ?? ""),
    activite_principale: String(hit.activite_principale ?? ""),
    libelle_activite_principale: String(hit.libelle_activite_principale ?? ""),
    tranche_effectif_salarie: tranche,
    libelle_tranche_effectif: TRANCHE_LABELS[tranche] ?? "",
    date_creation: String(hit.date_creation ?? ""),
    adresse: normalizeAdresse(hit),
    code_postal: String(siege.code_postal ?? ""),
    ville: String(siege.libelle_commune ?? ""),
    departement: String(siege.departement ?? ""),
    latitude: typeof siege.latitude === "number" ? siege.latitude : null,
    longitude: typeof siege.longitude === "number" ? siege.longitude : null,
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = searchSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Paramètres invalides" }, { status: 400 });
  }

  const { q, activite_principale, departement, tranche_effectif_min, tranche_effectif_max, page } =
    parsed.data;

  const PER_PAGE = 25;

  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (activite_principale) params.set("activite_principale", activite_principale);
  if (departement) params.set("departement", departement);
  if (tranche_effectif_min) params.set("tranche_effectif_min", tranche_effectif_min);
  if (tranche_effectif_max) params.set("tranche_effectif_max", tranche_effectif_max);
  params.set("page", String(page));
  params.set("per_page", String(PER_PAGE));
  // Only active establishments
  params.set("etat_administratif", "A");

  const url = `https://recherche-entreprises.api.gouv.fr/search?${params.toString()}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "SalesAdvisor/1.0 (contact: contact@salesadvisorai.fr)",
        Accept: "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return Response.json({ error: "Erreur API gouvernementale" }, { status: 502 });
    }

    const raw = await res.json();
    const hits: Record<string, unknown>[] = Array.isArray(raw.results) ? raw.results : [];
    const total: number = typeof raw.total_results === "number" ? raw.total_results : hits.length;

    const results: DatabaseProspect[] = hits.map((h) => mapHit(h));

    const response: DatabaseSearchResponse = {
      results,
      total,
      page,
      per_page: PER_PAGE,
    };

    return Response.json(response);
  } catch (err) {
    console.error("[database-search]", err);
    return Response.json({ error: "Recherche indisponible. Réessaie dans un instant." }, { status: 500 });
  }
}
