"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavItems } from "@/lib/navigation";
import { useCreditsStore } from "@/stores/use-credits-store";

export function Sidebar() {
  const pathname = usePathname();
  const { remaining, total, initialized } = useCreditsStore();
  const creditsPercent = total > 0 ? Math.round((remaining / total) * 100) : 0;

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-[#222] bg-black p-5">
      <SidebarBrand />

      <nav className="mt-8 flex-1 space-y-0.5 overflow-y-auto">
        {mainNavItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-[#111] border border-[#333] text-white"
                  : "text-[#888] hover:bg-[#0d0d0d] hover:text-white border border-transparent"
              }`}
            >
              <NavIcon href={item.href} active={active} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 shrink-0 rounded-xl border border-[#222] bg-[#0a0a0a] p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#888]">Crédits IA</span>
          <span className="rounded-full border border-[#333] bg-[#111] px-2 py-0.5 text-xs font-medium text-white">
            Actif
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-white">
            {initialized ? remaining : "—"}
          </span>
          <span className="text-xs text-[#444]">/ {total}</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#222]">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${initialized ? creditsPercent : 0}%` }}
          />
        </div>
        <Link
          href="/billing"
          className="mt-3 block text-center text-xs font-medium text-[#888] transition-colors hover:text-white"
        >
          Recharger →
        </Link>
      </div>
    </aside>
  );
}

function SidebarBrand() {
  return (
    <div className="flex items-center gap-3 px-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#333] bg-[#111] text-xs font-bold text-white">
        SA
      </div>
      <span className="text-sm font-semibold tracking-tight text-white">Sales Advisor</span>
    </div>
  );
}

function NavIcon({ href, active }: { href: string; active: boolean }) {
  const color = active ? "#fff" : "#555";
  const icons: Record<string, React.ReactNode> = {
    "/dashboard": (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    "/prospect-finder": (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    "/ai-assistant": (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    "/history": (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "/exports": (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    "/billing": (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    "/settings": (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };
  return <span className="shrink-0">{icons[href] ?? null}</span>;
}
