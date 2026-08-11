import { NextRequest, NextResponse } from "next/server";
import { getChatStore } from "@/lib/db/store";

export const runtime = "nodejs";

/** GET /api/conversations — list recent conversations. */
export async function GET() {
  try {
    const store = await getChatStore();
    const conversations = await store.listConversations();
    return NextResponse.json({ mode: store.mode, conversations });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** POST /api/conversations — create a new conversation. */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as { title?: string };
    const store = await getChatStore();
    const conversation = await store.createConversation(
      typeof body.title === "string" && body.title.trim()
        ? body.title.trim().slice(0, 80)
        : "New chat",
    );
    return NextResponse.json({ mode: store.mode, conversation }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
