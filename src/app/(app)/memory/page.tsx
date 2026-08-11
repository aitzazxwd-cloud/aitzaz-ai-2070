import { Database } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";
import { MemoryStore } from "@/lib/memory/types";

export default function MemoryPage() {
  return (
    <SectionPage
      title="Memory"
      icon={Database}
      description="Persistent, searchable memory: conversations, projects, preferences, decisions, facts and successful workflows."
    >
      <GlassCard>
        <p className="text-[13px] font-bold text-white">Memory System — Phase 4</p>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
          Built on PostgreSQL (Phase 3) with a typed store contract
          (<code className="text-slate-400">src/lib/memory/types.ts</code>). Only relevant memories
          are retrieved per task — never the whole conversation. Vector search is added when it is
          actually needed.
        </p>
      </GlassCard>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <GlassCard title="Conversations" className="text-center">
          <p className="text-2xl font-bold text-white">0</p>
        </GlassCard>
        <GlassCard title="Projects" className="text-center">
          <p className="text-2xl font-bold text-white">0</p>
        </GlassCard>
        <GlassCard title="Facts" className="text-center">
          <p className="text-2xl font-bold text-white">0</p>
        </GlassCard>
      </div>
    </SectionPage>
  );
}
