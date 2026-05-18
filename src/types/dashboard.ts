export type ActivityType = "search" | "export" | "ai" | "enrichment";

export interface DashboardStats {
  searchesThisMonth: number;
  prospectsFound: number;
  averageScore: number;
  creditsRemaining: number;
  creditsTotal: number;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  createdAt: string;
}

export interface SearchHistoryItem {
  id: string;
  sector: string;
  city: string;
  prospectCount: number;
  averageScore: number;
  createdAt: string;
}

export interface PriorityProspect {
  id: string;
  name: string;
  city: string;
  sector: string;
  score: number;
}

export interface DashboardData {
  stats: DashboardStats;
  activities: ActivityItem[];
  searchHistory: SearchHistoryItem[];
  priorityProspects: PriorityProspect[];
  user: {
    name: string;
    email: string;
    plan: string;
  };
}
