"use client";

import { useState } from "react";
import { Send, Bot, ShieldCheck, Mic } from "lucide-react";
import { SectionPage } from "@/components/shell/SectionPage";

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setNotice(
      "The AI Brain connects in Phase 2. Right now there is no server-side AI key, so I cannot honestly generate a reply yet — nothing is faked. Continue setup to Phase 2 and this chat goes live.",
    );
    setInput("");
  };

  return (
    <SectionPage
      title="AI Assistant"
      description="Your main conversation with the AITZAZ AI 2070 brain. Goals, questions, planning — all through here."
    >
      {/* Chat surface */}
      <div className="glass flex min-h-[420px] flex-col overflow-hidden">
        <div className="flex-1 px-5 py-6">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-4 pt-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_0_32px_rgba(99,102,241,0.5)]">
              <Bot className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">AITZAZ AI 2070 Brain</h3>
            <p className="max-w-md text-[13px] leading-relaxed text-slate-400">
              I am the orchestrator. Give me a goal and I will plan the steps, route work to the
              right agents, use tools, ask your permission for sensitive actions, verify results
              and keep a full activity log.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-slate-700/70 bg-slate-800/50 px-3 py-1 text-[10px] font-semibold text-slate-300">
                <ShieldCheck className="h-3 w-3 text-emerald-400" /> Permission-gated
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-slate-700/70 bg-slate-800/50 px-3 py-1 text-[10px] font-semibold text-slate-300">
                <Mic className="h-3 w-3 text-slate-400" /> Voice in Phase 11
              </span>
            </div>
          </div>

          {notice && (
            <div className="mx-auto mt-6 max-w-xl rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-[12px] leading-relaxed text-amber-200">
              {notice}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-slate-800/60 px-5 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="mx-auto flex max-w-xl items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Give me a goal or ask me anything…"
              className="flex-1 rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-[14px] text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-500/60"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mx-auto mt-2 max-w-xl text-center text-[10px] text-slate-500">
            Phase 1 foundation — chat UI is real, the AI brain is wired in Phase 2.
          </p>
        </div>
      </div>
    </SectionPage>
  );
}
