/**
 * AI PROVIDER — abstraction (Phase 2).
 *
 * The whole system talks to AI through this interface, so the provider can
 * be swapped (OpenAI → Anthropic → local model) without touching the brain,
 * agents or UI. Keys live ONLY on the server (see .env.local).
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIProvider {
  readonly id: "openai" | "anthropic" | "custom";
  /** Send a conversation and get the assistant reply. */
  complete(messages: ChatMessage[], options?: { temperature?: number }): Promise<string>;
}

export type ProviderFactory = () => AIProvider;

const factories = new Map<string, ProviderFactory>();

/** Register a provider implementation (called at server startup). */
export function registerProvider(id: string, factory: ProviderFactory): void {
  factories.set(id, factory);
}

/** Get a provider by id; throws if not registered or not configured. */
export function getProvider(id: string): AIProvider {
  const factory = factories.get(id);
  if (!factory) {
    throw new Error(`AI provider "${id}" is not registered yet (Phase 2 wires this up).`);
  }
  return factory();
}
