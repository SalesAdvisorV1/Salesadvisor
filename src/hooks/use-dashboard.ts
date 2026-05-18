"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { DashboardData } from "@/types/dashboard";

async function fetchDashboard(): Promise<DashboardData> {
  const res = await fetch("/api/dashboard");
  if (!res.ok) throw new Error("Impossible de charger le dashboard");
  return res.json();
}

export function useDashboard() {
  const setCredits = useCreditsStore((s) => s.setCredits);

  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (query.data?.stats) {
      setCredits(
        query.data.stats.creditsRemaining,
        query.data.stats.creditsTotal,
      );
    }
  }, [query.data?.stats, setCredits]);

  return query;
}
