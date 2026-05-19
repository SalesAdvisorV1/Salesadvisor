interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  highlight?: boolean;
}

export function StatCard({
  title,
  value,
  subtitle,
  highlight = false,
}: StatCardProps) {
  const cardClass = highlight
    ? "border-white/20 bg-white/10"
    : "border-slate-800 bg-slate-900/60";

  return (
    <div className={`rounded-3xl border p-6 ${cardClass}`}>
      <div className="text-sm text-slate-400">{title}</div>
      <div className="mt-3 text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{subtitle}</div>
    </div>
  );
}
