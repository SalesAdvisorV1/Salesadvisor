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

const ICON_CONFIG = {
  search: {
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    glow: 'rgba(99,102,241,0.30)',
    svg: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  users: {
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',
    glow: 'rgba(6,182,212,0.25)',
    svg: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
      </svg>
    ),
  },
  star: {
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    glow: 'rgba(139,92,246,0.28)',
    svg: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  credit: {
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
    glow: 'rgba(245,158,11,0.25)',
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

export function StatCard({ title, label, value, subtitle, sub, trend, icon }: StatCardProps) {
  const heading = title || label || '';
  const caption = subtitle || sub || '';
  const iconConf = icon ? ICON_CONFIG[icon] : null;
  const isNumeric = typeof value === 'number';

  const isTrendPositive = trend && (trend.startsWith('+') || trend.includes('↑'));
  const isTrendNegative = trend && (trend.startsWith('-') || trend.includes('↓'));

  return (
    <div
      className="rounded-2xl p-5 cursor-default transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 4px 16px rgba(99,102,241,0.08)',
      }}
      onMouseEnter={(e) => {
        const t = e.currentTarget as HTMLDivElement;
        t.style.transform = 'translateY(-2px)';
        t.style.boxShadow = '0 12px 28px rgba(99,102,241,0.15)';
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget as HTMLDivElement;
        t.style.transform = 'translateY(0)';
        t.style.boxShadow = '0 4px 16px rgba(99,102,241,0.08)';
      }}
    >
      {iconConf && (
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-white"
          style={{
            background: iconConf.gradient,
            boxShadow: `0 6px 14px ${iconConf.glow}, 0 1px 0 rgba(255,255,255,0.3) inset`,
          }}
        >
          {iconConf.svg}
        </div>
      )}

      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider leading-tight">{heading}</p>

      <p
        className="text-3xl font-extrabold mt-1.5 tabular-nums leading-none"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #4f46e5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '-0.025em',
        }}
      >
        {isNumeric ? <AnimatedCounter value={value as number} /> : value}
      </p>

      <div className="flex items-center gap-2 mt-2.5">
        {caption && <p className="text-xs text-gray-400">{caption}</p>}
        {trend && (
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={
              isTrendPositive
                ? { background: 'rgba(16,185,129,0.12)', color: '#059669' }
                : isTrendNegative
                ? { background: 'rgba(239,68,68,0.12)', color: '#dc2626' }
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
