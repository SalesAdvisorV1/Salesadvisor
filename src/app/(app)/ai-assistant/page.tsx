import { Suspense } from "react";
import { AiAssistantView } from "@/components/ai-assistant/ai-assistant-view";

export const metadata = { title: "Assistance IA — Sales Advisor" };

export default function AiAssistantPage() {
  return (
    <Suspense>
      <AiAssistantView />
    </Suspense>
  );
}
