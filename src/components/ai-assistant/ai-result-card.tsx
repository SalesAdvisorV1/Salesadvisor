"use client";

import { useState, useEffect } from "react";
import type {
  AiAssistResponse,
  AiSummaryResult,
  AiPitchResult,
  AiCallPrepResult,
} from "@/types/ai-assistant";

export function AiResultCard({ response }: { response: AiAssistResponse }) {
  switch (response.task) {
    case "summary":
      return <SummaryResult result={response.result as AiSummaryResult} />;
    case "pitch":
      return <PitchResult result={response.result as AiPitchResult} />;
    case "call-prep":
      return <CallPrepResult result={response.result as AiCallPrepResult} />;
  }
}

function TypewriterText({ text, speed = 25 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
}

function SummaryResult({ result }: { result: AiSummaryResult }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h4 className="font-semibold text-gray-900">
          <TypewriterText text={result.headline} />
        </h4>
        <p className="mt-2 text-sm leading-6 text-gray-600">{result.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-green-50 border border-green-200 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-green-900">Points forts</p>
          </div>
          <ul className="mt-1 space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2.5} className="shrink-0 mt-0.5">
                  <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-blue-900">Opportunités</p>
          </div>
          <ul className="mt-1 space-y-2">
            {result.opportunities.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={2.5} className="shrink-0 mt-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PitchResult({ result }: { result: AiPitchResult }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Objet</p>
        <p className="mt-1 font-medium text-gray-900">{result.subject}</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Corps du message</p>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-7 text-gray-700">
          {result.body}
        </pre>
      </div>

      <div className="rounded-xl border border-gray-900 bg-gray-900 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-white/60">Call-to-action</p>
        <p className="mt-1 font-semibold text-white">{result.cta}</p>
      </div>

      <CopyButton text={`Objet : ${result.subject}\n\n${result.body}\n\n${result.cta}`} />
    </div>
  );
}

function CallPrepResult({ result }: { result: AiCallPrepResult }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-amber-600">Accroche d'ouverture</p>
        <p className="mt-2 text-sm leading-6 text-gray-700">{result.openingLine}</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Points clés</p>
        <ul className="mt-3 space-y-2">
          {result.keyPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="shrink-0 rounded-full bg-gray-100 px-1.5 text-xs text-gray-500 min-w-[22px] text-center">
                {i + 1}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Gestion des objections</p>
        <div className="mt-3 space-y-3">
          {result.objections.map((obj, i) => (
            <div key={i} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-sm font-medium text-red-600">
                — {obj.objection}
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {obj.response}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-900 bg-gray-900 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-white/60">Closing</p>
        <p className="mt-2 text-sm leading-6 text-white">{result.closingLine}</p>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`w-full rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] min-h-[44px] ${
        copied
          ? 'bg-green-50 border-green-200 text-green-700'
          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      {copied ? '✓ Copié dans le presse-papiers' : 'Copier le message'}
    </button>
  );
}
