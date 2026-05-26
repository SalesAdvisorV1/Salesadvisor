"use client";

import Link from "next/link";
import { useState } from "react";
import { ProspectResult } from "@/types/prospect";

interface Props { prospect: ProspectResult; }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p
        className="text-[10px] uppercase tracking-[0.12em] mb-1 font-semibold"
        style={{ color: '#94a3b8' }}
      >
        {label}
      </p>
      <div className="text-[13px]" style={{ color: '#0f172a' }}>{children}</div>
    </div>
  );
}

// Monochrome indigo avatars
const AVATAR_TONES: { bg: string; color: string }[] = [
  { bg: 'rgba(99,102,241,0.14)', color: '#4f46e5' },
  { bg: 'rgba(99,102,241,0.20)', color: '#4338ca' },
  { bg: 'rgba(139,92,246,0.14)', color: '#7c3aed' },
  { bg: 'rgba(139,92,246,0.20)', color: '#6d28d9' },
];

function getAvatarTone(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_TONES[Math.abs(hash) % AVATAR_TONES.length];
}

function ScoreBadge({ score }: { score: number }) {
  // Semantic but muted (red/green reserved for scores)
  const config = score >= 85
    ? { bg: 'rgba(16,185,129,0.14)', ring: 'rgba(16,185,129,0.18)', color: '#059669' }
    : score >= 70
    ? { bg: 'rgba(245,158,11,0.14)', ring: 'rgba(245,158,11,0.18)', color: '#b45309' }
    : { bg: 'rgba(239,68,68,0.14)', ring: 'rgba(239,68,68,0.18)', color: '#dc2626' };

  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
      style={{
        background: config.bg,
        boxShadow: `0 0 0 4px ${config.ring}`,
        color: config.color,
      }}
    >
      <span className="text-[12px] font-bold leading-none tabular-nums">{score}</span>
    </div>
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-xs px-2.5 py-1 rounded-lg font-medium transition-all"
      style={copied
        ? { background: 'rgba(16,185,129,0.12)', color: '#059669' }
        : { background: 'rgba(99,102,241,0.08)', color: '#4f46e5', border: '1px solid rgba(99,102,241,0.16)' }
      }
    >
      {copied ? 'Copié ✓' : 'Copier'}
    </button>
  );
}

export function ProspectResultCard({ prospect }: Props) {
  const score = prospect.score ?? 0;
  const initials = prospect.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  const tone = getAvatarTone(prospect.name);

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-200"
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

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          {/* Company avatar */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-[12px] font-bold"
            style={{
              background: tone.bg,
              color: tone.color,
              border: '1px solid rgba(99,102,241,0.10)',
            }}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold leading-tight" style={{ color: '#0f172a' }}>{prospect.name}</h3>
            <p className="text-xs mt-0.5 truncate" style={{ color: '#94a3b8' }}>{prospect.sector} · {prospect.city}, {prospect.country}</p>
          </div>
        </div>
        <ScoreBadge score={score} />
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
        {prospect.role && <Field label="Poste ciblé">{prospect.role}</Field>}
        {prospect.size && <Field label="Taille">{prospect.size} · {prospect.employees}</Field>}
        {prospect.revenue && <Field label="CA estimé">{prospect.revenue}</Field>}
        {prospect.website && (
          <Field label="Site web">
            <a
              href={`https://${prospect.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors truncate block"
              style={{ color: '#4f46e5' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#4338ca'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#4f46e5'; }}
            >
              {prospect.website}
            </a>
          </Field>
        )}
      </div>

      {/* Contact row */}
      {(prospect.contact || prospect.phone || prospect.linkedin) && (
        <div className="pt-3 space-y-2" style={{ borderTop: '1px solid rgba(99,102,241,0.10)' }}>
          {prospect.contact && (
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] uppercase tracking-[0.12em] w-12 shrink-0 font-semibold"
                style={{ color: '#94a3b8' }}
              >
                Email
              </span>
              <a
                href={`mailto:${prospect.contact}`}
                className="text-xs transition-colors truncate flex-1"
                style={{ color: '#475569' }}
              >
                {prospect.contact}
              </a>
              <CopyEmailButton email={prospect.contact} />
            </div>
          )}
          {prospect.phone && (
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] uppercase tracking-[0.12em] w-12 shrink-0 font-semibold"
                style={{ color: '#94a3b8' }}
              >
                Tél
              </span>
              <a
                href={`tel:${prospect.phone}`}
                className="text-xs transition-colors"
                style={{ color: '#475569' }}
              >
                {prospect.phone}
              </a>
            </div>
          )}
          {prospect.linkedin && (
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] uppercase tracking-[0.12em] w-12 shrink-0 font-semibold"
                style={{ color: '#94a3b8' }}
              >
                LinkedIn
              </span>
              <a
                href={`https://${prospect.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors truncate"
                style={{ color: '#4f46e5' }}
              >
                {prospect.linkedin}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Reason */}
      {prospect.reason && (
        <p
          className="italic text-xs pt-3 mt-3 leading-relaxed"
          style={{
            color: '#64748b',
            borderTop: '1px solid rgba(99,102,241,0.10)',
          }}
        >
          {prospect.reason}
        </p>
      )}

      {/* IA CTA — gradient indigo */}
      <Link
        href={`/ai-assistant?company=${encodeURIComponent(prospect.name)}&sector=${encodeURIComponent(prospect.sector)}&city=${encodeURIComponent(prospect.city)}`}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[13px] font-semibold text-white transition-all duration-200 min-h-[44px]"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          boxShadow: '0 4px 14px rgba(99,102,241,0.28), 0 1px 0 rgba(255,255,255,0.25) inset',
        }}
        onMouseEnter={(e) => {
          const t = e.currentTarget as HTMLAnchorElement;
          t.style.transform = 'translateY(-1px)';
          t.style.boxShadow = '0 8px 22px rgba(99,102,241,0.40), 0 1px 0 rgba(255,255,255,0.25) inset';
        }}
        onMouseLeave={(e) => {
          const t = e.currentTarget as HTMLAnchorElement;
          t.style.transform = 'translateY(0)';
          t.style.boxShadow = '0 4px 14px rgba(99,102,241,0.28), 0 1px 0 rgba(255,255,255,0.25) inset';
        }}
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Analyser avec IA
      </Link>
    </div>
  );
}

