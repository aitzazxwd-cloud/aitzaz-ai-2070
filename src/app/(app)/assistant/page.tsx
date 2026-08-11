"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Send,
  Bot,
  ShieldCheck,
  Mic,
  Loader2,
  Plus,
  MessageSquare,
  Database,
} from "lucide-react";
import { SectionPage } from "@/components/shell/SectionPage";

interface ChatItem {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface StatusData {
  ai?: { provider?: string; configured?: boolean };
  database?: { configured?: boolean; mode?: string };
  phase?: number;
}

export default function AssistantPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<ChatItem[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load system status
  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => setStatus(d))
      .catch(() => setStatus(null));
  }, []);

  // Load conversation list
  const refreshConversations = useCallback(async (selectId?: string) => {
    try {
      const res = await fetch("/api/conversations");
      const data = await res.json();
      const list: Conversation[] = data?.conversations ?? [];
      setConversations(list);
      if (selectId && list.some((c) => c.id === selectId)) {
        setActiveId(selectId);
      }
    } catch {
      // keep current state
    }
  }, []);

  useEffect(() => {
    void refreshConversations();
  }, [refreshConversations]);

  // Load messages when a conversation is selected
  useEffect(() => {
    if (!activeId) {
      setItems([]);
      return;
    }
    let cancelled = false;
    setLoadingHistory(true);
    setError(null);
    fetch(`/api/conversations/${activeId}/messages`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const msgs = (data?.messages ?? []) as Array<{
          role: string;
          content: string;
        }>;
        setItems(
          msgs
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        );
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingHistory(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [items, thinking, loadingHistory]);

  const newChat = async () => {
    try {
      const res = await fetch("/api/conversations", { method: "POST" });
      const data = await res.json();
      const conv: Conversation = data?.conversation;
      if (conv) {
        await refreshConversations(conv.id);
        setActiveId(conv.id);
        setItems([]);
        setError(null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create a new chat.");
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || thinking) return;
    setInput("");
    setError(null);

    if (!activeId) {
      await newChat();
      // If still no conversation, abort.
      if (!activeId) {
        setError("Please start a new chat first.");
        return;
      }
    }

    const next: ChatItem[] = [...items, { role: "user", content: text }];
    setItems(next);
    setThinking(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: activeId,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong.");
      } else if (typeof data?.reply === "string" && data.reply) {
        setItems((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setError("The AI returned an empty reply.");
      }
      // Refresh list so titles/ordering update.
      void refreshConversations(activeId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error.");
    } finally {
      setThinking(false);
    }
  };

  const aiConfigured = status?.ai?.configured === true;
  const dbMode = status?.database?.mode ?? "memory";
  const dbConfigured = status?.database?.configured === true;

  return (
    <SectionPage
      title="AI Assistant"
      description="Your main conversation with the AITZAZ AI 2070 brain. Goals, questions, planning — all through here."
    >
      <div className="glass flex min-h-[460px] flex-col overflow-hidden">
        {/* Status strip */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/60 px-5 py-2.5">
          <span
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              aiConfigured
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-amber-500/40 bg-amber-500/10 text-amber-300"
            }`}
          >
            <span className={`status-dot ${aiConfigured ? "online" : "planned"}`} />
            AI {aiConfigured ? `· ${status?.ai?.provider ?? "openai"}` : "· Not configured"}
          </span>
          <span
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              dbConfigured
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-slate-700/70 bg-slate-800/50 text-slate-300"
            }`}
            title={dbConfigured ? "Messages persist in PostgreSQL" : "Session-only storage"}
          >
            <Database className="h-3 w-3" />
            DB · {dbMode === "postgres" ? "PostgreSQL" : "Memory (session)"}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-slate-700/70 bg-slate-800/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
            <ShieldCheck className="h-3 w-3 text-emerald-400" /> Permission-gated
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-slate-700/70 bg-slate-800/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
            <Mic className="h-3 w-3 text-slate-400" /> Voice in Phase 11
          </span>
        </div>

        <div className="flex min-h-0 flex-1">
          {/* Conversation list */}
          <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-800/60 sm:flex">
            <div className="p-3">
              <button
                onClick={() => void newChat()}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-[12px] font-bold text-indigo-200 transition-colors hover:bg-indigo-500/20"
              >
                <Plus className="h-4 w-4" /> New chat
              </button>
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-3">
              {conversations.length === 0 && (
                <p className="px-2 py-4 text-center text-[11px] text-slate-500">
                  No conversations yet
                </p>
              )}
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[12px] transition-colors ${
                    c.id === activeId
                      ? "border border-indigo-500/40 bg-indigo-500/10 text-indigo-100"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{c.title}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Messages */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto px-5 py-6">
              {!activeId && !error && (
                <div className="mx-auto flex max-w-xl flex-col items-center gap-4 pt-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_0_32px_rgba(99,102,241,0.5)]">
                    <Bot className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">AITZAZ AI 2070 Brain</h3>
                  <p className="max-w-md text-[13px] leading-relaxed text-slate-400">
                    I am the orchestrator. Give me a goal and I will plan the steps, route work
                    to the right agents, use tools, ask your permission for sensitive actions,
                    verify results and keep a full activity log.
                  </p>
                  <button
                    onClick={() => void newChat()}
                    className="mt-1 flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-transform hover:scale-[1.03]"
                  >
                    <Plus className="h-4 w-4" /> Start a new chat
                  </button>
                  {!aiConfigured && (
                    <p className="max-w-md rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-[12px] leading-relaxed text-amber-200">
                      ⚠️ AI key configured nahi hai. Chat respond karne ke liye{" "}
                      <code className="text-amber-100">.env.local</code> me{" "}
                      <code className="text-amber-100">OPENAI_API_KEY</code> ya{" "}
                      <code className="text-amber-100">ANTHROPIC_API_KEY</code> set karo (see{" "}
                      <code className="text-amber-100">.env.example</code>).
                    </p>
                  )}
                </div>
              )}

              {activeId && (
                <div className="mx-auto flex max-w-2xl flex-col gap-4">
                  {loadingHistory && (
                    <div className="flex justify-center py-6">
                      <Loader2 className="h-5 w-5 animate-spin text-indigo-300" />
                    </div>
                  )}

                  {!loadingHistory && items.length === 0 && (
                    <p className="py-8 text-center text-[12px] text-slate-500">
                      New conversation — say hi to the Brain.
                    </p>
                  )}

                  {items.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                          m.role === "user"
                            ? "rounded-br-md border border-indigo-500/40 bg-indigo-500/15 text-indigo-50"
                            : "rounded-bl-md border border-slate-700/60 bg-slate-800/40 text-slate-200"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}

                  {thinking && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-700/60 bg-slate-800/40 px-4 py-3">
                        <Loader2 className="h-4 w-4 animate-spin text-indigo-300" />
                        <span className="text-[13px] text-slate-300">Brain is thinking…</span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-[12px] leading-relaxed text-red-200">
                      <p className="mb-1 font-bold uppercase tracking-wider text-red-300">
                        Error
                      </p>
                      {error}
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-slate-800/60 px-5 py-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSend();
                }}
                className="mx-auto flex max-w-2xl items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    aiConfigured
                      ? "Give me a goal or ask me anything…"
                      : "AI key set nahi hai — pehle .env.local configure karo"
                  }
                  className="flex-1 rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-[14px] text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500/60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || thinking}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="mx-auto mt-2 max-w-2xl text-center text-[10px] text-slate-500">
                Phase 3 · Chat + database persistence — messages save to{" "}
                {dbMode === "postgres" ? "PostgreSQL" : "memory (set DATABASE_URL for persistence)"}
                , keys never reach the browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionPage>
  );
}
