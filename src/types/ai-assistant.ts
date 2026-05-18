export type AiTaskType = "summary" | "pitch" | "call-prep";

export interface AiProspectInput {
  companyName: string;
  sector: string;
  city: string;
  targetRole: string;
  context?: string;
}

export interface AiSummaryResult {
  headline: string;
  description: string;
  strengths: string[];
  opportunities: string[];
  creditsUsed: number;
}

export interface AiPitchResult {
  subject: string;
  body: string;
  cta: string;
  creditsUsed: number;
}

export interface AiCallPrepResult {
  openingLine: string;
  keyPoints: string[];
  objections: { objection: string; response: string }[];
  closingLine: string;
  creditsUsed: number;
}

export interface AiAssistRequest {
  task: AiTaskType;
  prospect: AiProspectInput;
}

export type AiAssistResult = AiSummaryResult | AiPitchResult | AiCallPrepResult;

export interface AiAssistResponse {
  task: AiTaskType;
  result: AiAssistResult;
}
