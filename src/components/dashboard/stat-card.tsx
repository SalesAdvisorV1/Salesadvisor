interface StatCardProps {
  title?: string;
  label?: string;
  value: string | number;
  subtitle?: string;
  sub?: string;
  highlight?: boolean;
  trend?: string;
  icon?: 'search' | 'users' | 'star' | 'credit';
}

const ICON_CONFIG = {
  search: { bg: 'bg-blue-50', color: 'text-blue-600', svg: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  )},
  users: { bg: 'bg-green-50', color: 'text-green-600', svg: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
    </svg>
  )},
  star: { bg: 'bg-violet-50', color: 'text-violet-600', svg: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )},
  credit: { bg: 'bg-orange-50', color: 'text-orange-600', svg: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" strokeLinecap="round" />
    </svg>
  )},
};

export function StatCard({ title, label, value, subtitle, sub, highlight, trend, icon }: StatCardProps) {
  const heading = title || label || '';
  const caption = subtitle || sub || '';
  const iconConf = icon ? ICON_CONFIG[icon] : null;

  const isTrendPositive = trend && (trend.startsWith('+') || trend.includes('↑'));
  const isTrendNegative = trend && (trend.startsWith('-') || trend.includes('↓'));

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 animate-fade-up">
      {iconConf && (
        <div className={`w-10 h-10 ${iconConf.bg} ${iconConf.color} rounded-xl flex items-center justify-center mb-4`}>
          {iconConf.svg}
        </div>
      )}

      <p className="text-sm text-gray-500 mt-0 leading-tight">{heading}</p>

      <p className="text-3xl font-black text-gray-900 mt-1 tabular-nums">{value}</p>

      <div className="flex items-center gap-2 mt-2">
        {caption && (
          <p className="text-xs text-gray-400">{caption}</p>
        )}
        {trend && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            isTrendPositive ? 'bg-green-50 text-green-600' :
            isTrendNegative ? 'bg-red-50 text-red-600' :
            'bg-gray-100 text-gray-500'
          }`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
