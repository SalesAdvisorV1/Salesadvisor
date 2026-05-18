import { z } from "zod";
import { mockAiAssist } from "@/lib/mock/ai-assistant";

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

  // Simulate processing delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const response = mockAiAssist(task, prospect);

  return Response.json(response);
}
