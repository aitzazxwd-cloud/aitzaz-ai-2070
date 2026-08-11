import { CalendarDays } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";

export default function CalendarPage() {
  return (
    <SectionPage
      title="Calendar"
      icon={CalendarDays}
      description="Read and manage events and reminders with the Calendar Agent."
    >
      <GlassCard>
        <p className="text-[13px] font-bold text-white">Calendar Agent — Phase 6</p>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
          Ask &quot;What&apos;s on my calendar tomorrow?&quot; or &quot;Find a free slot on
          Friday.&quot; Creating or moving events is permission-gated.
        </p>
      </GlassCard>
      <div className="mt-4 rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 text-center text-[12px] text-slate-500">
        Calendar connects in Phase 6.
      </div>
    </SectionPage>
  );
}
