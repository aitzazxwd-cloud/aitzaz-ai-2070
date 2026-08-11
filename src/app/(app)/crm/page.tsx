import { Target } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";

export default function CrmPage() {
  return (
    <SectionPage
      title="Lead / CRM"
      icon={Target}
      description="Track leads, contacts and opportunities. The brain helps you follow up and close deals."
    >
      <GlassCard>
        <p className="text-[13px] font-bold text-white">CRM engine — Phase 6+</p>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
          Contacts, deal stages, follow-up reminders and summaries — backed by the database and
          calendar agents.
        </p>
      </GlassCard>
      <div className="mt-4 rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 text-center text-[12px] text-slate-500">
        No leads yet — CRM connects with the database in Phase 3+.
      </div>
    </SectionPage>
  );
}
