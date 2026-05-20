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
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h4 className="font-semibold text-gray-900">{result.headline}</h4>
        <p className="mt-2 text-sm leading-6 text-gray-600">{result.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-green-50 border border-green-100 p-4 space-y-2">
          <p className="text-sm font-medium text-gray-900">Points forts</p>
          <ul className="mt-3 space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 space-y-2">
          <p className="text-sm font-medium text-gray-900">Opportunités</p>
          <ul className="mt-3 space-y-2">
            {result.opportunities.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
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
              <span className="shrink-0 rounded-full bg-gray-100 px-1.5 text-xs text-gray-500">
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
  async function handleCopy() {
    await navigator.clipboard.writeText(text);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
    >
      Copier le message
    </button>
  );
}
