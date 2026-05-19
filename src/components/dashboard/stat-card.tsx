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
    <div className={`rounded-2xl border p-6 transition-all hover:scale-[1.01] ${
      highlight
        ? 'bg-white border-white text-black shadow-lg'
        : 'bg-[#111] border-[#222] hover:border-[#333] hover:bg-[#141414]'
    }`}>
      <p className={`text-[11px] font-semibold uppercase tracking-widest mb-4 ${
        highlight ? 'text-black/40' : 'text-[#555]'
      }`}>
        {heading}
      </p>
      <p className={`text-4xl font-black tracking-tight mb-1.5 ${
        highlight ? 'text-black' : 'text-white'
      }`}>
        {value}
      </p>
      {caption && (
        <p className={`text-xs font-medium ${
          highlight ? 'text-black/50' : 'text-[#555]'
        }`}>{caption}</p>
      )}
    </div>
  );
}
