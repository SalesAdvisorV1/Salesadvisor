import type { EnrichmentResult } from "@/types/enrich";

export function mockEnrich(companyName: string, website?: string): EnrichmentResult {
  return {
    company_name: companyName,
    sector: "Transport & Logistique",
    description: `${companyName} est une PME spécialisée dans la logistique B2B, opérant principalement en Île-de-France. L'entreprise se distingue par son parc de véhicules récents et sa maîtrise des délais de livraison. Sa croissance régulière ces 3 dernières années témoigne d'un positionnement solide sur son marché local.`,
    size_estimate: "50–200 employés",
    score: 82,
    score_reasons: [
      "Secteur logistique en forte croissance post-COVID",
      "PME locale avec budget IT décisionnel identifié",
      "Signaux d'expansion détectés (offres d'emploi, nouveaux services)",
    ],
    decision_makers: [
      {
        name: "Martin Delacroix",
        title: "Directeur Général",
        confidence: "inferred",
        linkedin: null,
      },
      {
        name: "Sophie Renard",
        title: "Responsable Commercial",
        confidence: "inferred",
        linkedin: null,
      },
      {
        name: "Thomas Vidal",
        title: "DSI / Responsable IT",
        confidence: "inferred",
        linkedin: null,
      },
    ],
    email_draft: {
      subject: `Optimisez la prospection de ${companyName} avec l'IA`,
      body: `Bonjour,\n\nJ'ai analysé le positionnement de ${companyName} et je pense que nous pouvons vous aider à accélérer votre développement commercial.\n\nDans le secteur logistique, les entreprises qui adoptent des outils IA de prospection constatent en moyenne +47% de prospects qualifiés en moins de 3 mois. Sales Advisor automatise l'identification des décideurs, la qualification des leads et la rédaction des emails de prospection.\n\nVous bénéficiez actuellement d'une période d'essai de 14 jours sans engagement. Seriez-vous disponible pour un échange de 20 minutes cette semaine ?\n\nCordialement,`,
      cta: "→ Essayer Sales Advisor gratuitement — 14 jours",
    },
    website_used: website ?? "",
  };
}
