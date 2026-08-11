import { MonitorCog } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";

export default function ComputerPage() {
  return (
    <SectionPage
      title="Computer Control"
      icon={MonitorCog}
      description="With explicit permission, the AI can operate your computer: open apps, browse, type, click, read the screen and run approved commands."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <GlassCard title="Capabilities (Phase 8)">
          <ul className="space-y-2 text-[12px] text-slate-400">
            <li>• Open / close applications and websites</li>
            <li>• Search the web and read screen information</li>
            <li>• Type and click on your behalf</li>
            <li>• Work with files and approved commands</li>
          </ul>
        </GlassCard>
        <GlassCard title="Screen understanding (Phase 9)">
          <ul className="space-y-2 text-[12px] text-slate-400">
            <li>• Capture the screen and identify UI elements</li>
            <li>• &quot;Click the red button&quot; → find it, ask, click, verify</li>
            <li>• Never silent actions — every click needs your approval</li>
          </ul>
        </GlassCard>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-[12px] text-emerald-200">
        <span className="status-dot online" />
        Safety rule: sensitive and irreversible actions ALWAYS require your confirmation.
      </div>
    </SectionPage>
  );
}
