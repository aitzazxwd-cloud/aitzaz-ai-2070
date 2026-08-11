import { NextResponse } from "next/server";
import { getChatStore } from "@/lib/db/store";

export const runtime = "nodejs";

/** GET /api/conversations/[id]/messages — full message history. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const store = await getChatStore();
    const conversation = await store.getConversation(id);
    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
    }
    const messages = await store.getMessages(id);
    return NextResponse.json({ mode: store.mode, conversation, messages });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
