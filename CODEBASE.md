# CODEBASE — salesadvisor/src

> Généré automatiquement le 2026-05-19. Contient **tous** les fichiers du dossier `src/`.

---

## Table des matières

- [`src/app/(app)/ai-assistant/page.tsx`](#src-app-(app)-ai-assistant-page-tsx)
- [`src/app/(app)/billing/page.tsx`](#src-app-(app)-billing-page-tsx)
- [`src/app/(app)/dashboard/page.tsx`](#src-app-(app)-dashboard-page-tsx)
- [`src/app/(app)/exports/page.tsx`](#src-app-(app)-exports-page-tsx)
- [`src/app/(app)/history/page.tsx`](#src-app-(app)-history-page-tsx)
- [`src/app/(app)/layout.tsx`](#src-app-(app)-layout-tsx)
- [`src/app/(app)/prospect-finder/page.tsx`](#src-app-(app)-prospect-finder-page-tsx)
- [`src/app/(app)/settings/page.tsx`](#src-app-(app)-settings-page-tsx)
- [`src/app/api/ai-assist/route.ts`](#src-app-api-ai-assist-route-ts)
- [`src/app/api/billing/route.ts`](#src-app-api-billing-route-ts)
- [`src/app/api/dashboard/route.ts`](#src-app-api-dashboard-route-ts)
- [`src/app/api/history/route.ts`](#src-app-api-history-route-ts)
- [`src/app/api/prospect-search/route.ts`](#src-app-api-prospect-search-route-ts)
- [`src/app/favicon.ico`](#src-app-favicon-ico)
- [`src/app/globals.css`](#src-app-globals-css)
- [`src/app/layout.tsx`](#src-app-layout-tsx)
- [`src/app/page.tsx`](#src-app-page-tsx)
- [`src/components/ai-assistant/ai-assistant-view.tsx`](#src-components-ai-assistant-ai-assistant-view-tsx)
- [`src/components/ai-assistant/ai-result-card.tsx`](#src-components-ai-assistant-ai-result-card-tsx)
- [`src/components/ai-assistant/prospect-input-form.tsx`](#src-components-ai-assistant-prospect-input-form-tsx)
- [`src/components/billing/billing-view.tsx`](#src-components-billing-billing-view-tsx)
- [`src/components/billing/credit-pack-card.tsx`](#src-components-billing-credit-pack-card-tsx)
- [`src/components/billing/plan-card.tsx`](#src-components-billing-plan-card-tsx)
- [`src/components/dashboard/activity-feed.tsx`](#src-components-dashboard-activity-feed-tsx)
- [`src/components/dashboard/credits-overview.tsx`](#src-components-dashboard-credits-overview-tsx)
- [`src/components/dashboard/dashboard-header.tsx`](#src-components-dashboard-dashboard-header-tsx)
- [`src/components/dashboard/dashboard-skeleton.tsx`](#src-components-dashboard-dashboard-skeleton-tsx)
- [`src/components/dashboard/dashboard-view.tsx`](#src-components-dashboard-dashboard-view-tsx)
- [`src/components/dashboard/priority-prospects.tsx`](#src-components-dashboard-priority-prospects-tsx)
- [`src/components/dashboard/search-history-panel.tsx`](#src-components-dashboard-search-history-panel-tsx)
- [`src/components/dashboard/stat-card.tsx`](#src-components-dashboard-stat-card-tsx)
- [`src/components/exports/exports-view.tsx`](#src-components-exports-exports-view-tsx)
- [`src/components/history/history-detail.tsx`](#src-components-history-history-detail-tsx)
- [`src/components/history/history-table.tsx`](#src-components-history-history-table-tsx)
- [`src/components/history/history-view.tsx`](#src-components-history-history-view-tsx)
- [`src/components/layout/app-shell.tsx`](#src-components-layout-app-shell-tsx)
- [`src/components/layout/mobile-nav.tsx`](#src-components-layout-mobile-nav-tsx)
- [`src/components/layout/sidebar.tsx`](#src-components-layout-sidebar-tsx)
- [`src/components/prospect-finder/prospect-finder-view.tsx`](#src-components-prospect-finder-prospect-finder-view-tsx)
- [`src/components/prospect-finder/prospect-result-card.tsx`](#src-components-prospect-finder-prospect-result-card-tsx)
- [`src/components/prospect-finder/prospect-search-form.tsx`](#src-components-prospect-finder-prospect-search-form-tsx)
- [`src/components/providers/query-provider.tsx`](#src-components-providers-query-provider-tsx)
- [`src/components/settings/settings-view.tsx`](#src-components-settings-settings-view-tsx)
- [`src/hooks/use-dashboard.ts`](#src-hooks-use-dashboard-ts)
- [`src/lib/format.ts`](#src-lib-format-ts)
- [`src/lib/mock/ai-assistant.ts`](#src-lib-mock-ai-assistant-ts)
- [`src/lib/mock/billing.ts`](#src-lib-mock-billing-ts)
- [`src/lib/mock/dashboard.ts`](#src-lib-mock-dashboard-ts)
- [`src/lib/mock/history.ts`](#src-lib-mock-history-ts)
- [`src/lib/mock/prospects.ts`](#src-lib-mock-prospects-ts)
- [`src/lib/navigation.ts`](#src-lib-navigation-ts)
- [`src/lib/schemas/ai-assist.ts`](#src-lib-schemas-ai-assist-ts)
- [`src/lib/schemas/prospect-search.ts`](#src-lib-schemas-prospect-search-ts)
- [`src/lib/supabase/client.ts`](#src-lib-supabase-client-ts)
- [`src/lib/supabase/server.ts`](#src-lib-supabase-server-ts)
- [`src/stores/use-credits-store.ts`](#src-stores-use-credits-store-ts)
- [`src/types/ai-assistant.ts`](#src-types-ai-assistant-ts)
- [`src/types/billing.ts`](#src-types-billing-ts)
- [`src/types/dashboard.ts`](#src-types-dashboard-ts)
- [`src/types/history.ts`](#src-types-history-ts)
- [`src/types/prospect.ts`](#src-types-prospect-ts)

---

## `src/app/(app)/ai-assistant/page.tsx`

```tsx
import { AiAssistantView } from "@/components/ai-assistant/ai-assistant-view";

export const metadata = { title: "Assistance IA — Sales Advisor" };

export default function AiAssistantPage() {
  return <AiAssistantView />;
}

```

---

## `src/app/(app)/billing/page.tsx`

```tsx
import { BillingView } from "@/components/billing/billing-view";

export const metadata = { title: "Facturation — Sales Advisor" };

export default function BillingPage() {
  return <BillingView />;
}

```

---

## `src/app/(app)/dashboard/page.tsx`

```tsx
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default function DashboardPage() {
  return <DashboardView />;
}

```

---

## `src/app/(app)/exports/page.tsx`

```tsx
import { ExportsView } from "@/components/exports/exports-view";

export const metadata = { title: "Exports CSV — Sales Advisor" };

export default function ExportsPage() {
  return <ExportsView />;
}

```

---

## `src/app/(app)/history/page.tsx`

```tsx
import { HistoryView } from "@/components/history/history-view";

export const metadata = { title: "Historique — Sales Advisor" };

export default function HistoryPage() {
  return <HistoryView />;
}

```

---

## `src/app/(app)/layout.tsx`

```tsx
import { AppShell } from "@/components/layout/app-shell";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShell>{children}</AppShell>;
}

```

---

## `src/app/(app)/prospect-finder/page.tsx`

```tsx
import { ProspectFinderView } from "@/components/prospect-finder/prospect-finder-view";

export default function ProspectFinderPage() {
  return <ProspectFinderView />;
}

```

---

## `src/app/(app)/settings/page.tsx`

```tsx
import { SettingsView } from "@/components/settings/settings-view";

export const metadata = { title: "Paramètres — Sales Advisor" };

export default function SettingsPage() {
  return <SettingsView />;
}

```

---

## `src/app/api/ai-assist/route.ts`

```ts
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

```

---

## `src/app/api/billing/route.ts`

```ts
import { mockBillingData } from "@/lib/mock/billing";

export async function GET() {
  return Response.json(mockBillingData);
}

```

---

## `src/app/api/dashboard/route.ts`

```ts
import { mockDashboardData } from "@/lib/mock/dashboard";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { DashboardData } from "@/types/dashboard";
import type { ProspectResult } from "@/types/prospect";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return Response.json(mockDashboardData);
  }

  try {
    const supabase = createAdminClient();
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [searchesRes, activitiesRes, recentHistoryRes] = await Promise.all([
      supabase
        .from("search_history")
        .select("id, results, created_at")
        .gte("created_at", startOfMonth.toISOString()),
      supabase
        .from("activities")
        .select("id, type, description, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("search_history")
        .select("id, query, results, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    const searches = searchesRes.data ?? [];
    const activities = activitiesRes.data ?? [];
    const recentHistory = recentHistoryRes.data ?? [];

    const allProspects = searches.flatMap((r) => (r.results as ProspectResult[]) ?? []);
    const prospectsFound = allProspects.length;
    const averageScore =
      allProspects.length > 0
        ? Math.round(allProspects.reduce((s, p) => s + p.score, 0) / allProspects.length)
        : 0;

    const searchHistoryItems = recentHistory.map((row) => {
      const filters = safeParseFilters(row.query);
      const results = (row.results as ProspectResult[]) ?? [];
      const avg =
        results.length > 0
          ? Math.round(results.reduce((s, p) => s + p.score, 0) / results.length)
          : 0;
      return {
        id: row.id,
        sector: filters.sector ?? "—",
        city: filters.city ?? "—",
        prospectCount: results.length,
        averageScore: avg,
        createdAt: row.created_at,
      };
    });

    const topProspects = recentHistory
      .flatMap((row) => (row.results as ProspectResult[]) ?? [])
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((p) => ({ id: p.id, name: p.name, city: p.city, sector: p.sector, score: p.score }));

    const data: DashboardData = {
      user: mockDashboardData.user,
      stats: {
        searchesThisMonth: searches.length,
        prospectsFound,
        averageScore,
        creditsRemaining: mockDashboardData.stats.creditsRemaining,
        creditsTotal: mockDashboardData.stats.creditsTotal,
      },
      activities:
        activities.length > 0
          ? activities.map((a) => ({
              id: a.id,
              type: a.type as DashboardData["activities"][number]["type"],
              title: a.description.split(" : ")[0] ?? a.description,
              description: a.description.split(" : ")[1] ?? "",
              createdAt: a.created_at,
            }))
          : mockDashboardData.activities,
      searchHistory:
        searchHistoryItems.length > 0
          ? searchHistoryItems
          : mockDashboardData.searchHistory,
      priorityProspects:
        topProspects.length > 0
          ? topProspects
          : mockDashboardData.priorityProspects,
    };

    return Response.json(data);
  } catch (err) {
    console.error("[dashboard] Supabase error:", err);
    return Response.json(mockDashboardData);
  }
}

function safeParseFilters(query: string | null): Record<string, string> {
  try {
    return query ? JSON.parse(query) : {};
  } catch {
    return {};
  }
}

```

---

## `src/app/api/history/route.ts`

```ts
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { HistoryEntry } from "@/types/history";
import type { ProspectResult } from "@/types/prospect";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return Response.json({ entries: [] });
  }

  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("search_history")
      .select("id, query, results, credits_used, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    if ((data ?? []).length === 0) {
      return Response.json({ entries: [] });
    }

    const entries: HistoryEntry[] = (data ?? []).map((row) => {
      console.log("[history] raw row:", JSON.stringify(row));
      const filters = safeParseFilters(row.id, row.query);
      const prospects = (row.results as ProspectResult[]) ?? [];
      const averageScore =
        prospects.length > 0
          ? Math.round(prospects.reduce((s, p) => s + p.score, 0) / prospects.length)
          : 0;

      return {
        id: row.id,
        sector: filters.sector ?? "—",
        city: filters.city ?? "—",
        country: filters.country ?? "France",
        radius: filters.radius ?? "50 km",
        companySize: filters.companySize,
        keywords: filters.keywords,
        targetRole: filters.targetRole,
        prospectCount: prospects.length,
        averageScore,
        prospects,
        createdAt: row.created_at,
      };
    });

    return Response.json({ entries, total: entries.length });
  } catch (err) {
    console.error("[history] Supabase error:", err);
    return Response.json({ entries: [] });
  }
}

function safeParseFilters(rowId: string, query: string | null): Record<string, string> {
  try {
    return query ? JSON.parse(query) : {};
  } catch (err) {
    console.error(`[history] JSON parse failed for row ${rowId}, raw query:`, query, "error:", err);
    return {};
  }
}

```

---

## `src/app/api/prospect-search/route.ts`

```ts
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

```

---

## `src/app/favicon.ico`

> Impossible de lire ce fichier : 'utf-8' codec can't decode byte 0x96 in position 50: invalid start byte

---

## `src/app/globals.css`

```css
@import "tailwindcss";

@source "..";

html {
  scroll-behavior: smooth;
}

body {
  background: #000000;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.02em;
}

/* Grid background pattern */
.grid-bg {
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.04) 1px,
    transparent 0
  );
  background-size: 40px 40px;
}

/* Cards */
.card {
  background: #0a0a0a;
  border: 1px solid #1a1a1a;
  border-radius: 16px;
}

.card-hover {
  background: #0a0a0a;
  border: 1px solid #1a1a1a;
  border-radius: 16px;
  transition: border-color 0.2s, background 0.2s;
}
.card-hover:hover {
  background: #111111;
  border-color: #2a2a2a;
}

/* Glass effect */
.glass {
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #ffffff 0%, #888888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Noise texture overlay */
.noise {
  position: relative;
}
.noise::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  border-radius: inherit;
}

.text-balance {
  text-wrap: balance;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: #000;
}
::-webkit-scrollbar-thumb {
  background: #222;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #333;
}

/* Animated gradient border */
@keyframes border-spin {
  from { --border-angle: 0turn; }
  to { --border-angle: 1turn; }
}

/* Fade in animation */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up 0.5s ease forwards;
}

.animate-fade-up-delay-1 {
  animation: fade-up 0.5s 0.1s ease both;
}

.animate-fade-up-delay-2 {
  animation: fade-up 0.5s 0.2s ease both;
}

.animate-fade-up-delay-3 {
  animation: fade-up 0.5s 0.3s ease both;
}

```

---

## `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Advisor",
  description: "Smart Prospect Finder pour commerciaux B2B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
```

---

## `src/app/page.tsx`

```tsx
'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">

      {/* Header fixe */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shrink-0">
              <span className="text-black text-xs font-black leading-none">SA</span>
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">Sales Advisor</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors duration-200">Fonctionnalités</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-200">Tarifs</a>
            <a href="#stats" className="hover:text-white transition-colors duration-200">À propos</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hidden sm:block">
              Se connecter
            </Link>
            <Link
              href="/dashboard"
              className="text-sm bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-sm"
            >
              Commencer →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-44 pb-36 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-1.5 text-xs text-gray-400 mb-10 bg-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block"></span>
            Propulsé par GPT-4o · Données B2B en temps réel
          </div>

          <h1 className="text-[72px] leading-[1.05] font-black tracking-tight mb-6 text-white">
            Prospectez plus vite,<br />
            <span className="text-gray-400">vendez mieux.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Sales Advisor combine recherche B2B et intelligence artificielle pour identifier, qualifier et approcher les bons prospects en quelques secondes.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/dashboard"
              className="bg-white text-black px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all duration-200 shadow-md"
            >
              Commencer gratuitement
            </Link>
            <a
              href="#pricing"
              className="border border-white/15 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/5 hover:border-white/30 transition-all duration-200"
            >
              Voir les tarifs
            </a>
          </div>

          <p className="text-xs text-gray-600 mt-5">Pas de carte bancaire requise · Accès immédiat</p>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="border-y border-white/8 py-16 bg-white/[0.015]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/8">
            {[
              ['2 000+', 'Prospects par mois'],
              ['95 %', 'Précision des données'],
              ['< 5 s', 'Temps de recherche'],
              ['GPT-4o', 'Modèle IA utilisé'],
            ].map(([value, label]) => (
              <div key={label} className="text-center px-8 py-4">
                <p className="text-3xl font-black text-white mb-1">{value}</p>
                <p className="text-xs text-gray-500 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-medium">Fonctionnalités</p>
            <h2 className="text-5xl font-black tracking-tight text-white mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-gray-400 text-base max-w-md mx-auto">Un outil complet conçu pour les équipes commerciales modernes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '◈',
                tag: 'Prospection',
                title: 'Prospect Finder',
                desc: 'Trouvez vos prospects B2B qualifiés en quelques secondes. Filtrez par secteur, taille d\'entreprise, ville et poste ciblé.',
                detail: 'Données vérifiées · Export CSV',
              },
              {
                icon: '✦',
                tag: 'Intelligence Artificielle',
                title: 'Assistance IA',
                desc: 'Générez des pitchs sur-mesure, préparez vos appels et obtenez des fiches de synthèse complètes sur chaque prospect.',
                detail: 'Propulsé par GPT-4o',
              },
              {
                icon: '▣',
                tag: 'Analytics',
                title: 'Dashboard & Suivi',
                desc: 'Visualisez vos performances, suivez vos crédits et analysez toute votre activité depuis un tableau de bord centralisé.',
                detail: 'Historique complet · Statistiques',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group border border-white/10 rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                <div className="text-xl text-gray-300 mb-5 font-mono">{f.icon}</div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-semibold">{f.tag}</p>
                <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{f.desc}</p>
                <div className="mt-6 pt-5 border-t border-white/8">
                  <span className="text-xs text-gray-600">{f.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-36 px-6 border-t border-white/8 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-medium">Tarifs</p>
            <h2 className="text-5xl font-black tracking-tight text-white mb-4">Simple et transparent</h2>
            <p className="text-gray-400 text-base max-w-md mx-auto">Choisissez le plan adapté à votre activité. Sans engagement.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: 'Starter',
                price: '9',
                desc: 'Pour démarrer',
                credits: '100 crédits / mois',
                features: ['Prospect Finder', 'Assistance IA', 'Export CSV', 'Support email'],
                highlight: false,
              },
              {
                name: 'Pro',
                price: '39',
                desc: 'Pour les commerciaux actifs',
                credits: '500 crédits / mois',
                features: ['Tout Starter', 'Pitchs personnalisés', 'Préparation d\'appel', 'Support prioritaire'],
                highlight: true,
              },
              {
                name: 'Business',
                price: '129',
                desc: 'Pour les équipes',
                credits: '2 000 crédits / mois',
                features: ['Tout Pro', 'Multi-utilisateurs', 'Accès API', 'Intégrations CRM'],
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border flex flex-col relative ${
                  plan.highlight
                    ? 'bg-white text-black border-white shadow-2xl scale-[1.02]'
                    : 'bg-white/[0.02] border-white/10 text-white'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 whitespace-nowrap">
                    Le plus populaire
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-xl font-black mb-1 ${plan.highlight ? 'text-black' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlight ? 'text-black/50' : 'text-gray-500'}`}>{plan.desc}</p>
                </div>

                <div className="mb-6">
                  <span className={`text-5xl font-black ${plan.highlight ? 'text-black' : 'text-white'}`}>
                    {plan.price}€
                  </span>
                  <span className={`text-sm ml-1 ${plan.highlight ? 'text-black/50' : 'text-gray-500'}`}>/mois</span>
                  <p className={`text-xs mt-1.5 ${plan.highlight ? 'text-black/50' : 'text-gray-600'}`}>
                    {plan.credits}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-center gap-2.5 ${plan.highlight ? 'text-black' : 'text-gray-300'}`}>
                      <span className={`text-xs font-bold ${plan.highlight ? 'text-black/50' : 'text-gray-500'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/dashboard"
                  className={`block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-black text-white hover:bg-gray-900'
                      : 'bg-white/8 text-white border border-white/15 hover:bg-white/15 hover:border-white/25'
                  }`}
                >
                  Choisir {plan.name}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-600 mt-10">
            Tous les plans incluent 14 jours d'essai gratuit · Résiliez à tout moment
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-36 px-6 border-t border-white/8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl font-black tracking-tight text-white mb-5">Prêt à prospecter autrement ?</h2>
          <p className="text-gray-400 mb-10 text-base leading-relaxed">
            Rejoignez les commerciaux qui utilisent Sales Advisor pour trouver et convertir leurs prospects plus rapidement.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-white text-black px-9 py-4 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all duration-200 shadow-lg"
          >
            Commencer gratuitement →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
              <span className="text-black text-[9px] font-black leading-none">SA</span>
            </div>
            <span className="font-medium text-gray-400">Sales Advisor</span>
          </div>

          <p className="text-xs">© 2025 Sales Advisor. Tous droits réservés.</p>

          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">CGU</a>
            <a href="mailto:contact@salesadvisor.io" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

```

---

## `src/components/ai-assistant/ai-assistant-view.tsx`

```tsx
"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiResultCard } from "@/components/ai-assistant/ai-result-card";
import { ProspectInputForm } from "@/components/ai-assistant/prospect-input-form";
import type { AiProspectFormValues } from "@/lib/schemas/ai-assist";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { AiAssistResponse, AiTaskType } from "@/types/ai-assistant";

const taskCosts: Record<AiTaskType, number> = {
  summary: 1,
  pitch: 3,
  "call-prep": 2,
};

async function runAiAssist(
  task: AiTaskType,
  prospect: AiProspectFormValues,
): Promise<AiAssistResponse> {
  const res = await fetch("/api/ai-assist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, prospect }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Analyse impossible");
  }

  return res.json();
}

export function AiAssistantView() {
  const [selectedTask, setSelectedTask] = useState<AiTaskType>("summary");
  const { remaining, consume, initialized } = useCreditsStore();

  const mutation = useMutation({
    mutationFn: ({ task, prospect }: { task: AiTaskType; prospect: AiProspectFormValues }) =>
      runAiAssist(task, prospect),
    onSuccess: (_data, variables) => {
      consume(taskCosts[variables.task]);
    },
  });

  const handleSubmit = (values: AiProspectFormValues, task: AiTaskType) => {
    const cost = taskCosts[task];
    if (initialized && remaining < cost) return;
    mutation.mutate({ task, prospect: values });
  };

  const insufficientCredits =
    initialized && remaining < taskCosts[selectedTask];

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-500">Module 3</p>
        <h1 className="mt-1 text-3xl font-semibold">Assistance IA</h1>
        <p className="mt-2 max-w-3xl text-slate-400">
          Génère un résumé prospect, un pitch personnalisé ou une préparation
          d'appel en quelques secondes.
        </p>
      </header>

      {insufficientCredits ? (
        <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Crédits insuffisants ({remaining} restants) pour cette analyse (
          {taskCosts[selectedTask]} cr. requis).
        </div>
      ) : null}

      {mutation.isError ? (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {(mutation.error as Error).message}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <ProspectInputForm
          onSubmit={handleSubmit}
          isLoading={mutation.isPending}
          selectedTask={selectedTask}
          onTaskChange={setSelectedTask}
        />

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Résultat IA</h2>
            {mutation.data ? (
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                Généré
              </span>
            ) : null}
          </div>

          <div className="mt-6">
            {mutation.isPending ? (
              <AiLoadingState />
            ) : mutation.data ? (
              <AiResultCard response={mutation.data} />
            ) : (
              <AiEmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AiEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
        ✦
      </div>
      <p className="mt-4 font-medium text-slate-300">
        Lance une analyse pour voir les résultats
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Remplis le formulaire à gauche et choisis un type d'analyse.
      </p>
    </div>
  );
}

function AiLoadingState() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-20 rounded-2xl bg-slate-800/60" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-32 rounded-2xl bg-slate-800/60" />
        <div className="h-32 rounded-2xl bg-slate-800/60" />
      </div>
      <div className="h-16 rounded-2xl bg-slate-800/60" />
      <p className="text-center text-sm text-slate-500">Analyse IA en cours…</p>
    </div>
  );
}

```

---

## `src/components/ai-assistant/ai-result-card.tsx`

```tsx
import type {
  AiAssistResponse,
  AiSummaryResult,
  AiPitchResult,
  AiCallPrepResult,
} from "@/types/ai-assistant";

export function AiResultCard({ response }: { response: AiAssistResponse }) {
  switch (response.task) {
    case "summary":
      return <SummaryResult result={response.result as AiSummaryResult} />;
    case "pitch":
      return <PitchResult result={response.result as AiPitchResult} />;
    case "call-prep":
      return <CallPrepResult result={response.result as AiCallPrepResult} />;
  }
}

function SummaryResult({ result }: { result: AiSummaryResult }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <h4 className="font-semibold text-white">{result.headline}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-400">{result.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
          <p className="text-sm font-medium text-white">Points forts</p>
          <ul className="mt-3 space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
          <p className="text-sm font-medium text-white">Opportunités</p>
          <ul className="mt-3 space-y-2">
            {result.opportunities.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PitchResult({ result }: { result: AiPitchResult }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Objet</p>
        <p className="mt-1 font-medium text-white">{result.subject}</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Corps du message</p>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-300">
          {result.body}
        </pre>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-white">Call-to-action</p>
        <p className="mt-1 font-semibold text-white">{result.cta}</p>
      </div>

      <CopyButton text={`Objet : ${result.subject}\n\n${result.body}\n\n${result.cta}`} />
    </div>
  );
}

function CallPrepResult({ result }: { result: AiCallPrepResult }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-amber-500">Accroche d'ouverture</p>
        <p className="mt-2 text-sm leading-6 text-slate-200">{result.openingLine}</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Points clés</p>
        <ul className="mt-3 space-y-2">
          {result.keyPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="shrink-0 rounded-full bg-slate-700 px-1.5 text-xs text-slate-400">
                {i + 1}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Gestion des objections</p>
        <div className="mt-3 space-y-3">
          {result.objections.map((obj, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
              <p className="text-sm font-medium text-red-300">
                — {obj.objection}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                {obj.response}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-white">Closing</p>
        <p className="mt-2 text-sm leading-6 text-slate-200">{result.closingLine}</p>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  async function handleCopy() {
    await navigator.clipboard.writeText(text);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-900"
    >
      Copier le message
    </button>
  );
}

```

---

## `src/components/ai-assistant/prospect-input-form.tsx`

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  aiProspectSchema,
  type AiProspectFormValues,
} from "@/lib/schemas/ai-assist";
import type { AiTaskType } from "@/types/ai-assistant";

const taskOptions: { value: AiTaskType; label: string; cost: number; description: string }[] = [
  { value: "summary", label: "Résumé entreprise", cost: 1, description: "Analyse rapide du prospect" },
  { value: "pitch", label: "Pitch personnalisé", cost: 3, description: "Email ou message LinkedIn prêt à envoyer" },
  { value: "call-prep", label: "Préparation appel", cost: 2, description: "Script + réponses aux objections" },
];

interface ProspectInputFormProps {
  onSubmit: (values: AiProspectFormValues, task: AiTaskType) => void;
  isLoading: boolean;
  selectedTask: AiTaskType;
  onTaskChange: (task: AiTaskType) => void;
}

export function ProspectInputForm({
  onSubmit,
  isLoading,
  selectedTask,
  onTaskChange,
}: ProspectInputFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AiProspectFormValues>({
    resolver: zodResolver(aiProspectSchema),
    defaultValues: {
      companyName: "Translog France",
      sector: "Logistique",
      city: "Paris",
      targetRole: "Directeur logistique",
      context: "",
    },
  });

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold">Informations prospect</h2>

      <div className="mt-6 space-y-2">
        <p className="text-sm text-slate-400">Type d'analyse</p>
        {taskOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onTaskChange(opt.value)}
            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
              selectedTask === opt.value
                ? "border-white/20 bg-white/10 text-white"
                : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-600"
            }`}
          >
            <div>
              <span className="font-medium">{opt.label}</span>
              <span className="ml-2 text-sm text-slate-500">{opt.description}</span>
            </div>
            <span className="shrink-0 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
              {opt.cost} cr.
            </span>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit((values) => onSubmit(values, selectedTask))}
        className="mt-6 space-y-4"
        noValidate
      >
        <Field label="Nom de l'entreprise" error={errors.companyName?.message}>
          <input
            {...register("companyName")}
            className={inputClass}
            placeholder="Translog France"
          />
        </Field>

        <Field label="Secteur" error={errors.sector?.message}>
          <input
            {...register("sector")}
            className={inputClass}
            placeholder="Logistique"
          />
        </Field>

        <Field label="Ville" error={errors.city?.message}>
          <input
            {...register("city")}
            className={inputClass}
            placeholder="Paris"
          />
        </Field>

        <Field label="Poste ciblé (optionnel)" error={errors.targetRole?.message}>
          <input
            {...register("targetRole")}
            className={inputClass}
            placeholder="Directeur logistique"
          />
        </Field>

        <Field label="Contexte / notes (optionnel)" error={errors.context?.message}>
          <textarea
            {...register("context")}
            className={`${inputClass} min-h-[80px] resize-none`}
            placeholder="Signaux détectés, notes de prospection…"
          />
        </Field>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-2xl bg-white px-4 py-3 font-semibold text-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Analyse IA en cours…" : "Lancer l'analyse IA"}
        </button>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/20";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

```

---

## `src/components/billing/billing-view.tsx`

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { CreditPackCard } from "@/components/billing/credit-pack-card";
import { PlanCard } from "@/components/billing/plan-card";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { BillingData } from "@/types/billing";

async function fetchBilling(): Promise<BillingData> {
  const res = await fetch("/api/billing");
  if (!res.ok) throw new Error("Impossible de charger la facturation");
  return res.json();
}

export function BillingView() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["billing"],
    queryFn: fetchBilling,
    staleTime: 60_000,
  });

  const { remaining, total } = useCreditsStore();
  const percent = total > 0 ? Math.round((remaining / total) * 100) : 0;

  if (isLoading) {
    return <BillingSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-200">
          Impossible de charger la facturation
        </h2>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-2xl bg-slate-800 px-5 py-2.5 text-sm font-medium hover:bg-slate-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const renewalDate = new Date(data.renewalDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <p className="text-sm text-slate-400">Module 5</p>
        <h1 className="mt-1 text-3xl font-semibold">Crédits & Facturation</h1>
        <p className="mt-2 text-slate-400">
          Gère ton plan, recharge tes crédits et consulte ton historique de paiement.
        </p>
      </header>

      {/* Credits status */}
      <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Crédits disponibles</h2>
            <p className="text-sm text-slate-400">
              Renouvellement le {renewalDate}
            </p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-bold">{remaining}</span>
            <span className="ml-2 text-slate-500">/ {total}</span>
          </div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-white/70 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-right text-xs text-slate-500">{percent}% disponible</p>
      </div>

      {/* Plans */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Plans disponibles</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* Credit packs */}
      <section className="mt-10">
        <h2 className="mb-1 text-xl font-semibold">Packs de crédits supplémentaires</h2>
        <p className="mb-4 text-sm text-slate-400">
          Idéal si tu as besoin de crédits ponctuellement sans changer de plan.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.creditPacks.map((pack) => (
            <CreditPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-slate-600">
        MVP : paiement non intégré. Branchement Stripe prévu dans la prochaine version.
      </p>
    </div>
  );
}

function BillingSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-8">
      <div className="h-24 rounded-3xl bg-slate-800/60" />
      <div className="h-40 rounded-3xl bg-slate-800/60" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-3xl bg-slate-800/60" />
        ))}
      </div>
    </div>
  );
}

```

---

## `src/components/billing/credit-pack-card.tsx`

```tsx
import type { CreditPack } from "@/types/billing";

export function CreditPackCard({ pack }: { pack: CreditPack }) {
  return (
    <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      {pack.badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-semibold text-white">
          {pack.badge}
        </span>
      ) : null}

      <div className="text-3xl font-bold">{pack.credits}</div>
      <div className="mt-1 text-sm text-slate-400">crédits supplémentaires</div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-2xl font-semibold">{pack.price}€</span>
        <span className="text-slate-500 text-sm">
          · {(pack.price / pack.credits).toFixed(2)}€/crédit
        </span>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:border-white/20 hover:bg-white/10"
      >
        Acheter ce pack
      </button>
    </div>
  );
}

```

---

## `src/components/billing/plan-card.tsx`

```tsx
import type { Plan } from "@/types/billing";

export function PlanCard({ plan }: { plan: Plan }) {
  const isHighlighted = plan.highlighted;

  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-6 ${
        isHighlighted
          ? "border-white/20 bg-white/10"
          : "border-slate-800 bg-slate-900/60"
      }`}
    >
      {isHighlighted ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-semibold text-white">
          Plan actuel
        </span>
      ) : null}

      {plan.current && !isHighlighted ? (
        <span className="mb-2 inline-block rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-400">
          Actuel
        </span>
      ) : null}

      <div className="text-lg font-semibold">{plan.name}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-bold">{plan.price}€</span>
        <span className="text-slate-500">/{plan.period === "month" ? "mois" : "an"}</span>
      </div>
      <div className="mt-1 text-sm text-white">{plan.credits} crédits / mois</div>

      <ul className="mt-6 flex-1 space-y-2">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="mt-0.5 text-white">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={plan.current}
        className={`mt-6 w-full rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors ${
          plan.current
            ? "cursor-default bg-slate-800 text-slate-500"
            : isHighlighted
              ? "bg-white text-black hover:bg-gray-100"
              : "border border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-900"
        }`}
      >
        {plan.current ? "Plan actuel" : "Choisir ce plan"}
      </button>
    </div>
  );
}

```

---

## `src/components/dashboard/activity-feed.tsx`

```tsx
import { formatRelativeTime } from "@/lib/format";
import type { ActivityItem } from "@/types/dashboard";

const typeLabels: Record<ActivityItem["type"], string> = {
  search: "Recherche",
  export: "Export",
  ai: "IA",
  enrichment: "Enrichissement",
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Activité récente</h3>
      <div className="space-y-1">
        {items.length === 0 ? (
          <p className="text-xs text-[#555] py-4 text-center">Aucune activité pour le moment.</p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="flex gap-3 p-3 rounded-xl hover:bg-[#161616] transition-all duration-150 border border-transparent hover:border-[#1e1e1e]"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="bg-[#1e1e1e] text-[#888] text-[10px] px-2.5 py-1 rounded-full">
                    {typeLabels[item.type]}
                  </span>
                  <h4 className="text-sm font-medium text-white">{item.title}</h4>
                </div>
                <p className="text-xs text-[#555]">{item.description}</p>
              </div>
              <time
                className="shrink-0 text-[10px] text-[#333] ml-auto pt-0.5"
                dateTime={item.createdAt}
              >
                {formatRelativeTime(item.createdAt)}
              </time>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

```

---

## `src/components/dashboard/credits-overview.tsx`

```tsx
"use client";

import Link from "next/link";
import { useCreditsStore } from "@/stores/use-credits-store";

export function CreditsOverview() {
  const { remaining, total, initialized } = useCreditsStore();
  const used = total - remaining;
  const percent = total > 0 ? Math.round((remaining / total) * 100) : 0;

  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="text-sm font-semibold text-white mb-1">Crédits IA</h3>
          <p className="text-xs text-[#555]">Enrichissement, pitch et résumés</p>
        </div>
        <span className="bg-white text-black text-[10px] px-2.5 py-1 rounded-full font-bold shrink-0">
          Plan Pro
        </span>
      </div>

      <div className="flex items-end gap-2 mb-3">
        <span className="text-5xl font-black text-white tracking-tight">
          {initialized ? remaining : "—"}
        </span>
        <span className="mb-2 text-xs text-[#555]">/ {total} restants</span>
      </div>

      <div className="w-full bg-[#1e1e1e] rounded-full h-2 mb-2">
        <div
          className="h-2 rounded-full bg-white transition-all duration-300"
          style={{ width: `${initialized ? percent : 0}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-[#333] mb-5">
        <span>{initialized ? `${used} utilisés ce mois` : "Chargement…"}</span>
        <span>{initialized ? `${percent}% disponible` : ""}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <CreditCost label="Recherche enrichie" cost={2} />
        <CreditCost label="Résumé IA" cost={1} />
        <CreditCost label="Pitch personnalisé" cost={3} />
        <CreditCost label="Préparation appel" cost={2} />
      </div>

      <Link
        href="/billing"
        className="flex w-full items-center justify-center bg-[#161616] border border-[#1e1e1e] rounded-xl py-2.5 text-sm text-white hover:bg-[#1e1e1e] transition-all duration-150"
      >
        Gérer mes crédits
      </Link>
    </div>
  );
}

function CreditCost({ label, cost }: { label: string; cost: number }) {
  return (
    <div className="bg-[#161616] border border-[#1e1e1e] rounded-xl p-3">
      <div className="text-[11px] text-[#555] mb-0.5">{label}</div>
      <div className="text-sm font-semibold text-white">{cost} cr.</div>
    </div>
  );
}

```

---

## `src/components/dashboard/dashboard-header.tsx`

```tsx
import Link from "next/link";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm text-gray-400">Tableau de bord</p>
        <h1 className="mt-1 text-3xl font-semibold">
          Bonjour, {userName}
        </h1>
        <p className="mt-2 max-w-xl text-slate-400">
          Voici un aperçu de ton activité, tes crédits et tes dernières
          recherches de prospects.
        </p>
      </div>
      <Link
        href="/prospect-finder"
        className="inline-flex w-fit items-center justify-center rounded-2xl bg-white px-5 py-3 font-semibold text-black transition-colors hover:bg-gray-100"
      >
        Nouvelle recherche
      </Link>
    </div>
  );
}

```

---

## `src/components/dashboard/dashboard-skeleton.tsx`

```tsx
export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-8">
      <div className="h-24 rounded-3xl bg-slate-800/60" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-3xl bg-slate-800/60" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="h-96 rounded-3xl bg-slate-800/60" />
        <div className="h-96 rounded-3xl bg-slate-800/60" />
      </div>
    </div>
  );
}
```

---

## `src/components/dashboard/dashboard-view.tsx`

```tsx
"use client";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { CreditsOverview } from "@/components/dashboard/credits-overview";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { PriorityProspects } from "@/components/dashboard/priority-prospects";
import { SearchHistoryPanel } from "@/components/dashboard/search-history-panel";
import { StatCard } from "@/components/dashboard/stat-card";
import { useDashboard } from "@/hooks/use-dashboard";

export function DashboardView() {
  const { data, isLoading, isError, refetch } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-200">
          Impossible de charger le dashboard
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Vérifie ta connexion et réessaie.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-2xl bg-slate-800 px-5 py-2.5 text-sm font-medium hover:bg-slate-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const { stats, activities, searchHistory, priorityProspects, user } = data;

  return (
    <div className="mx-auto max-w-7xl">
      <DashboardHeader userName={user.name} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Recherches"
          value={stats.searchesThisMonth}
          subtitle="ce mois-ci"
        />
        <StatCard
          title="Prospects trouvés"
          value={stats.prospectsFound}
          subtitle="entreprises qualifiées"
        />
        <StatCard
          title="Score moyen"
          value={`${stats.averageScore}/100`}
          subtitle="qualité globale"
        />
        <StatCard
          title="Crédits restants"
          value={stats.creditsRemaining}
          subtitle={`sur ${stats.creditsTotal} disponibles`}
          highlight
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <ActivityFeed items={activities} />
        <CreditsOverview />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SearchHistoryPanel items={searchHistory} />
        <PriorityProspects items={priorityProspects} />
      </div>
    </div>
  );
}

```

---

## `src/components/dashboard/priority-prospects.tsx`

```tsx
import Link from "next/link";
import type { PriorityProspect } from "@/types/dashboard";

export function PriorityProspects({ items }: { items: PriorityProspect[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Prospects prioritaires</h3>
        <Link
          href="/prospect-finder"
          className="text-xs text-[#555] hover:text-white transition-colors"
        >
          Explorer
        </Link>
      </div>
      <div className="space-y-1">
        {items.map((prospect) => (
          <div
            key={prospect.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-[#161616] transition-all border border-transparent hover:border-[#1e1e1e] cursor-pointer"
          >
            <div>
              <div className="text-sm font-medium text-white">{prospect.name}</div>
              <div className="text-xs text-[#555]">
                {prospect.sector} · {prospect.city}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center text-xs font-bold text-white shrink-0">
              {prospect.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

```

---

## `src/components/dashboard/search-history-panel.tsx`

```tsx
import Link from "next/link";
import { formatRelativeTime, formatSearchLabel } from "@/lib/format";
import type { SearchHistoryItem } from "@/types/dashboard";

export function SearchHistoryPanel({ items }: { items: SearchHistoryItem[] }) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Historique des recherches</h3>
        <Link
          href="/history"
          className="text-xs text-[#555] hover:text-white transition-colors"
        >
          Tout voir
        </Link>
      </div>

      <div>
        {items.length === 0 ? (
          <p className="text-xs text-[#555]">Aucune recherche enregistrée.</p>
        ) : (
          items.map((item) => (
            <Link
              key={item.id}
              href={`/history?id=${item.id}`}
              className="flex justify-between py-3 border-b border-[#1a1a1a] last:border-0 hover:bg-[#161616] rounded-lg px-2 transition-all cursor-pointer"
            >
              <div>
                <div className="text-sm font-medium text-white">
                  {formatSearchLabel(item.sector, item.city)}
                </div>
                <div className="text-xs text-[#555] mt-0.5">
                  {formatRelativeTime(item.createdAt)} · score {item.averageScore}
                </div>
              </div>
              <div className="flex items-center">
                <span className="bg-[#1e1e1e] text-[#888] text-xs px-2 py-0.5 rounded-full">
                  {item.prospectCount}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

```

---

## `src/components/dashboard/stat-card.tsx`

```tsx
interface StatCardProps {
  title?: string;
  label?: string;
  value: string | number;
  subtitle?: string;
  sub?: string;
  highlight?: boolean;
}

export function StatCard({ title, label, value, subtitle, sub, highlight }: StatCardProps) {
  const heading = title || label || '';
  const caption = subtitle || sub || '';
  return (
    <div className={`rounded-xl border p-5 transition-all duration-150 ${
      highlight
        ? 'bg-white border-white'
        : 'bg-[#111] border-[#1e1e1e] hover:border-[#2a2a2a]'
    }`}>
      <p className={`text-[11px] uppercase tracking-widest mb-3 ${
        highlight ? 'text-black/40' : 'text-[#444]'
      }`}>
        {heading}
      </p>
      <p className={`text-3xl font-bold mb-1 ${
        highlight ? 'text-black' : 'text-white'
      }`}>
        {value}
      </p>
      {caption && (
        <p className={`text-xs ${
          highlight ? 'text-black/50' : 'text-[#555]'
        }`}>{caption}</p>
      )}
    </div>
  );
}

```

---

## `src/components/exports/exports-view.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { formatRelativeTime } from "@/lib/format";
import type { HistoryEntry, HistoryListResponse } from "@/types/history";

function buildCsv(entry: HistoryEntry): string {
  const header = "Entreprise,Secteur,Ville,Pays,Score,Site web,Raison\n";
  const rows = entry.prospects
    .map((p) =>
      [
        `"${p.name}"`,
        `"${p.sector}"`,
        `"${p.city}"`,
        `"${p.country}"`,
        p.score,
        `"${p.website ?? ""}"`,
        `"${p.reason.replace(/"/g, "'")}"`,
      ].join(","),
    )
    .join("\n");

  return header + rows;
}

function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ExportsView() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exported, setExported] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/history")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json() as Promise<HistoryListResponse>;
      })
      .then((data) => setEntries(data.entries))
      .catch(() => setError("Impossible de charger l'historique."))
      .finally(() => setLoading(false));
  }, []);

  function handleExport(entry: HistoryEntry) {
    const csv = buildCsv(entry);
    if (!csv) return;
    const filename =
      `prospects_${entry.sector}_${entry.city}_${new Date().toISOString().slice(0, 10)}.csv`.replace(
        /\s+/g,
        "_",
      );
    downloadCsv(filename, csv);
    setExported((prev) => new Set(prev).add(entry.id));
  }

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <p className="text-xs text-[#555]">Exports</p>
        <h1 className="mt-1 text-2xl font-semibold text-white">Exports CSV</h1>
        <p className="mt-2 text-sm text-[#555]">
          Télécharge tes recherches au format CSV pour les intégrer dans ton CRM ou Excel.
        </p>
      </header>

      <div className="space-y-2">
        {loading && (
          <p className="py-6 text-center text-sm text-[#555]">Chargement…</p>
        )}

        {error && (
          <p className="py-6 text-center text-sm text-red-400">{error}</p>
        )}

        {!loading && !error && entries.length === 0 && (
          <p className="py-6 text-center text-sm text-[#555]">
            Aucune recherche disponible.
          </p>
        )}

        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex justify-between p-4 bg-[#111] border border-[#1e1e1e] rounded-xl hover:border-[#2a2a2a] transition-all items-center"
          >
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">
                {entry.sector} / {entry.city}
              </div>
              <div className="text-xs text-[#555] mt-0.5">
                {entry.prospectCount} prospects · {formatRelativeTime(entry.createdAt)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleExport(entry)}
              disabled={entry.prospects.length === 0}
              className={`shrink-0 text-xs px-4 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                exported.has(entry.id)
                  ? "bg-white text-black"
                  : "bg-[#1e1e1e] text-white hover:bg-[#2a2a2a] border border-[#2a2a2a]"
              }`}
            >
              {exported.has(entry.id) ? "Téléchargé ✓" : "Télécharger CSV"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-5 bg-[#111] border border-[#1e1e1e] rounded-xl">
        <h3 className="text-sm font-semibold text-white">Format d'export</h3>
        <p className="mt-1 text-xs text-[#555]">
          Les fichiers CSV incluent : Entreprise, Secteur, Ville, Pays, Score IA,
          Site web, Raison de sélection.
        </p>
        <p className="mt-3 text-xs text-[#444]">
          Compatibles avec Excel, Google Sheets, Notion, HubSpot, Pipedrive.
        </p>
      </div>
    </div>
  );
}

```

---

## `src/components/history/history-detail.tsx`

```tsx
import Link from "next/link";
import { formatRelativeTime } from "@/lib/format";
import type { HistoryEntry } from "@/types/history";

export function HistoryDetail({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <h4 className="font-semibold text-white">
          {entry.sector} / {entry.city}
        </h4>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <Tag label={entry.radius} />
          <Tag label={entry.country} />
          {entry.companySize ? <Tag label={entry.companySize} /> : null}
          {entry.targetRole ? <Tag label={entry.targetRole} /> : null}
        </div>
        {entry.keywords ? (
          <p className="mt-2 text-xs text-slate-500">
            Mots-clés : {entry.keywords}
          </p>
        ) : null}
        <p className="mt-2 text-xs text-slate-500">
          {formatRelativeTime(entry.createdAt)} · {entry.prospectCount} prospects ·
          score moyen {entry.averageScore}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-400">Prospects trouvés</p>
        {entry.prospects.map((prospect) => (
          <article
            key={prospect.id}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h5 className="font-medium text-white">{prospect.name}</h5>
                <p className="mt-1 text-sm text-slate-400">
                  {prospect.sector} · {prospect.city}, {prospect.country}
                </p>
                {prospect.website ? (
                  <p className="mt-0.5 text-xs text-slate-500">{prospect.website}</p>
                ) : null}
              </div>
              <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-semibold text-white">
                {prospect.score}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{prospect.reason}</p>
          </article>
        ))}
      </div>

      <Link
        href="/prospect-finder"
        className="flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-900"
      >
        Relancer une recherche similaire →
      </Link>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-slate-400">
      {label}
    </span>
  );
}

```

---

## `src/components/history/history-table.tsx`

```tsx
import { formatRelativeTime } from "@/lib/format";
import type { HistoryEntry } from "@/types/history";

interface HistoryTableProps {
  entries: HistoryEntry[];
  selectedId: string | null;
  onSelect: (entry: HistoryEntry) => void;
}

export function HistoryTable({ entries, selectedId, onSelect }: HistoryTableProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white mb-4">Recherches passées</h2>

      <div className="space-y-1">
        {entries.length === 0 ? (
          <p className="text-xs text-[#555]">Aucune recherche enregistrée.</p>
        ) : (
          entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect(entry)}
              className={`w-full flex justify-between p-4 rounded-xl cursor-pointer transition-all border ${
                selectedId === entry.id
                  ? "bg-[#161616] border-[#2a2a2a]"
                  : "border-transparent hover:bg-[#161616] hover:border-[#1e1e1e]"
              }`}
            >
              <div className="text-left min-w-0">
                <div className="text-sm font-semibold text-white">
                  {entry.sector} / {entry.city}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="bg-[#1e1e1e] text-[#888] text-xs px-2 py-0.5 rounded-full">{entry.radius}</span>
                  {entry.companySize && <span className="bg-[#1e1e1e] text-[#888] text-xs px-2 py-0.5 rounded-full">{entry.companySize}</span>}
                  {entry.targetRole && <span className="bg-[#1e1e1e] text-[#888] text-xs px-2 py-0.5 rounded-full">{entry.targetRole}</span>}
                </div>
                <div className="text-xs text-[#555] mt-1">
                  {formatRelativeTime(entry.createdAt)}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-semibold text-white">{entry.prospectCount}</div>
                <div className="text-xs text-[#555]">prospects</div>
                <div className="text-xs text-[#555] mt-0.5">score {entry.averageScore}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

```

---

## `src/components/history/history-view.tsx`

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HistoryDetail } from "@/components/history/history-detail";
import { HistoryTable } from "@/components/history/history-table";
import type { HistoryEntry, HistoryListResponse } from "@/types/history";

async function fetchHistory(): Promise<HistoryListResponse> {
  const res = await fetch("/api/history");
  if (!res.ok) throw new Error("Impossible de charger l'historique");
  return res.json();
}

export function HistoryView() {
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["history"],
    queryFn: fetchHistory,
    staleTime: 60_000,
  });

  if (isLoading) {
    return <HistoryLoadingSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-200">
          Impossible de charger l'historique
        </h2>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-2xl bg-slate-800 px-5 py-2.5 text-sm font-medium hover:bg-slate-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <p className="text-sm text-slate-400">Module 4</p>
        <h1 className="mt-1 text-3xl font-semibold">Historique des recherches</h1>
        <p className="mt-2 text-slate-400">
          {data.total} recherche{data.total > 1 ? "s" : ""} enregistrée
          {data.total > 1 ? "s" : ""}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
        <HistoryTable
          entries={data.entries}
          selectedId={selectedEntry?.id ?? null}
          onSelect={setSelectedEntry}
        />

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold">Détail de la recherche</h2>
          <div className="mt-6">
            {selectedEntry ? (
              <HistoryDetail entry={selectedEntry} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
                <p>Sélectionne une recherche pour voir les prospects.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-6">
      <div className="h-24 rounded-3xl bg-slate-800/60" />
      <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
        <div className="h-96 rounded-3xl bg-slate-800/60" />
        <div className="h-96 rounded-3xl bg-slate-800/60" />
      </div>
    </div>
  );
}

```

---

## `src/components/layout/app-shell.tsx`

```tsx
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="md:pl-64">
        <MobileNav />
        <main className="min-h-screen p-8 bg-[#0a0a0a]">{children}</main>
      </div>
    </div>
  );
}

```

---

## `src/components/layout/mobile-nav.tsx`

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNavItems } from "@/lib/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="border-b border-[#222] bg-black px-4 py-3 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#333] bg-[#111] text-xs font-bold text-white">
            SA
          </div>
          <span className="text-sm font-semibold text-white">Sales Advisor</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-[#333] bg-[#111] px-3 py-1.5 text-xs font-medium text-[#888] transition-colors hover:text-white"
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav className="mt-3 space-y-0.5 pb-2">
          {mainNavItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#111] border border-[#333] text-white"
                    : "text-[#888] hover:bg-[#0d0d0d] hover:text-white border border-transparent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}

```

---

## `src/components/layout/sidebar.tsx`

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: '/prospect-finder',
    label: 'Prospect Finder',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/ai-assistant',
    label: 'Assistance IA',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/history',
    label: 'Historique',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/exports',
    label: 'Exports',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const BOTTOM_ITEMS = [
  {
    href: '/billing',
    label: 'Facturation',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Paramètres',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0f0f0f] border-r border-[#1e1e1e] flex flex-col z-40">

      {/* Brand */}
      <div className="px-4 py-5 border-b border-[#1e1e1e]">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
            <span className="text-black text-[11px] font-black tracking-tight">SA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm tracking-tight leading-tight">Sales Advisor</span>
            <span className="text-[#444] text-xs">Prospection B2B</span>
          </div>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-[#333] mb-2 px-3">Menu</p>
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group ${
                  isActive
                    ? 'bg-white text-black font-medium'
                    : 'text-[#666] hover:text-white hover:bg-[#161616]'
                }`}
              >
                <span className={`shrink-0 transition-colors duration-150 ${isActive ? 'text-black' : 'text-[#555] group-hover:text-white'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4">
        {/* Credits widget */}
        <div className="bg-[#161616] rounded-xl p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-[#555] uppercase tracking-widest">Crédits IA</span>
            <span className="bg-white text-black text-[10px] px-2 py-0.5 rounded-full font-bold">PRO</span>
          </div>
          <div className="mb-2">
            <span className="text-white text-2xl font-bold">92</span>
          </div>
          <div className="w-full bg-[#1e1e1e] rounded-full h-1.5 mb-1.5">
            <div className="bg-white h-1.5 rounded-full" style={{ width: '92%' }} />
          </div>
          <p className="text-[#444] text-[10px]">8 utilisés · 92 restants</p>
        </div>

        {/* Separator + bottom nav */}
        <div className="border-t border-[#1e1e1e] pt-3 space-y-0.5">
          {BOTTOM_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group ${
                  isActive
                    ? 'bg-white text-black font-medium'
                    : 'text-[#666] hover:text-white hover:bg-[#161616]'
                }`}
              >
                <span className={`shrink-0 transition-colors duration-150 ${isActive ? 'text-black' : 'text-[#555] group-hover:text-white'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

```

---

## `src/components/prospect-finder/prospect-finder-view.tsx`

```tsx
"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ProspectResultCard } from "@/components/prospect-finder/prospect-result-card";
import { ProspectSearchForm } from "@/components/prospect-finder/prospect-search-form";
import type { ProspectSearchFormValues } from "@/lib/schemas/prospect-search";
import { useCreditsStore } from "@/stores/use-credits-store";
import type { ProspectSearchResponse } from "@/types/prospect";

const SEARCH_CREDIT_COST = 2;

async function runProspectSearch(
  filters: ProspectSearchFormValues,
): Promise<ProspectSearchResponse> {
  const res = await fetch("/api/prospect-search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Recherche impossible");
  }

  return res.json();
}

export function ProspectFinderView() {
  const [lastFilters, setLastFilters] = useState<ProspectSearchFormValues | null>(
    null,
  );
  const { remaining, consume, initialized } = useCreditsStore();

  const mutation = useMutation({
    mutationFn: runProspectSearch,
    onSuccess: (_data, variables) => {
      setLastFilters(variables);
      consume(SEARCH_CREDIT_COST);
    },
  });

  const handleSearch = (values: ProspectSearchFormValues) => {
    if (initialized && remaining < SEARCH_CREDIT_COST) {
      mutation.reset();
      return;
    }
    mutation.mutate(values);
  };

  const insufficientCredits =
    initialized && remaining < SEARCH_CREDIT_COST;

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Smart Prospect Finder</h1>
        <p className="mt-2 max-w-3xl text-slate-400">
          Recherche de prospects B2B qualifiés à partir de critères métier,
          géographiques et IA.
        </p>
      </header>

      {insufficientCredits ? (
        <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Crédits insuffisants ({remaining} restants). Recharge ton compte pour
          lancer une recherche.
        </div>
      ) : null}

      {mutation.isError ? (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {(mutation.error as Error).message}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <ProspectSearchForm
          onSubmit={handleSearch}
          isLoading={mutation.isPending}
        />

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold">Zone de prospection</h2>
            <ProspectionZone filters={lastFilters} />
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Résultats prospects</h2>
              {mutation.data ? (
                <span className="text-sm text-slate-400">
                  {mutation.data.total} trouvé(s)
                </span>
              ) : null}
            </div>

            <div className="mt-4 space-y-4">
              {mutation.isPending ? (
                <p className="text-sm text-slate-500">Analyse en cours…</p>
              ) : null}

              {!mutation.isPending && !mutation.data ? (
                <p className="text-sm text-slate-500">
                  Lance une recherche pour afficher les prospects.
                </p>
              ) : null}

              {mutation.data?.prospects.map((prospect) => (
                <ProspectResultCard key={prospect.id} prospect={prospect} />
              ))}
            </div>

            {lastFilters && mutation.data ? (
              <p className="mt-4 text-xs text-slate-500">
                Dernière recherche : {lastFilters.sector} · {lastFilters.city} ·{" "}
                {lastFilters.radius}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProspectionZone({ filters }: { filters: ProspectSearchFormValues | null }) {
  const dots = Array.from({ length: 130 });

  return (
    <div className="mt-4 relative h-80 overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#0a0a0a]">
      {/* dot grid */}
      <div className="absolute inset-0 grid grid-cols-[repeat(13,1fr)] gap-y-5 p-5 pointer-events-none">
        {dots.map((_, i) => (
          <span
            key={i}
            className="mx-auto h-[3px] w-[3px] rounded-full bg-white/10"
          />
        ))}
      </div>

      {/* center pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <span className="absolute h-24 w-24 rounded-full border border-white/5 animate-ping" style={{ animationDuration: "3s" }} />
          <span className="absolute h-40 w-40 rounded-full border border-white/[0.03]" />
          <span className="h-3 w-3 rounded-full bg-white/40" />
        </div>
      </div>

      {/* filters overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        {filters ? (
          <div className="flex flex-wrap gap-2">
            {filters.sector && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                {filters.sector}
              </span>
            )}
            {filters.city && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                {filters.city}
              </span>
            )}
            {filters.radius && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                {filters.radius}
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs text-white/20">Lance une recherche pour afficher la zone</p>
        )}
      </div>
    </div>
  );
}

```

---

## `src/components/prospect-finder/prospect-result-card.tsx`

```tsx
import { ProspectResult } from "@/types/prospect";

interface Props { prospect: ProspectResult; }

export function ProspectResultCard({ prospect }: Props) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 hover:border-[#2a2a2a] hover:bg-[#141414] transition-all">
      <div className="flex justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">{prospect.name}</h3>
          <p className="text-xs text-[#555] mt-0.5">{prospect.sector} · {prospect.city}, {prospect.country}</p>
        </div>
        <span className="bg-white text-black text-xs font-bold px-2.5 py-1 rounded-full shrink-0 h-fit">
          {prospect.score}/100
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4">
        {prospect.role && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#333]">Poste ciblé</p>
            <p className="text-xs text-[#888]">{prospect.role}</p>
          </div>
        )}
        {prospect.size && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#333]">Taille</p>
            <p className="text-xs text-[#888]">{prospect.size} · {prospect.employees}</p>
          </div>
        )}
        {prospect.revenue && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#333]">CA estimé</p>
            <p className="text-xs text-[#888]">{prospect.revenue}</p>
          </div>
        )}
        {prospect.website && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#333]">Site web</p>
            <a href={`https://${prospect.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#888] hover:text-white transition-colors truncate block">{prospect.website}</a>
          </div>
        )}
      </div>

      <div className="border-t border-[#1a1a1a] pt-3 mt-3 space-y-1.5">
        {prospect.contact && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#333] w-14">Email</span>
            <a href={`mailto:${prospect.contact}`} className="text-xs text-[#888] hover:text-white transition-colors truncate">{prospect.contact}</a>
          </div>
        )}
        {prospect.phone && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#333] w-14">Tél</span>
            <a href={`tel:${prospect.phone}`} className="text-xs text-[#888]">{prospect.phone}</a>
          </div>
        )}
        {prospect.linkedin && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#333] w-14">LinkedIn</span>
            <a href={`https://${prospect.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#888] hover:text-white transition-colors truncate">{prospect.linkedin}</a>
          </div>
        )}
      </div>

      {prospect.reason && (
        <p className="italic text-xs text-[#444] border-t border-[#1a1a1a] pt-2 mt-2">{prospect.reason}</p>
      )}
    </div>
  );
}

```

---

## `src/components/prospect-finder/prospect-search-form.tsx`

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  prospectSearchSchema,
  type ProspectSearchFormValues,
} from "@/lib/schemas/prospect-search";

const radiusOptions = ["10 km", "20 km", "50 km", "100 km"] as const;

interface ProspectSearchFormProps {
  onSubmit: (values: ProspectSearchFormValues) => void;
  isLoading: boolean;
}

export function ProspectSearchForm({
  onSubmit,
  isLoading,
}: ProspectSearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProspectSearchFormValues>({
    resolver: zodResolver(prospectSearchSchema),
    defaultValues: {
      sector: "Logistique",
      city: "Paris",
      country: "France",
      radius: "50 km",
      companySize: "PME, ETI",
      keywords: "recrutement supply chain transport",
      targetRole: "Directeur logistique",
    },
  });

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-xl font-semibold">Filtres de recherche</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-4"
        noValidate
      >
        <Field label="Secteur" error={errors.sector?.message}>
          <input
            {...register("sector")}
            className={inputClass}
            placeholder="Logistique"
          />
        </Field>

        <Field label="Ville" error={errors.city?.message}>
          <input
            {...register("city")}
            className={inputClass}
            placeholder="Paris"
          />
        </Field>

        <Field label="Pays" error={errors.country?.message}>
          <input
            {...register("country")}
            className={inputClass}
            placeholder="France"
          />
        </Field>

        <Field label="Rayon" error={errors.radius?.message}>
          <select {...register("radius")} className={inputClass}>
            {radiusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Taille entreprise" error={errors.companySize?.message}>
          <input
            {...register("companySize")}
            className={inputClass}
            placeholder="PME, ETI..."
          />
        </Field>

        <Field label="Mots-clés" error={errors.keywords?.message}>
          <input
            {...register("keywords")}
            className={inputClass}
            placeholder="recrutement supply chain"
          />
        </Field>

        <Field label="Poste ciblé" error={errors.targetRole?.message}>
          <input
            {...register("targetRole")}
            className={inputClass}
            placeholder="Directeur logistique"
          />
        </Field>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-gray-100 transition-all w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Recherche en cours…" : "Lancer la recherche (2 cr.)"}
        </button>
      </form>

    </div>
  );
}

const inputClass =
  "w-full border border-[#222] bg-[#111] text-white rounded-xl px-4 py-3 focus:border-white/30 focus:outline-none transition-all placeholder:text-[#444]";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[#555] uppercase tracking-widest">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

```

---

## `src/components/providers/query-provider.tsx`

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

```

---

## `src/components/settings/settings-view.tsx`

```tsx
"use client";

import { useState } from "react";

interface SettingsSection {
  title: string;
  fields: SettingsField[];
}

interface SettingsField {
  label: string;
  description?: string;
  type: "text" | "email" | "select" | "toggle";
  defaultValue: string | boolean;
  options?: string[];
}

const sections: SettingsSection[] = [
  {
    title: "Profil",
    fields: [
      { label: "Nom", type: "text", defaultValue: "Victor" },
      {
        label: "Email",
        type: "email",
        defaultValue: "deletrezvictor@gmail.com",
        description: "Utilisé pour les notifications et la facturation",
      },
      {
        label: "Entreprise",
        type: "text",
        defaultValue: "",
      },
    ],
  },
  {
    title: "Prospection",
    fields: [
      {
        label: "Secteur par défaut",
        type: "text",
        defaultValue: "Logistique",
        description: "Pré-rempli dans le Prospect Finder",
      },
      {
        label: "Pays par défaut",
        type: "text",
        defaultValue: "France",
      },
      {
        label: "Rayon de recherche par défaut",
        type: "select",
        defaultValue: "50 km",
        options: ["10 km", "20 km", "50 km", "100 km"],
      },
    ],
  },
  {
    title: "Notifications",
    fields: [
      {
        label: "Alertes crédits bas",
        type: "toggle",
        defaultValue: true,
        description: "Notification quand il reste moins de 20% de crédits",
      },
      {
        label: "Résumé hebdomadaire",
        type: "toggle",
        defaultValue: false,
        description: "Email avec tes stats de la semaine",
      },
    ],
  },
];

export function SettingsView() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-8">
        <p className="text-sm text-slate-400">Paramètres</p>
        <h1 className="mt-1 text-3xl font-semibold">Paramètres du compte</h1>
        <p className="mt-2 text-slate-400">
          Configure ton profil et tes préférences de prospection.
        </p>
      </header>

      <div className="space-y-8">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <h2 className="mb-6 text-lg font-semibold">{section.title}</h2>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <SettingsFieldRow key={field.label} field={field} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs text-slate-600">
          MVP : les paramètres ne sont pas encore persistés côté serveur.
        </p>
        <button
          type="button"
          onClick={handleSave}
          className={`rounded-2xl px-6 py-3 text-sm font-semibold transition-colors ${
            saved
              ? "bg-white/10 text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {saved ? "Enregistré ✓" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}

function SettingsFieldRow({ field }: { field: SettingsField }) {
  const [toggleValue, setToggleValue] = useState(
    field.type === "toggle" ? (field.defaultValue as boolean) : false,
  );

  if (field.type === "toggle") {
    return (
      <div className="flex items-center justify-between gap-4">
        <div>
          <label className="text-sm font-medium text-white">{field.label}</label>
          {field.description ? (
            <p className="mt-0.5 text-xs text-slate-500">{field.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={toggleValue}
          onClick={() => setToggleValue(!toggleValue)}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            toggleValue ? "bg-white/30" : "bg-slate-700"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              toggleValue ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-300">
        {field.label}
      </label>
      {field.description ? (
        <p className="mb-2 text-xs text-slate-500">{field.description}</p>
      ) : null}
      {field.type === "select" ? (
        <select
          defaultValue={field.defaultValue as string}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white/20"
        >
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          defaultValue={field.defaultValue as string}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/20"
        />
      )}
    </div>
  );
}

```

---

## `src/hooks/use-dashboard.ts`

```ts
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

```

---

## `src/lib/format.ts`

```ts
const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });

export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const diffMs = date.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const absSec = Math.abs(diffSec);

  if (absSec < 60) return rtf.format(Math.round(diffSec), "second");
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");
  const diffHour = Math.round(diffMin / 60);
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, "hour");
  const diffDay = Math.round(diffHour / 24);
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, "day");
  const diffMonth = Math.round(diffDay / 30);
  return rtf.format(diffMonth, "month");
}

export function formatSearchLabel(sector: string, city: string): string {
  return `${sector} / ${city}`;
}

```

---

## `src/lib/mock/ai-assistant.ts`

```ts
import type {
  AiProspectInput,
  AiSummaryResult,
  AiPitchResult,
  AiCallPrepResult,
  AiTaskType,
  AiAssistResponse,
} from "@/types/ai-assistant";

function generateSummary(prospect: AiProspectInput): AiSummaryResult {
  return {
    headline: `${prospect.companyName} — acteur clé du secteur ${prospect.sector} en ${prospect.city}`,
    description: `${prospect.companyName} est une entreprise établie dans le secteur ${prospect.sector}, basée à ${prospect.city}. Elle présente des signaux d'activité récents et un potentiel de collaboration élevé selon les critères définis.`,
    strengths: [
      `Position établie dans le secteur ${prospect.sector}`,
      `Présence locale forte à ${prospect.city} et région`,
      "Croissance des effectifs détectée ces 12 derniers mois",
      "Budget décisionnel identifié au niveau direction",
    ],
    opportunities: [
      `Besoin probable en ${prospect.targetRole || "ressources externes"} non couvert`,
      "Phase d'expansion commerciale favorable à l'outreach",
      "Pas de prestataire identifié dans notre domaine",
    ],
    creditsUsed: 1,
  };
}

function generatePitch(prospect: AiProspectInput): AiPitchResult {
  return {
    subject: `${prospect.companyName} × votre solution — 5 min pour vous convaincre`,
    body: `Bonjour,

J'ai analysé la situation de ${prospect.companyName} dans le secteur ${prospect.sector} et j'ai identifié une opportunité concrète.

Votre entreprise est en pleine expansion à ${prospect.city}. Nous aidons des acteurs comme vous à accélérer leur prospection B2B grâce à l'IA — sans les coûts d'une équipe commerciale complète.

Concrètement, nous avons aidé des entreprises similaires à :
• Réduire le temps de qualification des prospects de 60 %
• Augmenter le taux de conversion des cold calls de 35 %
• Identifier des comptes prioritaires invisibles sur les radars classiques

Seriez-vous disponible pour un appel de 15 minutes cette semaine ?`,
    cta: "Réserver un créneau →",
    creditsUsed: 3,
  };
}

function generateCallPrep(prospect: AiProspectInput): AiCallPrepResult {
  return {
    openingLine: `Bonjour, je me permets de vous contacter car j'ai analysé l'activité de ${prospect.companyName} dans le secteur ${prospect.sector} et j'ai identifié quelques opportunités intéressantes pour vous.`,
    keyPoints: [
      `Mentionner la croissance récente de ${prospect.companyName} à ${prospect.city}`,
      `Lier notre solution aux enjeux du secteur ${prospect.sector} en 2024-2025`,
      "Proposer une démonstration personnalisée sous 48h",
      "Avoir un ROI concret à chiffrer (gain de temps, économies)",
    ],
    objections: [
      {
        objection: "Nous avons déjà une solution en place.",
        response: `Parfait, cela me confirme que vous êtes sensible à ce sujet. Notre différence : nous nous intégrons avec vos outils actuels et ajoutons une couche IA que la plupart des solutions n'ont pas encore. Je serais curieux de comparer en 10 minutes.`,
      },
      {
        objection: "Ce n'est pas le bon moment.",
        response: `Je comprends totalement. Est-ce que je peux vous envoyer un résumé rapide par mail ? Comme ça vous avez l'info disponible quand le timing sera meilleur — ça prend 2 minutes à lire.`,
      },
      {
        objection: "C'est trop cher.",
        response: `La question du prix est légitime. Nos clients voient en général un retour sur investissement en moins de 3 mois. Je peux vous montrer un calcul concret basé sur votre volume actuel si vous le souhaitez.`,
      },
    ],
    closingLine: `Alors, est-ce qu'on peut bloquer 15 minutes cette semaine pour que je vous montre concrètement ce que ça donnerait pour ${prospect.companyName} ?`,
    creditsUsed: 2,
  };
}

export function mockAiAssist(
  task: AiTaskType,
  prospect: AiProspectInput,
): AiAssistResponse {
  switch (task) {
    case "summary":
      return { task, result: generateSummary(prospect) };
    case "pitch":
      return { task, result: generatePitch(prospect) };
    case "call-prep":
      return { task, result: generateCallPrep(prospect) };
  }
}

```

---

## `src/lib/mock/billing.ts`

```ts
import type { BillingData } from "@/types/billing";

export const mockBillingData: BillingData = {
  currentPlan: "pro",
  creditsRemaining: 92,
  creditsTotal: 100,
  renewalDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
  plans: [
    {
      id: "starter",
      name: "Starter",
      price: 29,
      period: "month",
      credits: 50,
      features: [
        "50 crédits / mois",
        "Prospect Finder",
        "Export CSV",
        "Support email",
      ],
      current: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 79,
      period: "month",
      credits: 200,
      features: [
        "200 crédits / mois",
        "Prospect Finder avancé",
        "Assistance IA (pitch + appel)",
        "Export CSV illimité",
        "Support prioritaire",
      ],
      current: true,
      highlighted: true,
    },
    {
      id: "business",
      name: "Business",
      price: 199,
      period: "month",
      credits: 600,
      features: [
        "600 crédits / mois",
        "Tout Pro inclus",
        "API access",
        "Multi-utilisateurs (jusqu'à 5)",
        "Onboarding dédié",
      ],
      current: false,
    },
  ],
  creditPacks: [
    { id: "pack-25", credits: 25, price: 9 },
    { id: "pack-100", credits: 100, price: 29, badge: "Populaire" },
    { id: "pack-300", credits: 300, price: 69, badge: "Meilleure valeur" },
  ],
};

```

---

## `src/lib/mock/dashboard.ts`

```ts
import type { DashboardData } from "@/types/dashboard";

export const mockDashboardData: DashboardData = {
  user: {
    name: "Victor",
    email: "victor@example.com",
    plan: "Pro",
  },
  stats: {
    searchesThisMonth: 12,
    prospectsFound: 248,
    averageScore: 78,
    creditsRemaining: 92,
    creditsTotal: 100,
  },
  activities: [
    {
      id: "act-1",
      type: "search",
      title: "Recherche Logistique Paris",
      description: "32 prospects analysés, score moyen 84/100",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "act-2",
      type: "search",
      title: "Recherche Industrie Île-de-France",
      description: "48 prospects, 11 prioritaires",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "act-3",
      type: "export",
      title: "Export CSV",
      description: "Fichier exporté vers le stockage",
      createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "act-4",
      type: "ai",
      title: "Pitch généré — Supply Expert",
      description: "Message personnalisé prêt à envoyer",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  searchHistory: [
    {
      id: "hist-1",
      sector: "Logistique",
      city: "Paris",
      prospectCount: 32,
      averageScore: 84,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "hist-2",
      sector: "Industrie",
      city: "Lyon",
      prospectCount: 21,
      averageScore: 76,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "hist-3",
      sector: "Transport",
      city: "Lille",
      prospectCount: 18,
      averageScore: 81,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "hist-4",
      sector: "Supply chain",
      city: "Marseille",
      prospectCount: 27,
      averageScore: 79,
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  priorityProspects: [
    {
      id: "pros-1",
      name: "Translog France",
      city: "Paris",
      sector: "Logistique",
      score: 91,
    },
    {
      id: "pros-2",
      name: "Supply Expert",
      city: "Nanterre",
      sector: "Transport",
      score: 88,
    },
    {
      id: "pros-3",
      name: "Quick Freight",
      city: "Lyon",
      sector: "Transport",
      score: 84,
    },
    {
      id: "pros-4",
      name: "Nord Cargo",
      city: "Lille",
      sector: "Logistique",
      score: 82,
    },
  ],
};

```

---

## `src/lib/mock/history.ts`

```ts
import type { HistoryEntry } from "@/types/history";
import type { ProspectResult } from "@/types/prospect";

const sampleProspects: ProspectResult[] = [
  {
    id: "p-1",
    name: "Translog France",
    sector: "Logistique",
    city: "Paris",
    country: "France",
    score: 91,
    reason: "Correspondance forte avec Logistique à Paris. Signaux de croissance détectés.",
    website: "translog.fr",
  },
  {
    id: "p-2",
    name: "Supply Expert",
    sector: "Transport",
    city: "Nanterre",
    country: "France",
    score: 88,
    reason: "Secteur aligné sur « Transport ». Présence confirmée en France.",
    website: "supply-expert.com",
  },
  {
    id: "p-3",
    name: "Quick Freight",
    sector: "Transport",
    city: "Lyon",
    country: "France",
    score: 84,
    reason: "Prospect qualifié dans la zone 50 km autour de Paris.",
  },
];

export const mockHistory: HistoryEntry[] = [
  {
    id: "hist-1",
    sector: "Logistique",
    city: "Paris",
    country: "France",
    radius: "50 km",
    companySize: "PME, ETI",
    keywords: "recrutement supply chain",
    targetRole: "Directeur logistique",
    prospectCount: 32,
    averageScore: 84,
    prospects: sampleProspects,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "hist-2",
    sector: "Industrie",
    city: "Lyon",
    country: "France",
    radius: "20 km",
    companySize: "ETI, GE",
    keywords: "production manufacturing",
    targetRole: "Directeur industriel",
    prospectCount: 21,
    averageScore: 76,
    prospects: sampleProspects.slice(0, 2),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "hist-3",
    sector: "Transport",
    city: "Lille",
    country: "France",
    radius: "20 km",
    keywords: "transport routier",
    prospectCount: 18,
    averageScore: 81,
    prospects: sampleProspects.slice(1),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "hist-4",
    sector: "Supply chain",
    city: "Marseille",
    country: "France",
    radius: "50 km",
    companySize: "PME",
    keywords: "supply chain optimisation",
    targetRole: "Responsable achats",
    prospectCount: 27,
    averageScore: 79,
    prospects: sampleProspects,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "hist-5",
    sector: "BTP",
    city: "Bordeaux",
    country: "France",
    radius: "100 km",
    companySize: "PME",
    keywords: "construction chantier",
    targetRole: "Directeur travaux",
    prospectCount: 15,
    averageScore: 72,
    prospects: sampleProspects.slice(0, 1),
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

```

---

## `src/lib/mock/prospects.ts`

```ts
import type {
  ProspectResult,
  ProspectSearchFilters,
} from "@/types/prospect";

const prospectPool: Omit<ProspectResult, "reason">[] = [
  {
    id: "p-1",
    name: "Translog France",
    sector: "Logistique",
    city: "Paris",
    country: "France",
    score: 91,
    website: "translog.fr",
  },
  {
    id: "p-2",
    name: "Supply Expert",
    sector: "Transport",
    city: "Nanterre",
    country: "France",
    score: 88,
    website: "supply-expert.com",
  },
  {
    id: "p-3",
    name: "Quick Freight",
    sector: "Transport",
    city: "Lyon",
    country: "France",
    score: 84,
  },
  {
    id: "p-4",
    name: "Nord Cargo",
    sector: "Logistique",
    city: "Lille",
    country: "France",
    score: 82,
  },
  {
    id: "p-5",
    name: "Flow Chain",
    sector: "Supply chain",
    city: "Marseille",
    country: "France",
    score: 79,
  },
  {
    id: "p-6",
    name: "Euro Transit",
    sector: "Transport",
    city: "Bordeaux",
    country: "France",
    score: 86,
  },
];

function buildReason(prospect: Omit<ProspectResult, "reason">, filters: ProspectSearchFilters): string {
  const sectorMatch = prospect.sector
    .toLowerCase()
    .includes(filters.sector.toLowerCase().slice(0, 4));
  const cityMatch =
    prospect.city.toLowerCase() === filters.city.toLowerCase();

  if (sectorMatch && cityMatch) {
    return `Correspondance forte avec ${filters.sector} à ${filters.city}. Signaux de croissance détectés.`;
  }
  if (sectorMatch) {
    return `Secteur aligné sur « ${filters.sector} ». Présence confirmée en ${filters.country}.`;
  }
  return `Prospect qualifié dans la zone ${filters.radius} autour de ${filters.city}.`;
}

export function searchMockProspects(
  filters: ProspectSearchFilters,
): ProspectResult[] {
  const sectorLower = filters.sector.toLowerCase();

  const filtered = prospectPool.filter((p) => {
    const sectorOk =
      p.sector.toLowerCase().includes(sectorLower) ||
      sectorLower.includes(p.sector.toLowerCase().slice(0, 4));
    const cityOk =
      !filters.city ||
      p.city.toLowerCase().includes(filters.city.toLowerCase()) ||
      filters.city.length < 3;
    return sectorOk || cityOk;
  });

  const results = (filtered.length > 0 ? filtered : prospectPool).slice(0, 5);

  return results.map((p) => ({
    ...p,
    reason: buildReason(p, filters),
  }));
}

```

---

## `src/lib/navigation.ts`

```ts
export interface NavItem {
  href: string;
  label: string;
  description?: string;
}

export const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", description: "Vue d'ensemble" },
  {
    href: "/prospect-finder",
    label: "Prospect Finder",
    description: "Recherche B2B",
  },
  {
    href: "/ai-assistant",
    label: "Assistance IA",
    description: "Pitch & appels",
  },
  { href: "/history", label: "Historique", description: "Recherches passées" },
  { href: "/exports", label: "Exports", description: "Fichiers CSV" },
  { href: "/billing", label: "Facturation", description: "Crédits & plan" },
  { href: "/settings", label: "Paramètres", description: "Compte" },
];

```

---

## `src/lib/schemas/ai-assist.ts`

```ts
import { z } from "zod";

export const aiProspectSchema = z.object({
  companyName: z.string().min(2, "Indique le nom de l'entreprise"),
  sector: z.string().min(2, "Indique le secteur"),
  city: z.string().min(2, "Indique la ville"),
  targetRole: z.string().optional(),
  context: z.string().optional(),
});

export type AiProspectFormValues = z.infer<typeof aiProspectSchema>;

```

---

## `src/lib/schemas/prospect-search.ts`

```ts
import { z } from "zod";

export const prospectSearchSchema = z.object({
  sector: z.string().min(2, "Indique un secteur"),
  city: z.string().min(2, "Indique une ville"),
  country: z.string().min(2, "Indique un pays"),
  radius: z.enum(["10 km", "20 km", "50 km", "100 km"]),
  companySize: z.string().optional(),
  keywords: z.string().optional(),
  targetRole: z.string().optional(),
});

export type ProspectSearchFormValues = z.infer<typeof prospectSearchSchema>;

```

---

## `src/lib/supabase/client.ts`

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

```

---

## `src/lib/supabase/server.ts`

```ts
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return (
    url.startsWith("https://") &&
    !url.includes("your-project") &&
    key.length > 20 &&
    !key.includes("your-")
  );
}

```

---

## `src/stores/use-credits-store.ts`

```ts
import { create } from "zustand";

interface CreditsState {
  remaining: number;
  total: number;
  initialized: boolean;
  setCredits: (remaining: number, total: number) => void;
  consume: (amount: number) => void;
}

export const useCreditsStore = create<CreditsState>((set) => ({
  remaining: 0,
  total: 100,
  initialized: false,
  setCredits: (remaining, total) =>
    set({ remaining, total, initialized: true }),
  consume: (amount) =>
    set((state) => ({
      remaining: Math.max(0, state.remaining - amount),
    })),
}));

```

---

## `src/types/ai-assistant.ts`

```ts
export type AiTaskType = "summary" | "pitch" | "call-prep";

export interface AiProspectInput {
  companyName: string;
  sector: string;
  city: string;
  targetRole: string;
  context?: string;
}

export interface AiSummaryResult {
  headline: string;
  description: string;
  strengths: string[];
  opportunities: string[];
  creditsUsed: number;
}

export interface AiPitchResult {
  subject: string;
  body: string;
  cta: string;
  creditsUsed: number;
}

export interface AiCallPrepResult {
  openingLine: string;
  keyPoints: string[];
  objections: { objection: string; response: string }[];
  closingLine: string;
  creditsUsed: number;
}

export interface AiAssistRequest {
  task: AiTaskType;
  prospect: AiProspectInput;
}

export type AiAssistResult = AiSummaryResult | AiPitchResult | AiCallPrepResult;

export interface AiAssistResponse {
  task: AiTaskType;
  result: AiAssistResult;
}

```

---

## `src/types/billing.ts`

```ts
export interface Plan {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  credits: number;
  features: string[];
  current: boolean;
  highlighted?: boolean;
}

export interface CreditPack {
  id: string;
  credits: number;
  price: number;
  badge?: string;
}

export interface BillingData {
  currentPlan: string;
  creditsRemaining: number;
  creditsTotal: number;
  renewalDate: string;
  plans: Plan[];
  creditPacks: CreditPack[];
}

```

---

## `src/types/dashboard.ts`

```ts
export type ActivityType = "search" | "export" | "ai" | "enrichment";

export interface DashboardStats {
  searchesThisMonth: number;
  prospectsFound: number;
  averageScore: number;
  creditsRemaining: number;
  creditsTotal: number;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  createdAt: string;
}

export interface SearchHistoryItem {
  id: string;
  sector: string;
  city: string;
  prospectCount: number;
  averageScore: number;
  createdAt: string;
}

export interface PriorityProspect {
  id: string;
  name: string;
  city: string;
  sector: string;
  score: number;
}

export interface DashboardData {
  stats: DashboardStats;
  activities: ActivityItem[];
  searchHistory: SearchHistoryItem[];
  priorityProspects: PriorityProspect[];
  user: {
    name: string;
    email: string;
    plan: string;
  };
}

```

---

## `src/types/history.ts`

```ts
import type { ProspectResult } from "./prospect";

export interface HistoryEntry {
  id: string;
  sector: string;
  city: string;
  country: string;
  radius: string;
  companySize?: string;
  keywords?: string;
  targetRole?: string;
  prospectCount: number;
  averageScore: number;
  prospects: ProspectResult[];
  createdAt: string;
}

export interface HistoryListResponse {
  entries: HistoryEntry[];
  total: number;
}

```

---

## `src/types/prospect.ts`

```ts
export interface ProspectSearchFilters {
  sector: string;
  city: string;
  country: string;
  radius: string;
  companySize?: string;
  keywords?: string;
  targetRole?: string;
}

export interface ProspectResult {
  id: string;
  name: string;
  sector: string;
  city: string;
  country: string;
  score: number;
  reason: string;
  website?: string;
  role?: string;
  size?: string;
  employees?: string;
  revenue?: string;
  contact?: string;
  phone?: string;
  linkedin?: string;
}

export interface ProspectSearchResponse {
  prospects: ProspectResult[];
  total: number;
  searchId: string;
}

```

---

