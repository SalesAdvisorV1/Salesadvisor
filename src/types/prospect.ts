export interface ProspectSearchFilters {
  sector: string;
  city: string;
  country: string;
  radius: string;
  companySize?: string;
  keywords?: string;
  targetRole?: string;
}

export interface ProspectResult {
  id: string;
  name: string;
  sector: string;
  city: string;
  country: string;
  score: number;
  reason: string;
  website?: string;
}

export interface ProspectSearchResponse {
  prospects: ProspectResult[];
  total: number;
  searchId: string;
}
