"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavItems } from "@/lib/navigation";
import { useCreditsStore } from "@/stores/use-credits-store";

export function Sidebar() {
  const pathname = usePathname();
  const { remaining, total, initialized } = useCreditsStore();

  const creditsPercent =
    total > 0 ? Math.round((remaining / total) * 100) : 0;

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-slate-800 bg-slate-900/60 p-6">
      <SidebarBrand />

      <nav className="mt-8 flex-1 space-y-1 overflow-y-auto text-sm">
        {mainNavItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-3 transition-colors ${
                active
                  ? "bg-blue-500/15 text-white ring-1 ring-blue-500/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="font-medium">{item.label}</span>
              {item.description ? (
                <span className="mt-0.5 block text-xs text-slate-500">
                  {item.description}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 shrink-0 rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Crédits IA</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400">
            Actif
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-semibold text-white">
            {initialized ? remaining : "—"}
          </span>
          <span className="text-sm text-slate-500">/ {total} crédits</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
          <CreditsBar percent={initialized ? creditsPercent : 0} />
        </div>
        <Link
          href="/billing"
          className="mt-3 block text-center text-xs font-medium text-blue-400 hover:text-blue-300"
        >
          Recharger les crédits →
        </Link>
      </div>
    </aside>
  );
}

function SidebarBrand() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-lg font-bold text-blue-300">
          SA
        </div>
        <div className="text-xs font-medium uppercase tracking-wider text-blue-400">
          Sales Advisor
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">
        Prospection B2B assistée par IA
      </p>
    </div>
  );
}

function CreditsBar({ percent }: { percent: number }) {
  return (
    <div
      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
      style={{ width: `${percent}%` }}
    />
  );
}
