import { mockDashboardData } from "@/lib/mock/dashboard";

export async function GET() {
  return Response.json(mockDashboardData);
}
