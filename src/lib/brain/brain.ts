import { registerAllProviders, defaultProviderId } from "@/lib/ai/providers";
import { getProvider, type ChatMessage } from "@/lib/ai/provider";

/**
 * BRAIN — the orchestrator (Phase 2: chat reasoning).
 *
 * The Brain's job is to understand intent, decide the response, and later
 * (Phase 10) plan missions and route work to agents. Reasoning stays here;
 * privileged execution happens only through the tool/security layers.
 *
 * This module is server-only — it imports nothing from the browser.
 */

/** Identity + behavior system prompt for the AITZAZ AI 2070 brain. */
export function brainSystemPrompt(): string {
  return [
    "You are the AI Brain of AITZAZ AI 2070 — a personal AI operating system.",
    "",
    "You understand natural language and high-level goals. You answer clearly and honestly.",
    "",
    "Rules:",
    "- Be concise and natural; match the user's language (English or Roman Urdu).",
    "- Never claim an action succeeded unless it was actually verified.",
    "- If a request needs a tool, agent, computer control or permission that is not",
    "  available yet, say so honestly instead of pretending.",
    "- You are being built phase by phase. Current phase: 2 (chat + secure AI).",
  ].join("\n");
}

export interface BrainChatInput {
  messages: ChatMessage[];
  providerId?: string;
  temperature?: number;
}

export interface BrainChatResult {
  reply: string;
  provider: string;
}

/** Send a conversation to the Brain and get a reply (server-side). */
export async function brainChat(input: BrainChatInput): Promise<BrainChatResult> {
  registerAllProviders();

  const providerId = input.providerId?.trim().toLowerCase() || defaultProviderId();
  const provider = getProvider(providerId);

  const system = brainSystemPrompt();
  const messages: ChatMessage[] =
    input.messages[0]?.role === "system"
      ? input.messages
      : [{ role: "system", content: system }, ...input.messages];

  const reply = await provider.complete(messages, {
    temperature: input.temperature ?? 0.7,
  });

  return { reply, provider: provider.id };
}
