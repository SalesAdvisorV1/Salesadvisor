import type { ProspectResult } from "./prospect";

export interface HistoryEntry {
  id: string;
  sector: string;
  city: string;
  country: string;
  radius: string;
  companySize?: string;
  keywords?: string;
  targetRole?: string;
  prospectCount: number;
  averageScore: number;
  prospects: ProspectResult[];
  createdAt: string;
}

export interface HistoryListResponse {
  entries: HistoryEntry[];
  total: number;
}
