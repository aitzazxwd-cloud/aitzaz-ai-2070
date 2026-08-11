import type { LucideIcon } from "lucide-react";

/**
 * Shared section page layout — title, description, and content cards.
 */
export function SectionPage({
  title,
  icon: Icon,
  description,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-start gap-3">
        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10">
            <Icon className="h-5 w-5 text-indigo-300" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-slate-400">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

/** A glass card used across sections. */
export function GlassCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass glass-hover p-5 ${className}`}>
      {title && (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}
