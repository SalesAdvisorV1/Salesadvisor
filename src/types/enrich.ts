export interface EnrichDecisionMaker {
  name: string;
  title: string;
  confidence: "found" | "inferred";
  linkedin?: string | null;
}

export interface EnrichEmailDraft {
  subject: string;
  body: string;
  cta: string;
}

export interface EnrichmentResult {
  company_name: string;
  sector: string;
  description: string;
  size_estimate: string;
  score: number;
  score_reasons: string[];
  decision_makers: EnrichDecisionMaker[];
  email_draft: EnrichEmailDraft;
  website_used: string;
}

export type EnrichStreamEvent =
  | { event: "step"; step: number; status: "loading" | "done"; label: string }
  | { event: "result"; data: EnrichmentResult }
  | { event: "error"; message: string };
