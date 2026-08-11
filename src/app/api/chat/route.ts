import { NextRequest, NextResponse } from "next/server";
import { brainChat } from "@/lib/brain/brain";
import type { ChatMessage } from "@/lib/ai/provider";

export const runtime = "nodejs";

/**
 * POST /api/chat
 * Body: { messages: ChatMessage[], provider?: string }
 * Returns: { reply: string, provider: string }  |  { error: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      messages?: ChatMessage[];
      provider?: string;
    };

    const messages = Array.isArray(body?.messages) ? body.messages : [];
    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // Basic input sanitization: messages must be objects with text content.
    const clean: ChatMessage[] = [];
    for (const m of messages) {
      if (m && typeof m === "object" && typeof m.content === "string") {
        const role = m.role === "assistant" ? "assistant" : m.role === "system" ? "system" : "user";
        clean.push({ role, content: m.content.slice(0, 4000) });
      }
    }
    if (clean.length === 0) {
      return NextResponse.json({ error: "Invalid messages." }, { status: 400 });
    }

    const result = await brainChat({ messages: clean, providerId: body.provider });
    return NextResponse.json({ reply: result.reply, provider: result.provider });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    // Distinguish "not configured" from real failures so the UI can guide setup.
    const status = /API_KEY|not set|not configured|provider.*not registered/i.test(message)
      ? 503
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
