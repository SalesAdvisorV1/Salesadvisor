export interface NavItem {
  href: string;
  label: string;
  description?: string;
}

export const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", description: "Vue d'ensemble" },
  {
    href: "/prospect-finder",
    label: "Prospect Finder",
    description: "Recherche B2B",
  },
  {
    href: "/ai-assistant",
    label: "Assistance IA",
    description: "Pitch & appels",
  },
  { href: "/history", label: "Historique", description: "Recherches passées" },
  { href: "/exports", label: "Exports", description: "Fichiers CSV" },
  { href: "/billing", label: "Facturation", description: "Crédits & plan" },
  { href: "/settings", label: "Paramètres", description: "Compte" },
];
