export interface DatabaseProspect {
  siren: string;
  siret: string;
  nom_complet: string;
  nom_raison_sociale: string;
  activite_principale: string;
  libelle_activite_principale: string;
  tranche_effectif_salarie: string;
  libelle_tranche_effectif: string;
  date_creation: string;
  adresse: string;
  code_postal: string;
  ville: string;
  departement: string;
  latitude: number | null;
  longitude: number | null;
}

export interface DatabaseSearchFilters {
  q?: string;
  activite_principale?: string;
  departement?: string;
  tranche_effectif_min?: string;
  tranche_effectif_max?: string;
  page?: number;
}

export interface DatabaseSearchResponse {
  results: DatabaseProspect[];
  total: number;
  page: number;
  per_page: number;
}
