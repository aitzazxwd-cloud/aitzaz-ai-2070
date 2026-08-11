import { Briefcase } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";

export default function JobsPage() {
  return (
    <SectionPage
      title="Jobs"
      icon={Briefcase}
      description="The Job/Work Agent prepares applications, tracks opportunities and drafts materials."
    >
      <GlassCard>
        <p className="text-[13px] font-bold text-white">Job Agent — Phase 10 (Mission Mode)</p>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
          Example mission: &quot;Prepare everything I need for this job application.&quot; The brain
          plans, researches the role, analyzes your profile, prepares the application, asks your
          permission, executes and verifies.
        </p>
      </GlassCard>
    </SectionPage>
  );
}
