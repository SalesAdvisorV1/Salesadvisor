"use client";

import Link from "next/link";
import { useState } from "react";
import { ProspectResult } from "@/types/prospect";

interface Props { prospect: ProspectResult; }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400 mb-1 font-medium">{label}</p>
      <div className="text-[13px] text-gray-700">{children}</div>
    </div>
  );
}

function getAvatarColor(name: string): string {
  const colors = [
    'bg-blue-500', 'bg-violet-500', 'bg-green-500', 'bg-orange-500',
    'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-red-500',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function ScoreBadge({ score }: { score: number }) {
  const config = score >= 85
    ? { bg: 'bg-green-500', ring: 'ring-green-200' }
    : score >= 70
    ? { bg: 'bg-orange-500', ring: 'ring-orange-200' }
    : { bg: 'bg-red-500', ring: 'ring-red-200' };

  return (
    <div className={`w-12 h-12 rounded-full ${config.bg} ring-4 ${config.ring} flex items-center justify-center shrink-0`}>
      <span className="text-white text-[11px] font-black leading-none">{score}</span>
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
      className={`text-xs px-2 py-1 rounded-lg transition-all ${
        copied
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
      }`}
    >
      {copied ? 'Copié ✓' : 'Copier email'}
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
  const avatarColor = getAvatarColor(prospect.name);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          {/* Company avatar */}
          <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center shrink-0 text-white text-[11px] font-black`}>
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-bold text-gray-900 leading-tight">{prospect.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{prospect.sector} · {prospect.city}, {prospect.country}</p>
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
              className="hover:text-black transition-colors truncate block text-blue-600"
            >
              {prospect.website}
            </a>
          </Field>
        )}
      </div>

      {/* Contact row */}
      {(prospect.contact || prospect.phone || prospect.linkedin) && (
        <div className="border-t border-gray-100 pt-3 space-y-2">
          {prospect.contact && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.12em] text-gray-400 w-12 shrink-0 font-medium">Email</span>
              <a href={`mailto:${prospect.contact}`} className="text-xs text-gray-600 hover:text-black transition-colors truncate flex-1">
                {prospect.contact}
              </a>
              <CopyEmailButton email={prospect.contact} />
            </div>
          )}
          {prospect.phone && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.12em] text-gray-400 w-12 shrink-0 font-medium">Tél</span>
              <a href={`tel:${prospect.phone}`} className="text-xs text-gray-600 hover:text-black transition-colors">
                {prospect.phone}
              </a>
            </div>
          )}
          {prospect.linkedin && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.12em] text-gray-400 w-12 shrink-0 font-medium">LinkedIn</span>
              <a
                href={`https://${prospect.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-black transition-colors truncate"
              >
                {prospect.linkedin}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Reason */}
      {prospect.reason && (
        <p className="italic text-xs text-gray-400 border-t border-gray-100 pt-3 mt-3 leading-relaxed">
          {prospect.reason}
        </p>
      )}

      {/* IA CTA */}
      <Link
        href={`/ai-assistant?company=${encodeURIComponent(prospect.name)}&sector=${encodeURIComponent(prospect.sector)}&city=${encodeURIComponent(prospect.city)}`}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 min-h-[44px]"
      >
        <span>✦</span>
        Analyser avec IA
      </Link>
    </div>
  );
}

