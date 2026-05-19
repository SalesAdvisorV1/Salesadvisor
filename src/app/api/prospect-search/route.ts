import { NextResponse } from "next/server";
import { prospectSearchSchema } from "@/lib/schemas/prospect-search";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = prospectSearchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const f = parsed.data;

    const prompt = `5 entreprises B2B JSON pour: secteur=${f.sector}, ville=${f.city}, pays=${f.country}, taille=${f.companySize||"any"}, poste=${f.targetRole||"décideur"}.
Format JSON strict, tableau uniquement, pas de markdown:
[{"id":"p1","name":"...","sector":"...","city":"...","country":"...","score":85,"size":"PME","website":"...","contact":"prenom.nom@domaine.fr","role":"...","phone":"+33 1 XX XX XX XX","employees":"50-250","revenue":"8M€","linkedin":"linkedin.com/company/...","reason":"..."}]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 1200,
    });

    const raw = completion.choices[0].message.content || "[]";
    let prospects = [];
    try {
      prospects = JSON.parse(raw.replace(/```json|```/g, "").trim());
    } catch {
      return NextResponse.json({ error: "Erreur parsing IA" }, { status: 500 });
    }

    const averageScore = prospects.length > 0
      ? Math.round(prospects.reduce((s: number, p: { score: number }) => s + p.score, 0) / prospects.length)
      : 0;

    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminClient();
        const { data: entry, error } = await supabase
          .from("search_history")
          .insert({ query: JSON.stringify(f), results: prospects, credits_used: 2 })
          .select("id")
          .single();
        if (error) throw error;
        await supabase.from("activities").insert({
          type: "search",
          description: `Recherche ${f.sector} — ${f.city} : ${prospects.length} prospects, score moyen ${averageScore}/100`,
        });
        return NextResponse.json({ prospects, total: prospects.length, searchId: entry.id });
      } catch (err) {
        console.error("[prospect-search] Supabase error:", err);
      }
    }

    return NextResponse.json({ prospects, total: prospects.length, searchId: `search-${Date.now()}` });
  } catch (err) {
    console.error("[prospect-search] Error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
