import type {
  ProspectResult,
  ProspectSearchFilters,
} from "@/types/prospect";

const prospectPool: Omit<ProspectResult, "reason">[] = [
  {
    id: "p-1",
    name: "Translog France",
    sector: "Logistique",
    city: "Paris",
    country: "France",
    score: 91,
    website: "translog.fr",
  },
  {
    id: "p-2",
    name: "Supply Expert",
    sector: "Transport",
    city: "Nanterre",
    country: "France",
    score: 88,
    website: "supply-expert.com",
  },
  {
    id: "p-3",
    name: "Quick Freight",
    sector: "Transport",
    city: "Lyon",
    country: "France",
    score: 84,
  },
  {
    id: "p-4",
    name: "Nord Cargo",
    sector: "Logistique",
    city: "Lille",
    country: "France",
    score: 82,
  },
  {
    id: "p-5",
    name: "Flow Chain",
    sector: "Supply chain",
    city: "Marseille",
    country: "France",
    score: 79,
  },
  {
    id: "p-6",
    name: "Euro Transit",
    sector: "Transport",
    city: "Bordeaux",
    country: "France",
    score: 86,
  },
];

function buildReason(prospect: Omit<ProspectResult, "reason">, filters: ProspectSearchFilters): string {
  const sectorMatch = prospect.sector
    .toLowerCase()
    .includes(filters.sector.toLowerCase().slice(0, 4));
  const cityMatch =
    prospect.city.toLowerCase() === filters.city.toLowerCase();

  if (sectorMatch && cityMatch) {
    return `Correspondance forte avec ${filters.sector} à ${filters.city}. Signaux de croissance détectés.`;
  }
  if (sectorMatch) {
    return `Secteur aligné sur « ${filters.sector} ». Présence confirmée en ${filters.country}.`;
  }
  return `Prospect qualifié dans la zone ${filters.radius} autour de ${filters.city}.`;
}

export function searchMockProspects(
  filters: ProspectSearchFilters,
): ProspectResult[] {
  const sectorLower = filters.sector.toLowerCase();

  const filtered = prospectPool.filter((p) => {
    const sectorOk =
      p.sector.toLowerCase().includes(sectorLower) ||
      sectorLower.includes(p.sector.toLowerCase().slice(0, 4));
    const cityOk =
      !filters.city ||
      p.city.toLowerCase().includes(filters.city.toLowerCase()) ||
      filters.city.length < 3;
    return sectorOk || cityOk;
  });

  const results = (filtered.length > 0 ? filtered : prospectPool).slice(0, 5);

  return results.map((p) => ({
    ...p,
    reason: buildReason(p, filters),
  }));
}
