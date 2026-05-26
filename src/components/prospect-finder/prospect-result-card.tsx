"use client";

import Link from "next/link";
import { useState } from "react";
import { ProspectResult } from "@/types/prospect";

interface Props { prospect: ProspectResult; onEnrich?: () => void; }

// ---- Helpers ----

function isMeaningful(value: string | undefined | null): value is string {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  return v.length > 0 && v !== 'n/c' && v !== 'n/a' && v !== '-' && v !== '—';
}

// Avatar gradient tones — monochrome indigo family with subtle variation
const AVATAR_GRADIENTS: { bg: string; ring: string; color: string }[] = [
  { bg: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', ring: 'rgba(99,102,241,0.35)', color: '#ffffff' },
  { bg: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', ring: 'rgba(79,70,229,0.35)',  color: '#ffffff' },
  { bg: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)', ring: 'rgba(129,140,248,0.35)', color: '#ffffff' },
  { bg: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)', ring: 'rgba(99,102,241,0.35)', color: '#ffffff' },
];

function getAvatarGradient(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

// Muted semantic score colors
function scoreStyle(score: number): { bg: string; color: string; ring: string; label: string } {
  if (score >= 85) return { bg: 'rgba(16,185,129,0.10)', color: '#059669', ring: '#10b981', label: 'Excellent' };
  if (score >= 70) return { bg: 'rgba(245,158,11,0.10)', color: '#b45309', ring: '#f59e0b', label: 'Bon' };
  return                 { bg: 'rgba(239,68,68,0.08)',  color: '#dc2626', ring: '#ef4444', label: 'Faible' };
}

// ---- Circular score with progress ring ----

function ScoreRing({ score }: { score: number }) {
  const cfg = scoreStyle(score);
  const radius = 22;
  const stroke = 3;
  const norm = radius - stroke / 2;
  const circumference = norm * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  return (
    <div
      className="relative shrink-0 flex items-center justify-center"
      style={{ width: 52, height: 52 }}
      title={`Score ${score} — ${cfg.label}`}
    >
      <svg width={52} height={52} className="absolute inset-0 -rotate-90">
        {/* Background track */}
        <circle
          cx={26}
          cy={26}
          r={norm}
          fill="none"
          stroke="rgba(15,23,42,0.06)"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={26}
          cy={26}
          r={norm}
          fill="none"
          stroke={cfg.ring}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 600ms ease-out' }}
        />
      </svg>
      <div className="relative flex flex-col items-center justify-center leading-none">
        <span className="text-[14px] font-bold tabular-nums" style={{ color: cfg.color }}>
          {score}
        </span>
        <span className="text-[8px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: cfg.color, opacity: 0.7, letterSpacing: '0.05em' }}>
          /100
        </span>
      </div>
    </div>
  );
}

// ---- Copy button ----

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? 'Email copié' : 'Copier email'}
      aria-label={copied ? 'Email copié' : 'Copier email'}
      className="w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0"
      style={copied
        ? { background: 'rgba(16,185,129,0.12)', color: '#059669', border: '1px solid rgba(16,185,129,0.20)' }
        : { background: 'rgba(99,102,241,0.06)', color: '#64748b', border: '1px solid rgba(99,102,241,0.12)' }
      }
    >
      {copied ? (
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

// ---- Contact icon link ----

function ContactIconLink({
  href,
  title,
  external,
  children,
}: {
  href: string;
  title: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      title={title}
      aria-label={title}
      onClick={(e) => e.stopPropagation()}
      className="w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0"
      style={{
        background: 'rgba(99,102,241,0.06)',
        color: '#64748b',
        border: '1px solid rgba(99,102,241,0.12)',
      }}
      onMouseEnter={(e) => {
        const t = e.currentTarget as HTMLAnchorElement;
        t.style.background = 'rgba(99,102,241,0.14)';
        t.style.color = '#4f46e5';
        t.style.borderColor = 'rgba(99,102,241,0.30)';
        t.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget as HTMLAnchorElement;
        t.style.background = 'rgba(99,102,241,0.06)';
        t.style.color = '#64748b';
        t.style.borderColor = 'rgba(99,102,241,0.12)';
        t.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </a>
  );
}

// ---- Info pill with icon ----

function InfoPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-medium rounded-md px-2 py-1"
      style={{
        background: 'rgba(99,102,241,0.05)',
        border: '1px solid rgba(99,102,241,0.10)',
        color: '#475569',
      }}
    >
      <span style={{ color: '#94a3b8' }}>{icon}</span>
      <span className="uppercase tracking-wider text-[9px] font-semibold" style={{ color: '#94a3b8', letterSpacing: '0.04em' }}>
        {label}
      </span>
      <span style={{ color: '#0f172a', fontWeight: 600 }}>{value}</span>
    </span>
  );
}

// ---- Main card ----

export function ProspectResultCard({ prospect, onEnrich }: Props) {
  const score = prospect.score ?? 0;
  const initials = prospect.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  const avatarG = getAvatarGradient(prospect.name);
  const isTopMatch = score >= 85;

  // Build size/employees label, hiding "N/C"
  const sizeBits: string[] = [];
  if (isMeaningful(prospect.size)) sizeBits.push(prospect.size);
  if (isMeaningful(prospect.employees)) sizeBits.push(prospect.employees);
  const sizeLabel = sizeBits.join(' · ');

  return (
    <div
      className="relative rounded-2xl p-4 transition-all duration-200 group overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(99,102,241,0.12)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
      }}
      onMouseEnter={(e) => {
        const t = e.currentTarget as HTMLDivElement;
        t.style.transform = 'translateY(-2px)';
        t.style.boxShadow = '0 12px 28px rgba(99,102,241,0.14), 0 1px 0 rgba(255,255,255,0.6) inset';
        t.style.borderColor = 'rgba(99,102,241,0.28)';
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget as HTMLDivElement;
        t.style.transform = 'translateY(0)';
        t.style.boxShadow = '0 1px 2px rgba(15,23,42,0.04)';
        t.style.borderColor = 'rgba(99,102,241,0.12)';
      }}
    >
      {/* Decorative corner glow — radial gradient bloom */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: -60,
          right: -60,
          width: 180,
          height: 180,
          background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(139,92,246,0) 60%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Top accent gradient line (visible) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-4 right-4 h-[2px] rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.30) 50%, transparent 100%)' }}
      />

      {/* Header row: avatar + name + score ring */}
      <div className="relative flex items-start gap-3">
        {/* Avatar with gradient + ring */}
        <div
          className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-[13px] font-bold"
          style={{
            background: avatarG.bg,
            color: avatarG.color,
            boxShadow: `0 4px 12px ${avatarG.ring}, 0 1px 0 rgba(255,255,255,0.25) inset`,
          }}
        >
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <h3
                  className="text-[14.5px] font-semibold leading-tight truncate"
                  style={{ color: '#0f172a', letterSpacing: '-0.012em' }}
                >
                  {prospect.name}
                </h3>
                {isTopMatch && (
                  <span
                    title="Top match"
                    aria-label="Top match"
                    className="shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      boxShadow: '0 2px 6px rgba(99,102,241,0.40)',
                    }}
                  >
                    <svg width="9" height="9" fill="white" viewBox="0 0 24 24">
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
                    </svg>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                {isMeaningful(prospect.sector) && (
                  <span
                    className="inline-flex items-center text-[10.5px] font-semibold rounded-md px-1.5 py-0.5"
                    style={{
                      background: 'rgba(99,102,241,0.10)',
                      color: '#4f46e5',
                      border: '1px solid rgba(99,102,241,0.18)',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {prospect.sector}
                  </span>
                )}
                <span className="text-[12px] truncate inline-flex items-center gap-1" style={{ color: '#94a3b8' }}>
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {[prospect.city, prospect.country].filter(isMeaningful).join(', ')}
                </span>
              </div>
            </div>

            <ScoreRing score={score} />
          </div>

          {/* Info pills row */}
          {(isMeaningful(prospect.role) || sizeLabel || isMeaningful(prospect.revenue)) && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {isMeaningful(prospect.role) && (
                <InfoPill
                  label="Poste"
                  value={prospect.role}
                  icon={(
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                />
              )}
              {sizeLabel && (
                <InfoPill
                  label="Taille"
                  value={sizeLabel}
                  icon={(
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M3 21V7l9-4 9 4v14" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 21V12h6v9" strokeLinecap="round" />
                    </svg>
                  )}
                />
              )}
              {isMeaningful(prospect.revenue) && (
                <InfoPill
                  label="CA"
                  value={prospect.revenue}
                  icon={(
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" />
                    </svg>
                  )}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reason — quote-style block */}
      {isMeaningful(prospect.reason) && (
        <div className="relative mt-3 pl-7 pr-2 py-2 rounded-lg" style={{ background: 'rgba(99,102,241,0.04)' }}>
          <svg
            aria-hidden="true"
            width="14" height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute left-2 top-2"
            style={{ color: 'rgba(99,102,241,0.45)' }}
          >
            <path d="M9.5 3A6.5 6.5 0 0 0 3 9.5c0 3 1.7 5.6 4.2 6.9.4-.6.8-1.5.8-2.4 0-1.4-.7-2.5-1.9-3.1-.5-.3-.6-1-.2-1.4l2.5-2.5c.5-.5.5-1.3 0-1.8L7.4 4.2A1 1 0 0 1 7.8 3h1.7zm10 0A6.5 6.5 0 0 0 13 9.5c0 3 1.7 5.6 4.2 6.9.4-.6.8-1.5.8-2.4 0-1.4-.7-2.5-1.9-3.1-.5-.3-.6-1-.2-1.4l2.5-2.5c.5-.5.5-1.3 0-1.8l-1-1A1 1 0 0 1 17.8 3h1.7z" />
          </svg>
          <p className="text-[12px] leading-relaxed" style={{ color: '#475569' }}>
            {prospect.reason}
          </p>
        </div>
      )}

      {/* Footer row: contact icons + CTA ghost */}
      <div className="relative flex items-center justify-between mt-3 pt-3 gap-3" style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}>
        <div className="flex items-center gap-1.5 min-w-0">
          {isMeaningful(prospect.contact) && (
            <>
              <ContactIconLink href={`mailto:${prospect.contact}`} title={`Email ${prospect.contact}`}>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ContactIconLink>
              <CopyEmailButton email={prospect.contact} />
            </>
          )}
          {isMeaningful(prospect.phone) && (
            <ContactIconLink href={`tel:${prospect.phone}`} title={`Appeler ${prospect.phone}`}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ContactIconLink>
          )}
          {isMeaningful(prospect.linkedin) && (
            <ContactIconLink
              href={`https://${prospect.linkedin.replace(/^https?:\/\//, '')}`}
              title="Voir LinkedIn"
              external
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </ContactIconLink>
          )}
          {isMeaningful(prospect.website) && (
            <ContactIconLink
              href={`https://${prospect.website.replace(/^https?:\/\//, '').replace(/[\[\]]|\(.*\)/g, '').trim()}`}
              title={`Site web ${prospect.website}`}
              external
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </ContactIconLink>
          )}
        </div>

        {/* Enrichir button */}
        {onEnrich && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onEnrich(); }}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0"
            style={{
              background: 'rgba(139,92,246,0.08)',
              color: '#7c3aed',
              border: '1px solid rgba(139,92,246,0.22)',
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget as HTMLButtonElement;
              t.style.background = 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)';
              t.style.color = '#ffffff';
              t.style.borderColor = 'transparent';
              t.style.boxShadow = '0 4px 12px rgba(124,58,237,0.30)';
              t.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget as HTMLButtonElement;
              t.style.background = 'rgba(139,92,246,0.08)';
              t.style.color = '#7c3aed';
              t.style.borderColor = 'rgba(139,92,246,0.22)';
              t.style.boxShadow = 'none';
              t.style.transform = 'translateY(0)';
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.5 4.7 2.5 7.6L12 17.2l-6 4.5 2.5-7.6L2 9.4h7.6L12 2z" />
            </svg>
            Enrichir
          </button>
        )}

        {/* CTA — soft indigo with subtle gradient on hover */}
        <Link
          href={`/ai-assistant?company=${encodeURIComponent(prospect.name)}&sector=${encodeURIComponent(prospect.sector)}&city=${encodeURIComponent(prospect.city)}`}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0"
          style={{
            background: 'rgba(99,102,241,0.08)',
            color: '#4f46e5',
            border: '1px solid rgba(99,102,241,0.25)',
          }}
          onMouseEnter={(e) => {
            const t = e.currentTarget as HTMLAnchorElement;
            t.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
            t.style.color = '#ffffff';
            t.style.borderColor = 'transparent';
            t.style.boxShadow = '0 6px 16px rgba(99,102,241,0.30), 0 1px 0 rgba(255,255,255,0.25) inset';
            t.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget as HTMLAnchorElement;
            t.style.background = 'rgba(99,102,241,0.08)';
            t.style.color = '#4f46e5';
            t.style.borderColor = 'rgba(99,102,241,0.25)';
            t.style.boxShadow = 'none';
            t.style.transform = 'translateY(0)';
          }}
        >
          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Analyser
          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
