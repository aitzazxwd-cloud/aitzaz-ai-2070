import { Activity } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";

export default function ActivityPage() {
  return (
    <SectionPage
      title="Activity"
      icon={Activity}
      description="Complete audit trail: what the system did, who approved it, and whether it succeeded."
    >
      <GlassCard>
        <p className="text-[13px] font-bold text-white">Activity Log — Phase 7</p>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
          Every action is logged: actor, action, outcome (success / failure / approved / rejected)
          and detail. The AI never claims success without verification — and you can audit every
          step here.
        </p>
      </GlassCard>
      <div className="mt-4 rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 text-center text-[12px] text-slate-500">
        Log starts recording when the security core activates (Phase 7).
      </div>
    </SectionPage>
  );
}
