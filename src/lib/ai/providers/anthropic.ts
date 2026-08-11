import { registerProvider, type AIProvider, type ChatMessage } from "../provider";

/**
 * Anthropic (Claude) provider — server-side only.
 * Key comes from ANTHROPIC_API_KEY in .env.local.
 * Note: Anthropic expects `system` as a separate field, not a message.
 */

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

export class AnthropicProvider implements AIProvider {
  readonly id = "anthropic" as const;
  private apiKey: string;
  private model: string;

  constructor() {
    const key = process.env.ANTHROPIC_API_KEY?.trim();
    if (!key) {
      throw new Error(
        "ANTHROPIC_API_KEY is not set. Add it to .env.local (see .env.example).",
      );
    }
    this.apiKey = key;
    this.model = process.env.ANTHROPIC_MODEL?.trim() || "claude-3-5-haiku-latest";
  }

  async complete(
    messages: ChatMessage[],
    options?: { temperature?: number },
  ): Promise<string> {
    // Extract the system message (Anthropic wants it separate).
    const system = messages
      .filter((m) => m.role === "system")
      .map((m) => m.content)
      .join("\n\n");
    const conversation = messages.filter((m) => m.role !== "system");

    const res = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 1024,
        temperature: options?.temperature ?? 0.7,
        system: system || undefined,
        messages: conversation,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Anthropic API error ${res.status}: ${body.slice(0, 300)}`);
    }

    const data = (await res.json()) as {
      content?: Array<{ type?: string; text?: string }>;
    };
    const text = (data.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("\n");
    return text.trim();
  }
}

export function registerAnthropicProvider(): void {
  registerProvider("anthropic", () => new AnthropicProvider());
}
