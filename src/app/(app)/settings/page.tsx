import { Settings } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";

export default function SettingsPage() {
  return (
    <SectionPage
      title="Settings"
      icon={Settings}
      description="System configuration: AI provider, permissions, environment and appearance."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <GlassCard title="AI Provider">
          <p className="text-[12px] text-slate-400">
            OpenAI or Anthropic — swappable via the provider abstraction. Keys are set in{" "}
            <code className="text-slate-400">.env.local</code>, never in code.
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
            <span className="status-dot planned" /> Not configured — Phase 2
          </div>
        </GlassCard>
        <GlassCard title="Permissions">
          <p className="text-[12px] text-slate-400">
            Sensitive and irreversible actions always require approval. Activity logging can be
            tuned per tool.
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
            <span className="status-dot planned" /> Security core — Phase 7
          </div>
        </GlassCard>
        <GlassCard title="Appearance">
          <p className="text-[12px] text-slate-400">
            Futuristic dark command-center theme is active. More themes arrive with the UI polish
            phase.
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
            <span className="status-dot online" /> Dark · Glassmorphism · Active
          </div>
        </GlassCard>
        <GlassCard title="Environment">
          <p className="text-[12px] text-slate-400">
            Check your Node.js and disk space before running the app (see README).
          </p>
          <div className="mt-3 rounded-lg bg-slate-900/60 px-3 py-2 font-mono text-[11px] text-slate-400">
            df -h && node --version
          </div>
        </GlassCard>
      </div>
    </SectionPage>
  );
}
