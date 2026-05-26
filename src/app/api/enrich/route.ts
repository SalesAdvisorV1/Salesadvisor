import OpenAI from "openai";
import { z } from "zod";
import { mockEnrich } from "@/lib/mock/enrich";

const enrichSchema = z.object({
  companyName: z.string().min(1),
  sector: z.string().optional().default(""),
  city: z.string().optional().default(""),
  website: z.string().optional().default(""),
});

function isOpenAIConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY ?? "";
  return key.startsWith("sk-") && !key.includes("your-");
}

async function fetchWebsiteContent(url: string): Promise<string> {
  if (!url) return "";
  let normalizedUrl = url.trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) normalizedUrl = "https://" + normalizedUrl;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SalesAdvisor/1.0; +https://salesadvisorai.fr)",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return "";
    const html = await res.text();

    return html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#\d+;/g, "")
      .trim()
      .slice(0, 5000);
  } catch {
    return "";
  }
}

function buildPrompt(p: {
  companyName: string;
  sector: string;
  city: string;
  websiteContent: string;
}): string {
  return `Tu es un expert en intelligence commerciale B2B. Analyse cette entreprise et génère un enrichissement complet.

Entreprise : ${p.companyName}
Secteur : ${p.sector || "Non précisé"}
Ville : ${p.city || "France"}
${p.websiteContent ? `\nContenu extrait du site web :\n---\n${p.websiteContent}\n---` : "\n(Pas de contenu web — génère depuis le nom/secteur uniquement)"}

Réponds UNIQUEMENT en JSON valide avec cette structure :
{
  "company_name": "string",
  "sector": "string",
  "description": "string (2-3 phrases sur l'entreprise)",
  "size_estimate": "string (ex: 50-200 employés)",
  "score": number (0-100),
  "score_reasons": ["string", "string", "string"],
  "decision_makers": [
    {
      "name": "string",
      "title": "string",
      "confidence": "found" ou "inferred",
      "linkedin": "string ou null"
    }
  ],
  "email_draft": {
    "subject": "string",
    "body": "string (3 paragraphes B2B personnalisés)",
    "cta": "string"
  },
  "website_used": "string"
}

Règles : max 3 décideurs. "found" si nom réel trouvé dans le contenu, sinon "inferred". Score basé sur potentiel commercial B2B. Email percutant et personnalisé.`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = enrichSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: "Données invalides" }), { status: 400 });
  }

  const { companyName, sector, city, website } = parsed.data;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function emit(obj: object) {
        try {
          controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
        } catch { /* controller may already be closed */ }
      }

      function delay(ms: number) {
        return new Promise<void>((r) => setTimeout(r, ms));
      }

      try {
        // ── MOCK MODE ───────────────────────────────────────────────
        if (!isOpenAIConfigured()) {
          emit({ event: "step", step: 1, status: "loading", label: "Analyse du site web…" });
          await delay(900);
          emit({ event: "step", step: 1, status: "done", label: "Analyse du site web" });
          emit({ event: "step", step: 2, status: "loading", label: "Extraction des informations…" });
          await delay(600);
          emit({ event: "step", step: 2, status: "done", label: "Extraction des informations" });
          emit({ event: "step", step: 3, status: "loading", label: "Calcul du score IA…" });
          await delay(1300);
          emit({ event: "step", step: 4, status: "loading", label: "Détection des décideurs…" });
          await delay(1300);
          emit({ event: "step", step: 5, status: "loading", label: "Rédaction de l'email…" });
          await delay(1000);
          emit({ event: "step", step: 3, status: "done", label: "Calcul du score IA" });
          emit({ event: "step", step: 4, status: "done", label: "Décideurs identifiés" });
          emit({ event: "step", step: 5, status: "done", label: "Email généré" });
          emit({ event: "result", data: mockEnrich(companyName, website) });
          controller.close();
          return;
        }

        // ── REAL MODE ───────────────────────────────────────────────

        // Step 1 — Fetch website
        emit({ event: "step", step: 1, status: "loading", label: "Analyse du site web…" });
        const websiteContent = await fetchWebsiteContent(website);
        emit({ event: "step", step: 1, status: "done", label: "Analyse du site web" });

        // Step 2 — Parse
        emit({ event: "step", step: 2, status: "loading", label: "Extraction des informations…" });
        await delay(220);
        emit({ event: "step", step: 2, status: "done", label: "Extraction des informations" });

        // Step 3 — Start OpenAI + emit steps 4 & 5 during processing
        emit({ event: "step", step: 3, status: "loading", label: "Calcul du score IA…" });

        let step4Done = false;
        let step5Done = false;

        const t4 = setTimeout(() => {
          if (!step4Done) {
            step4Done = true;
            emit({ event: "step", step: 4, status: "loading", label: "Détection des décideurs…" });
          }
        }, 2500);

        const t5 = setTimeout(() => {
          if (!step5Done) {
            step5Done = true;
            emit({ event: "step", step: 5, status: "loading", label: "Rédaction de l'email…" });
          }
        }, 4500);

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Tu es un assistant d'intelligence commerciale B2B. Réponds uniquement en JSON valide, sans markdown.",
            },
            { role: "user", content: buildPrompt({ companyName, sector, city, websiteContent }) },
          ],
          temperature: 0.7,
          response_format: { type: "json_object" },
        });

        clearTimeout(t4);
        clearTimeout(t5);

        // Ensure all loading states shown before marking done
        if (!step4Done) emit({ event: "step", step: 4, status: "loading", label: "Décideurs…" });
        if (!step5Done) emit({ event: "step", step: 5, status: "loading", label: "Email…" });
        await delay(280);

        emit({ event: "step", step: 3, status: "done", label: "Score calculé" });
        emit({ event: "step", step: 4, status: "done", label: "Décideurs identifiés" });
        emit({ event: "step", step: 5, status: "done", label: "Email généré" });

        const raw = completion.choices[0]?.message?.content ?? "{}";
        const result = JSON.parse(raw) as Record<string, unknown>;
        if (website) result.website_used = website;

        emit({ event: "result", data: result });
      } catch (err) {
        console.error("[enrich] error:", err);
        emit({ event: "error", message: "Analyse indisponible. Réessaie dans un instant." });
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
