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
