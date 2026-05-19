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
