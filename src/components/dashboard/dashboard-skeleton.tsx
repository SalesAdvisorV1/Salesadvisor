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