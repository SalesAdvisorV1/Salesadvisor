import OpenAI from "openai";
import { z } from "zod";
import { mockAiAssist } from "@/lib/mock/ai-assistant";
import type { AiTaskType, AiAssistResult } from "@/types/ai-assistant";

const aiAssistSchema = z.object({
  task: z.enum(["summary", "pitch", "call-prep"]),
  prospect: z.object({
    companyName: z.string().min(1),
    sector: z.string().min(1),
    city: z.string().min(1),
    targetRole: z.string().optional().default(""),
    context: z.string().optional(),
  }),
});

const CREDIT_COSTS: Record<AiTaskType, number> = {
  summary: 1,
  pitch: 3,
  "call-prep": 2,
};

function buildPrompt(task: AiTaskType, p: { companyName: string; sector: string; city: string; targetRole: string; context?: string }): string {
  const base = `Entreprise : ${p.companyName}\nSecteur : ${p.sector}\nVille : ${p.city}\nRôle cible : ${p.targetRole || "non spécifié"}${p.context ? `\nContexte : ${p.context}` : ""}`;

  if (task === "summary") {
    return `Tu es expert en prospection B2B. Analyse ce prospect et réponds en JSON strict avec ces clés exactes :
{"headline":"string","description":"string","strengths":["string","string","string","string"],"opportunities":["string","string","string"]}

${base}`;
  }

  if (task === "pitch") {
    return `Tu es copywriter B2B expert. Génère un email de prospection percutant en français. Réponds en JSON strict :
{"subject":"string","body":"string","cta":"string"}

Le corps doit faire 4 paragraphes : accroche, problème/opportunité, preuve sociale, appel à l'action.

${base}`;
  }

  return `Tu es coach commercial B2B. Prépare une fiche d'appel en français. Réponds en JSON strict :
{"openingLine":"string","keyPoints":["string","string","string","string"],"objections":[{"objection":"string","response":"string"},{"objection":"string","response":"string"},{"objection":"string","response":"string"}],"closingLine":"string"}

${base}`;
}

function isOpenAIConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY ?? "";
  return key.startsWith("sk-") && !key.includes("your-");
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = aiAssistSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { task, prospect } = parsed.data;

  if (!isOpenAIConfigured()) {
    await new Promise((r) => setTimeout(r, 900));
    const response = mockAiAssist(task, prospect);
    return Response.json(response);
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Tu es un assistant de prospection commerciale B2B expert. Réponds uniquement en JSON valide, sans markdown ni texte supplémentaire.",
        },
        { role: "user", content: buildPrompt(task, prospect) },
      ],
      temperature: 0.75,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const result = JSON.parse(raw) as unknown as Record<string, unknown>;
    result.creditsUsed = CREDIT_COSTS[task];

    return Response.json({ task, result: result as unknown as AiAssistResult });
  } catch (err) {
    console.error("[ai-assist] OpenAI error:", err);
    return Response.json(
      { error: "Analyse IA indisponible. Vérifie ta clé OPENAI_API_KEY." },
      { status: 500 },
    );
  }
}
