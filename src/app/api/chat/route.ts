import { NextRequest, NextResponse } from "next/server";
import { brainChat } from "@/lib/brain/brain";
import { getChatStore } from "@/lib/db/store";
import type { ChatMessage } from "@/lib/ai/provider";

export const runtime = "nodejs";

/**
 * POST /api/chat
 * Body: { conversationId?: string, messages: ChatMessage[], provider?: string }
 *
 * - Persists the user message + assistant reply when conversationId is given.
 * - Without a key, it still saves the user message and returns an honest error.
 */
export async function POST(req: NextRequest) {
  let conversationId: string | null = null;
  let storeMode: string | null = null;

  try {
    const body = (await req.json()) as {
      conversationId?: string;
      messages?: ChatMessage[];
      provider?: string;
    };

    const messages = Array.isArray(body?.messages) ? body.messages : [];
    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // Basic input sanitization: only role + string content.
    const clean: ChatMessage[] = [];
    for (const m of messages) {
      if (m && typeof m === "object" && typeof m.content === "string") {
        const role =
          m.role === "assistant"
            ? "assistant"
            : m.role === "system"
              ? "system"
              : "user";
        clean.push({ role, content: m.content.slice(0, 4000) });
      }
    }
    if (clean.length === 0) {
      return NextResponse.json({ error: "Invalid messages." }, { status: 400 });
    }

    const store = await getChatStore();
    storeMode = store.mode;
    conversationId =
      typeof body.conversationId === "string" && body.conversationId.trim()
        ? body.conversationId.trim()
        : null;

    const lastUser = [...clean].reverse().find((m) => m.role === "user");
    if (conversationId && lastUser) {
      await store.appendMessage(conversationId, "user", lastUser.content);
    }

    try {
      const result = await brainChat({ messages: clean, providerId: body.provider });
      if (conversationId) {
        await store.appendMessage(conversationId, "assistant", result.reply);
        await store.touchConversation(conversationId);
      }
      return NextResponse.json({
        reply: result.reply,
        provider: result.provider,
        mode: store.mode,
      });
    } catch (aiErr) {
      const message = aiErr instanceof Error ? aiErr.message : "Unknown error";
      const status = /API_KEY|not set|not configured|provider.*not registered/i.test(
        message,
      )
        ? 503
        : 500;
      return NextResponse.json(
        { error: message, mode: store.mode, savedUserMessage: Boolean(conversationId) },
        { status },
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message, mode: storeMode, savedUserMessage: Boolean(conversationId) },
      { status: 500 },
    );
  }
}
