interface StatCardProps {
  title?: string;
  label?: string;
  value: string | number;
  subtitle?: string;
  sub?: string;
  highlight?: boolean;
  trend?: string;
}

export function StatCard({ title, label, value, subtitle, sub, highlight, trend }: StatCardProps) {
  const heading = title || label || '';
  const caption = subtitle || sub || '';

  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-150 ${
        highlight
          ? 'bg-white border-white'
          : 'bg-[#111] border-[#1e1e1e] hover:border-[#2a2a2a]'
      }`}
    >
      <p className={`text-[10px] uppercase tracking-[0.12em] font-medium mb-3 ${
        highlight ? 'text-black/40' : 'text-[#444]'
      }`}>
        {heading}
      </p>

      <p className={`text-3xl font-black tabular-nums mb-1 ${
        highlight ? 'text-black' : 'text-white'
      }`}>
        {value}
      </p>

      <div className="flex items-center gap-2">
        {caption && (
          <p className={`text-xs ${highlight ? 'text-black/50' : 'text-[#555]'}`}>
            {caption}
          </p>
        )}
        {trend && (
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
            highlight ? 'bg-black/10 text-black/60' : 'bg-[#1e1e1e] text-[#666]'
          }`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
