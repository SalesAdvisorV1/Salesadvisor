"use client";

import { useRef, useEffect, useState } from "react";
import { useMotionValue, useSpring, useInView } from "framer-motion";

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

// Monochrome indigo system — same hue, subtle bg/shade differences only
const ICON_CONFIG = {
  search: {
    svg: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  users: {
    svg: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
      </svg>
    ),
  },
  star: {
    svg: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  credit: {
    svg: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" strokeLinecap="round" />
      </svg>
    ),
  },
};

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return <span ref={ref}>{display}</span>;
}

// Split "84/100" → main "84" + suffix "/100" (smaller, muted)
function splitFraction(v: string | number): { main: string | number; suffix: string | null } {
  if (typeof v === 'string' && v.includes('/')) {
    const [main, rest] = v.split('/');
    return { main: main.trim(), suffix: `/${rest.trim()}` };
  }
  return { main: v, suffix: null };
}

export function StatCard({ title, label, value, subtitle, sub, trend, icon }: StatCardProps) {
  const heading = title || label || '';
  const caption = subtitle || sub || '';
  const iconConf = icon ? ICON_CONFIG[icon] : null;
  const { main, suffix } = splitFraction(value);
  const isNumeric = typeof main === 'number' || (typeof main === 'string' && /^\d+$/.test(main));
  const numericMain = isNumeric ? Number(main) : null;

  const isTrendPositive = trend && (trend.startsWith('+') || trend.includes('↑'));
  const isTrendNegative = trend && (trend.startsWith('-') || trend.includes('↓'));

  return (
    <div
      className="rounded-2xl p-5 cursor-default transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(99,102,241,0.10)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
      }}
      onMouseEnter={(e) => {
        const t = e.currentTarget as HTMLDivElement;
        t.style.transform = 'translateY(-2px)';
        t.style.boxShadow = '0 10px 24px rgba(99,102,241,0.12)';
        t.style.borderColor = 'rgba(99,102,241,0.22)';
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget as HTMLDivElement;
        t.style.transform = 'translateY(0)';
        t.style.boxShadow = '0 1px 2px rgba(15,23,42,0.04)';
        t.style.borderColor = 'rgba(99,102,241,0.10)';
      }}
    >
      {iconConf && (
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{
            background: 'rgba(99,102,241,0.10)',
            border: '1px solid rgba(99,102,241,0.16)',
            color: '#4f46e5',
          }}
        >
          {iconConf.svg}
        </div>
      )}

      <p className="text-[11px] font-semibold uppercase tracking-wider leading-tight" style={{ color: '#64748b' }}>
        {heading}
      </p>

      <p
        className="mt-2 tabular-nums leading-none flex items-baseline gap-1"
        style={{ color: '#0f172a', fontSize: '32px', fontWeight: 700, letterSpacing: '-0.025em' }}
      >
        <span>
          {numericMain !== null ? <AnimatedCounter value={numericMain} /> : main}
        </span>
        {suffix && (
          <span className="text-base font-medium" style={{ color: '#94a3b8', letterSpacing: '-0.01em' }}>
            {suffix}
          </span>
        )}
      </p>

      <div className="flex items-center gap-2 mt-2.5">
        {caption && <p className="text-xs" style={{ color: '#64748b' }}>{caption}</p>}
        {trend && (
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums"
            style={
              isTrendPositive
                ? { background: 'rgba(16,185,129,0.10)', color: '#059669' }
                : isTrendNegative
                ? { background: 'rgba(239,68,68,0.10)', color: '#dc2626' }
                : { background: 'rgba(99,102,241,0.10)', color: '#4f46e5' }
            }
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
