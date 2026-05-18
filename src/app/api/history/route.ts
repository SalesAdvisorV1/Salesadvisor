import { mockHistory } from "@/lib/mock/history";

export async function GET() {
  return Response.json({
    entries: mockHistory,
    total: mockHistory.length,
  });
}
