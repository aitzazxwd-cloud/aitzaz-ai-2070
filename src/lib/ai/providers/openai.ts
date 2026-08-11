import { registerProvider, type AIProvider, type ChatMessage } from "../provider";

/**
 * OpenAI provider — server-side only.
 * Key comes from OPENAI_API_KEY in .env.local. Never exposed to the browser.
 */

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export class OpenAIProvider implements AIProvider {
  readonly id = "openai" as const;
  private apiKey: string;
  private model: string;

  constructor() {
    const key = process.env.OPENAI_API_KEY?.trim();
    if (!key) {
      throw new Error(
        "OPENAI_API_KEY is not set. Add it to .env.local (see .env.example).",
      );
    }
    this.apiKey = key;
    this.model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  }

  async complete(
    messages: ChatMessage[],
    options?: { temperature?: number },
  ): Promise<string> {
    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: options?.temperature ?? 0.7,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`OpenAI API error ${res.status}: ${body.slice(0, 300)}`);
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content ?? "";
    return content.trim();
  }
}

export function registerOpenAIProvider(): void {
  registerProvider("openai", () => new OpenAIProvider());
}
