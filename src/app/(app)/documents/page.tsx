import { FolderOpen } from "lucide-react";
import { SectionPage, GlassCard } from "@/components/shell/SectionPage";

export default function DocumentsPage() {
  return (
    <SectionPage
      title="Documents"
      icon={FolderOpen}
      description="Files, notes and documents — searched and organized by the File Agent."
    >
      <GlassCard>
        <p className="text-[13px] font-bold text-white">File Agent — Phase 5</p>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
          Read files safely, create documents, organize folders and search content. Writes are
          sensitive; deletes are irreversible and always confirmed.
        </p>
      </GlassCard>
    </SectionPage>
  );
}
