import { prospectSearchSchema } from "@/lib/schemas/prospect-search";
import { searchMockProspects } from "@/lib/mock/prospects";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = prospectSearchSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const prospects = searchMockProspects(parsed.data);
  const searchId = `search-${Date.now()}`;

  return Response.json({
    prospects,
    total: prospects.length,
    searchId,
  });
}
