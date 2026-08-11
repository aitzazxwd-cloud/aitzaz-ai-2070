import { Github } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";

export default function GithubPage() {
  return (
    <SectionPage
      title="GitHub"
      icon={Github}
      description="Work with repositories, issues, pull requests and CI — with the GitHub Agent."
    >
      <GlassCard>
        <p className="text-[13px] font-bold text-white">GitHub Agent — Phase 6</p>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
          Open repos, review issues, prepare PRs and run approved CI workflows. Commits and pushes
          are irreversible — they always need your confirmation.
        </p>
        <p className="mt-3 text-[11px] text-slate-500">
          This very repository (aitzaz-ai-2070) will be the agent&apos;s first playground.
        </p>
      </GlassCard>
    </SectionPage>
  );
}
