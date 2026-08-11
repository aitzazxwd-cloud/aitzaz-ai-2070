import { registerOpenAIProvider } from "./openai";
import { registerAnthropicProvider } from "./anthropic";
import { registerCustomEndpointProvider } from "./custom";

/**
 * Register every provider implementation. Call once on the server
 * (from the chat route) before resolving a provider.
 */
export function registerAllProviders(): void {
  registerOpenAIProvider();
  registerAnthropicProvider();
  registerCustomEndpointProvider();
}

/** Which provider should be used by default (from env). */
export function defaultProviderId(): string {
  const id = process.env.AI_PROVIDER?.trim().toLowerCase() || "openai";
  return id;
}
