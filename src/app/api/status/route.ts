import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * GET /api/status
 * Honest system status — reports what is actually configured.
 * No secrets are ever returned.
 */
export async function GET() {
  const aiConfigured = Boolean(
    process.env.OPENAI_API_KEY?.trim() ||
      process.env.ANTHROPIC_API_KEY?.trim() ||
      process.env.CUSTOM_AI_API_KEY?.trim() ||
      process.env.CUSTOM_AI_BASE_URL?.trim(),
  );

  return NextResponse.json({
    app: "AITZAZ AI 2070",
    phase: 2,
    ai: {
      provider: process.env.AI_PROVIDER?.trim() || "openai",
      configured: aiConfigured,
      note: aiConfigured
        ? "AI provider key detected (server-side)."
        : "No AI key configured yet — chat will not respond until you add one to .env.local.",
    },
    database: {
      configured: Boolean(process.env.SUPABASE_URL?.trim()),
      phase: 3,
    },
    voice: { phase: 11, note: "Not wired yet — arrives in Phase 11." },
    computerControl: { phase: 8, note: "Not wired yet — arrives in Phase 8." },
  });
}
