export interface Plan {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  credits: number;
  features: string[];
  current: boolean;
  highlighted?: boolean;
}

export interface CreditPack {
  id: string;
  credits: number;
  price: number;
  badge?: string;
}

export interface BillingData {
  currentPlan: string;
  creditsRemaining: number;
  creditsTotal: number;
  renewalDate: string;
  plans: Plan[];
  creditPacks: CreditPack[];
}
