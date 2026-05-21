import { NextResponse } from "next/server";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, amount } = body;

  if (!userId || !amount || !isSupabaseConfigured()) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    await supabase.rpc("decrement_credits", { user_id: userId, amount });

    const { data } = await supabase
      .from("profiles")
      .select("credits_remaining")
      .eq("id", userId)
      .single();

    return NextResponse.json({ success: true, newBalance: data?.credits_remaining ?? 0 });
  } catch (err) {
    console.error("[credits/decrement] Error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
