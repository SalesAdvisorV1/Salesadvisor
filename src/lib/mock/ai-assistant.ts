import type {
  AiProspectInput,
  AiSummaryResult,
  AiPitchResult,
  AiCallPrepResult,
  AiTaskType,
  AiAssistResponse,
} from "@/types/ai-assistant";

function generateSummary(prospect: AiProspectInput): AiSummaryResult {
  return {
    headline: `${prospect.companyName} — acteur clé du secteur ${prospect.sector} en ${prospect.city}`,
    description: `${prospect.companyName} est une entreprise établie dans le secteur ${prospect.sector}, basée à ${prospect.city}. Elle présente des signaux d'activité récents et un potentiel de collaboration élevé selon les critères définis.`,
    strengths: [
      `Position établie dans le secteur ${prospect.sector}`,
      `Présence locale forte à ${prospect.city} et région`,
      "Croissance des effectifs détectée ces 12 derniers mois",
      "Budget décisionnel identifié au niveau direction",
    ],
    opportunities: [
      `Besoin probable en ${prospect.targetRole || "ressources externes"} non couvert`,
      "Phase d'expansion commerciale favorable à l'outreach",
      "Pas de prestataire identifié dans notre domaine",
    ],
    creditsUsed: 1,
  };
}

function generatePitch(prospect: AiProspectInput): AiPitchResult {
  return {
    subject: `${prospect.companyName} × votre solution — 5 min pour vous convaincre`,
    body: `Bonjour,

J'ai analysé la situation de ${prospect.companyName} dans le secteur ${prospect.sector} et j'ai identifié une opportunité concrète.

Votre entreprise est en pleine expansion à ${prospect.city}. Nous aidons des acteurs comme vous à accélérer leur prospection B2B grâce à l'IA — sans les coûts d'une équipe commerciale complète.

Concrètement, nous avons aidé des entreprises similaires à :
• Réduire le temps de qualification des prospects de 60 %
• Augmenter le taux de conversion des cold calls de 35 %
• Identifier des comptes prioritaires invisibles sur les radars classiques

Seriez-vous disponible pour un appel de 15 minutes cette semaine ?`,
    cta: "Réserver un créneau →",
    creditsUsed: 3,
  };
}

function generateCallPrep(prospect: AiProspectInput): AiCallPrepResult {
  return {
    openingLine: `Bonjour, je me permets de vous contacter car j'ai analysé l'activité de ${prospect.companyName} dans le secteur ${prospect.sector} et j'ai identifié quelques opportunités intéressantes pour vous.`,
    keyPoints: [
      `Mentionner la croissance récente de ${prospect.companyName} à ${prospect.city}`,
      `Lier notre solution aux enjeux du secteur ${prospect.sector} en 2024-2025`,
      "Proposer une démonstration personnalisée sous 48h",
      "Avoir un ROI concret à chiffrer (gain de temps, économies)",
    ],
    objections: [
      {
        objection: "Nous avons déjà une solution en place.",
        response: `Parfait, cela me confirme que vous êtes sensible à ce sujet. Notre différence : nous nous intégrons avec vos outils actuels et ajoutons une couche IA que la plupart des solutions n'ont pas encore. Je serais curieux de comparer en 10 minutes.`,
      },
      {
        objection: "Ce n'est pas le bon moment.",
        response: `Je comprends totalement. Est-ce que je peux vous envoyer un résumé rapide par mail ? Comme ça vous avez l'info disponible quand le timing sera meilleur — ça prend 2 minutes à lire.`,
      },
      {
        objection: "C'est trop cher.",
        response: `La question du prix est légitime. Nos clients voient en général un retour sur investissement en moins de 3 mois. Je peux vous montrer un calcul concret basé sur votre volume actuel si vous le souhaitez.`,
      },
    ],
    closingLine: `Alors, est-ce qu'on peut bloquer 15 minutes cette semaine pour que je vous montre concrètement ce que ça donnerait pour ${prospect.companyName} ?`,
    creditsUsed: 2,
  };
}

export function mockAiAssist(
  task: AiTaskType,
  prospect: AiProspectInput,
): AiAssistResponse {
  switch (task) {
    case "summary":
      return { task, result: generateSummary(prospect) };
    case "pitch":
      return { task, result: generatePitch(prospect) };
    case "call-prep":
      return { task, result: generateCallPrep(prospect) };
  }
}
