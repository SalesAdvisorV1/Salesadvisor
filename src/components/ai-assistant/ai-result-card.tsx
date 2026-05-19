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

function SummaryResult({ result }: { result: AiSummaryResult }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <h4 className="font-semibold text-white">{result.headline}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-400">{result.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
          <p className="text-sm font-medium text-white">Points forts</p>
          <ul className="mt-3 space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
          <p className="text-sm font-medium text-white">Opportunités</p>
          <ul className="mt-3 space-y-2">
            {result.opportunities.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
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
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Objet</p>
        <p className="mt-1 font-medium text-white">{result.subject}</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Corps du message</p>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-300">
          {result.body}
        </pre>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-white">Call-to-action</p>
        <p className="mt-1 font-semibold text-white">{result.cta}</p>
      </div>

      <CopyButton text={`Objet : ${result.subject}\n\n${result.body}\n\n${result.cta}`} />
    </div>
  );
}

function CallPrepResult({ result }: { result: AiCallPrepResult }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-amber-500">Accroche d'ouverture</p>
        <p className="mt-2 text-sm leading-6 text-slate-200">{result.openingLine}</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Points clés</p>
        <ul className="mt-3 space-y-2">
          {result.keyPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="shrink-0 rounded-full bg-slate-700 px-1.5 text-xs text-slate-400">
                {i + 1}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Gestion des objections</p>
        <div className="mt-3 space-y-3">
          {result.objections.map((obj, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
              <p className="text-sm font-medium text-red-300">
                — {obj.objection}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                {obj.response}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-white">Closing</p>
        <p className="mt-2 text-sm leading-6 text-slate-200">{result.closingLine}</p>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  async function handleCopy() {
    await navigator.clipboard.writeText(text);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-900"
    >
      Copier le message
    </button>
  );
}
