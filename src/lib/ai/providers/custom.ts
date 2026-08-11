import { registerProvider, type AIProvider, type ChatMessage } from "../provider";

/**
 * Custom OpenAI-compatible endpoint provider.
 * Lets you point at oMLX, LM Studio, vLLM, llama.cpp, LocalAI, LiteLLM, etc.
 *
 * Env:
 *   CUSTOM_AI_BASE_URL=https://your-server/v1
 *   CUSTOM_AI_API_KEY=optional-key
 *   CUSTOM_AI_MODEL=model-name
 */

export class CustomEndpointProvider implements AIProvider {
  readonly id = "custom" as const;
  private baseUrl: string;
  private apiKey: string;
  private model: string;

  constructor() {
    const base = process.env.CUSTOM_AI_BASE_URL?.trim();
    if (!base) {
      throw new Error(
        "CUSTOM_AI_BASE_URL is not set. Add it to .env.local (see .env.example).",
      );
    }
    this.baseUrl = base.replace(/\/+$/, "");
    this.apiKey = process.env.CUSTOM_AI_API_KEY?.trim() ?? "";
    this.model = process.env.CUSTOM_AI_MODEL?.trim() || "";
  }

  async complete(
    messages: ChatMessage[],
    options?: { temperature?: number },
  ): Promise<string> {
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: this.model || undefined,
        messages,
        temperature: options?.temperature ?? 0.7,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Custom endpoint error ${res.status}: ${body.slice(0, 300)}`);
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content ?? "";
    return content.trim();
  }
}

export function registerCustomEndpointProvider(): void {
  registerProvider("custom", () => new CustomEndpointProvider());
}
