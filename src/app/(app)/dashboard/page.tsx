import Link from "next/link";
import { Bot, Brain, Cpu, ShieldCheck, MessageSquare } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";
import { AGENTS } from "@/lib/agents/registry";
import { TOOLS } from "@/lib/tools/registry";

const PIPELINE = [
  { key: "brain", label: "AI BRAIN", icon: Brain },
  { key: "agents", label: "AGENTS", icon: Bot },
  { key: "tools", label: "TOOLS", icon: Cpu },
  { key: "verify", label: "VERIFY", icon: ShieldCheck },
];

const STATUS_LABEL: Record<string, string> = {
  planned: "Phase ",
  ready: "Ready",
  standby: "Standby",
  busy: "Busy",
  error: "Error",
};

export default function DashboardPage() {
  const readyCount = AGENTS.filter((a) => a.status === "ready").length;
  const safeTools = TOOLS.filter((t) => t.sensitivity === "safe").length;

  return (
    <SectionPage
      title="Command Center"
      description="Welcome back, Aitzaz. This is the control surface of AITZAZ AI 2070 — the brain, agents, tools and security core are being assembled phase by phase."
    >
      {/* Hero status strip */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard title="System">
          <div className="flex items-center gap-2">
            <span className="status-dot online" />
            <span className="text-sm font-semibold text-emerald-300">ONLINE</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Foundation deployed · Phase 1</p>
        </GlassCard>
        <GlassCard title="AI Brain">
          <p className="text-2xl font-bold text-white">Phase 2</p>
          <p className="mt-1 text-[11px] text-slate-500">Secure server-side AI provider</p>
        </GlassCard>
        <GlassCard title="Agents">
          <p className="text-2xl font-bold text-white">
            {AGENTS.length}
            <span className="ml-1 text-sm font-normal text-slate-400">registered</span>
          </p>
          <p className="mt-1 text-[11px] text-slate-500">{readyCount} ready · rest scheduled</p>
        </GlassCard>
        <GlassCard title="Tools">
          <p className="text-2xl font-bold text-white">
            {TOOLS.length}
            <span className="ml-1 text-sm font-normal text-slate-400">defined</span>
          </p>
          <p className="mt-1 text-[11px] text-slate-500">{safeTools} safe · others permission-gated</p>
        </GlassCard>
      </div>

      {/* Pipeline */}
      <GlassCard title="Architecture pipeline" className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {PIPELINE.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.key} className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-indigo-500/25 bg-indigo-500/10 px-3 py-2">
                  <Icon className="h-4 w-4 text-indigo-300" />
                  <span className="text-[11px] font-bold tracking-wider text-slate-200">
                    {p.label}
                  </span>
                </div>
                {i < PIPELINE.length - 1 && (
                  <span className="text-slate-600">→</span>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
          Long-term goal: AI BRAIN → AGENTS → TOOLS → COMPUTER CONTROL → MEMORY →
          VERIFICATION → SECURE AUTONOMY. Every sensitive action asks your permission
          and is written to the activity log.
        </p>
      </GlassCard>

      {/* Agents grid */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-300">
            Specialized Agents
          </h3>
          <Link
            href="/agents"
            className="text-[12px] font-semibold text-indigo-300 hover:text-indigo-200"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((agent) => (
            <GlassCard key={agent.id} className="!p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[13px] font-bold text-white">{agent.name}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    agent.status === "ready"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-amber-500/15 text-amber-300"
                  }`}
                >
                  {agent.status === "planned" ? STATUS_LABEL.planned + agent.phase : agent.status}
                </span>
              </div>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300/70">
                {agent.role}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
                {agent.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* CTA */}
      <GlassCard className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-indigo-300" />
          <div>
            <p className="text-sm font-bold text-white">Talk to the AI Assistant</p>
            <p className="text-[12px] text-slate-400">
              Chat interface is ready — the brain connects in Phase 2 with a server-side AI key.
            </p>
          </div>
        </div>
        <Link
          href="/assistant"
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-transform hover:scale-[1.03]"
        >
          Open Assistant →
        </Link>
      </GlassCard>
    </SectionPage>
  );
}
