"use client";

import Link from "next/link";
import { useState } from "react";
import { ProspectResult } from "@/types/prospect";

interface Props { prospect: ProspectResult; }

// ---- Helpers ----

function isMeaningful(value: string | undefined | null): value is string {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  return v.length > 0 && v !== 'n/c' && v !== 'n/a' && v !== '-' && v !== '—';
}

// Monochrome indigo avatars
const AVATAR_TONES: { bg: string; color: string }[] = [
  { bg: 'rgba(99,102,241,0.14)',  color: '#4f46e5' },
  { bg: 'rgba(99,102,241,0.20)',  color: '#4338ca' },
  { bg: 'rgba(139,92,246,0.14)',  color: '#7c3aed' },
  { bg: 'rgba(139,92,246,0.20)',  color: '#6d28d9' },
];

function getAvatarTone(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_TONES[Math.abs(hash) % AVATAR_TONES.length];
}

// Muted semantic score colors
function scoreStyle(score: number): { bg: string; color: string; label: string } {
  if (score >= 85) return { bg: 'rgba(16,185,129,0.10)',  color: '#059669', label: 'Excellent' };
  if (score >= 70) return { bg: 'rgba(245,158,11,0.10)',  color: '#b45309', label: 'Bon' };
  return                 { bg: 'rgba(239,68,68,0.10)',   color: '#dc2626', label: 'Faible' };
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
        ? { background: 'rgba(16,185,129,0.12)', color: '#059669' }
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
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget as HTMLAnchorElement;
        t.style.background = 'rgba(99,102,241,0.06)';
        t.style.color = '#64748b';
        t.style.borderColor = 'rgba(99,102,241,0.12)';
      }}
    >
      {children}
    </a>
  );
}

// ---- Info pill ----

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-medium rounded-md px-2 py-1"
      style={{
        background: 'rgba(99,102,241,0.05)',
        border: '1px solid rgba(99,102,241,0.10)',
        color: '#475569',
      }}
    >
      <span className="uppercase tracking-wider text-[9px] font-semibold" style={{ color: '#94a3b8', letterSpacing: '0.04em' }}>
        {label}
      </span>
      <span style={{ color: '#0f172a' }}>{value}</span>
    </span>
  );
}

// ---- Main card ----

export function ProspectResultCard({ prospect }: Props) {
  const score = prospect.score ?? 0;
  const initials = prospect.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  const tone = getAvatarTone(prospect.name);
  const scoreCfg = scoreStyle(score);

  // Build size/employees label, hiding "N/C"
  const sizeBits: string[] = [];
  if (isMeaningful(prospect.size)) sizeBits.push(prospect.size);
  if (isMeaningful(prospect.employees)) sizeBits.push(prospect.employees);
  const sizeLabel = sizeBits.join(' · ');

  const hasAnyContact = isMeaningful(prospect.contact) || isMeaningful(prospect.phone) || isMeaningful(prospect.linkedin) || isMeaningful(prospect.website);

  return (
    <div
      className="relative rounded-2xl p-4 transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(99,102,241,0.10)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
      }}
      onMouseEnter={(e) => {
        const t = e.currentTarget as HTMLDivElement;
        t.style.transform = 'translateY(-1px)';
        t.style.boxShadow = '0 8px 22px rgba(99,102,241,0.10)';
        t.style.borderColor = 'rgba(99,102,241,0.22)';
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget as HTMLDivElement;
        t.style.transform = 'translateY(0)';
        t.style.boxShadow = '0 1px 2px rgba(15,23,42,0.04)';
        t.style.borderColor = 'rgba(99,102,241,0.10)';
      }}
    >
      {/* Left accent bar (visible on hover) */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full opacity-0 transition-opacity duration-200"
        style={{ background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)' }}
      />

      {/* Header row: avatar + name + score pill */}
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-[12px] font-bold"
          style={{
            background: tone.bg,
            color: tone.color,
            border: '1px solid rgba(99,102,241,0.10)',
          }}
        >
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                className="text-[14px] font-semibold leading-tight truncate"
                style={{ color: '#0f172a' }}
              >
                {prospect.name}
              </h3>
              <p className="text-[12px] truncate mt-0.5" style={{ color: '#94a3b8' }}>
                {[prospect.sector, prospect.city, prospect.country].filter(isMeaningful).join(' · ')}
              </p>
            </div>

            {/* Slim score pill */}
            <span
              className="inline-flex items-baseline gap-1 px-2 py-0.5 rounded-md text-[12px] font-semibold tabular-nums shrink-0"
              style={{ background: scoreCfg.bg, color: scoreCfg.color }}
              title={`Score ${score} — ${scoreCfg.label}`}
            >
              {score}
              <span className="text-[9px] font-medium opacity-70">/100</span>
            </span>
          </div>

          {/* Info pills row */}
          {(isMeaningful(prospect.role) || sizeLabel || isMeaningful(prospect.revenue)) && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {isMeaningful(prospect.role) && <InfoPill label="Poste" value={prospect.role} />}
              {sizeLabel && <InfoPill label="Taille" value={sizeLabel} />}
              {isMeaningful(prospect.revenue) && <InfoPill label="CA" value={prospect.revenue} />}
            </div>
          )}
        </div>
      </div>

      {/* Reason — quoted note with subtle left border */}
      {isMeaningful(prospect.reason) && (
        <p
          className="text-[12px] mt-3 leading-relaxed pl-3"
          style={{
            color: '#64748b',
            borderLeft: '2px solid rgba(99,102,241,0.18)',
          }}
        >
          {prospect.reason}
        </p>
      )}

      {/* Footer row: contact icons + CTA ghost */}
      <div className="flex items-center justify-between mt-3 pt-3 gap-3" style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}>
        <div className="flex items-center gap-1.5 min-w-0">
          {hasAnyContact && isMeaningful(prospect.contact) && (
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

          {/* Ghost CTA */}
          <Link
            href={`/ai-assistant?company=${encodeURIComponent(prospect.name)}&sector=${encodeURIComponent(prospect.sector)}&city=${encodeURIComponent(prospect.city)}`}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full transition-all duration-150 shrink-0"
            style={{
              background: 'transparent',
              color: '#4f46e5',
              border: '1px solid rgba(99,102,241,0.30)',
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget as HTMLAnchorElement;
              t.style.background = 'rgba(99,102,241,0.08)';
              t.style.borderColor = 'rgba(99,102,241,0.50)';
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget as HTMLAnchorElement;
              t.style.background = 'transparent';
              t.style.borderColor = 'rgba(99,102,241,0.30)';
            }}
          >
            Analyser
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
    </div>
  );
}
