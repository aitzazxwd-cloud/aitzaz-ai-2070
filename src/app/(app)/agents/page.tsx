import { Network } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";
import { AGENTS } from "@/lib/agents/registry";

export default function AgentsPage() {
  return (
    <SectionPage
      title="Agents"
      icon={Network}
      description="Specialized agents that the Main Brain routes work to. Modular registry — new agents can be added without touching the brain."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((agent) => (
          <GlassCard key={agent.id}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-[13px] font-bold text-white">{agent.name}</p>
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300">
                Phase {agent.phase}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300/70">
              {agent.role}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-slate-400">{agent.description}</p>
          </GlassCard>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-slate-500">
        Architecture ready in <code className="text-slate-400">src/lib/agents/</code> — each agent
        activates in its roadmap phase.
      </p>
    </SectionPage>
  );
}
