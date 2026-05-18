import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav />
        <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
