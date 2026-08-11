import { Mail } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";

export default function EmailPage() {
  return (
    <SectionPage
      title="Email"
      icon={Mail}
      description="Draft, review and send email with the Email Agent. Nothing is sent without your approval."
    >
      <GlassCard>
        <p className="text-[13px] font-bold text-white">Email Agent — Phase 6</p>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
          The agent drafts replies, summarizes inboxes and flags what matters. Sending always shows
          an approve / reject gate:
        </p>
        <div className="mt-4 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 font-mono text-[11px] text-indigo-200">
          AI: &quot;I am ready to send this email. Approve?&quot; [APPROVE] [REJECT]
        </div>
      </GlassCard>
    </SectionPage>
  );
}
