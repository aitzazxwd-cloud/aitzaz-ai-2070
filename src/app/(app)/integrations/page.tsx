import { Plug } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";

export default function IntegrationsPage() {
  return (
    <SectionPage
      title="Integrations"
      icon={Plug}
      description="Connect the services the agents use: email, calendar, GitHub, web search and more."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "OpenAI / Anthropic", desc: "AI provider (Phase 2)", ready: false },
          { name: "Supabase / PostgreSQL", desc: "Database (Phase 3)", ready: false },
          { name: "Email", desc: "Email Agent (Phase 6)", ready: false },
          { name: "Calendar", desc: "Calendar Agent (Phase 6)", ready: false },
          { name: "GitHub", desc: "GitHub Agent (Phase 6)", ready: false },
          { name: "Web Search", desc: "Research tool (Phase 5)", ready: false },
        ].map((int) => (
          <GlassCard key={int.name} className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-bold text-white">{int.name}</p>
              <p className="text-[11px] text-slate-500">{int.desc}</p>
            </div>
            <span className="rounded-full bg-slate-700/50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Planned
            </span>
          </GlassCard>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-slate-500">
        Secrets live in <code className="text-slate-400">.env.local</code> (server-side only) — never
        in the frontend or the repo.
      </p>
    </SectionPage>
  );
}
