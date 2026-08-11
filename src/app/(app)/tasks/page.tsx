import { ListChecks } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";

export default function TasksPage() {
  return (
    <SectionPage
      title="Tasks"
      icon={ListChecks}
      description="Multi-step goals planned by the brain. Each task shows plan → research → analyze → prepare → ask permission → execute → verify → report."
    >
      <GlassCard>
        <p className="text-[13px] font-bold text-white">Mission Mode — Phase 10</p>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
          Give one high-level goal (for example: &quot;Prepare everything I need for this job
          application&quot;) and the brain breaks it into a verified multi-step mission. You stay in
          control at every permission gate.
        </p>
      </GlassCard>
      <div className="mt-4 rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 text-center text-[12px] text-slate-500">
        No tasks yet — task engine arrives in Phase 10.
      </div>
    </SectionPage>
  );
}
