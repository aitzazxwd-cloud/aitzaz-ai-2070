"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  Network,
  ListChecks,
  MonitorCog,
  Target,
  Mail,
  Github,
  Briefcase,
  CalendarDays,
  FolderOpen,
  Database,
  Activity,
  Plug,
  Settings,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Assistant", href: "/assistant", icon: Bot },
  { label: "Agents", href: "/agents", icon: Network },
  { label: "Tasks", href: "/tasks", icon: ListChecks },
  { label: "Computer Control", href: "/computer", icon: MonitorCog },
  { label: "Lead / CRM", href: "/crm", icon: Target },
  { label: "Email", href: "/email", icon: Mail },
  { label: "GitHub", href: "/github", icon: Github },
  { label: "Jobs", href: "/jobs", icon: Briefcase },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Documents", href: "/documents", icon: FolderOpen },
  { label: "Memory", href: "/memory", icon: Database },
  { label: "Activity", href: "/activity", icon: Activity },
  { label: "Integrations", href: "/integrations", icon: Plug },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function titleForPath(pathname: string): string {
  const item = NAV_ITEMS.find((n) => pathname.startsWith(n.href));
  return item?.label ?? "Command Center";
}

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[248px] shrink-0 flex-col border-r border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-slate-800/60 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_0_20px_rgba(99,102,241,0.45)]">
          <Cpu className="h-5 w-5 text-white" />
        </div>
        <div className="leading-tight">
          <p className="text-[13px] font-bold tracking-wide text-white">
            AITZAZ <span className="text-gradient">AI 2070</span>
          </p>
          <p className="uppercase-tracked text-[9px] font-medium text-slate-500">
            Personal AI OS
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                    active
                      ? "text-white"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg border border-indigo-500/40 bg-indigo-500/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon className="relative z-10 h-4 w-4 shrink-0" />
                  <span className="relative z-10">{item.label}</span>
                  {active && (
                    <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.9)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer status */}
      <div className="border-t border-slate-800/60 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="status-dot online" />
          <span className="text-[11px] font-semibold text-slate-300">SYSTEM ONLINE</span>
        </div>
        <p className="mt-1 text-[10px] text-slate-500">9 agents registered · Phase 1 foundation</p>
      </div>
    </aside>
  );
}

export default Sidebar;
