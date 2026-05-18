import type { BillingData } from "@/types/billing";

export const mockBillingData: BillingData = {
  currentPlan: "pro",
  creditsRemaining: 92,
  creditsTotal: 100,
  renewalDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
  plans: [
    {
      id: "starter",
      name: "Starter",
      price: 29,
      period: "month",
      credits: 50,
      features: [
        "50 crédits / mois",
        "Prospect Finder",
        "Export CSV",
        "Support email",
      ],
      current: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 79,
      period: "month",
      credits: 200,
      features: [
        "200 crédits / mois",
        "Prospect Finder avancé",
        "Assistance IA (pitch + appel)",
        "Export CSV illimité",
        "Support prioritaire",
      ],
      current: true,
      highlighted: true,
    },
    {
      id: "business",
      name: "Business",
      price: 199,
      period: "month",
      credits: 600,
      features: [
        "600 crédits / mois",
        "Tout Pro inclus",
        "API access",
        "Multi-utilisateurs (jusqu'à 5)",
        "Onboarding dédié",
      ],
      current: false,
    },
  ],
  creditPacks: [
    { id: "pack-25", credits: 25, price: 9 },
    { id: "pack-100", credits: 100, price: 29, badge: "Populaire" },
    { id: "pack-300", credits: 300, price: 69, badge: "Meilleure valeur" },
  ],
};
