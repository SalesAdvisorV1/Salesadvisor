import { mockBillingData } from "@/lib/mock/billing";

export async function GET() {
  return Response.json(mockBillingData);
}
