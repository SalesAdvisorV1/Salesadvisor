"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNavItems } from "@/lib/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 md:hidden">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="font-semibold text-white">
          Sales Advisor
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300"
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav className="mt-3 space-y-1 pb-2">
          {mainNavItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-2.5 text-sm ${
                  active
                    ? "bg-blue-500/15 text-white"
                    : "text-slate-300 hover:bg-slate-800"
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
