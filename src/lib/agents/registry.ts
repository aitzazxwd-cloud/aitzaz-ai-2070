import type { AgentDefinition } from "./types";

/**
 * AGENT REGISTRY — the official list of specialized agents.
 * Main Brain routes work to these agents.
 */
export const AGENTS: AgentDefinition[] = [
  {
    id: "brain",
    name: "Main Brain",
    role: "Orchestrator",
    description:
      "Understands goals, plans multi-step tasks, routes work to the right agents and verifies results.",
    status: "planned",
    phase: 2,
  },
  {
    id: "computer",
    name: "Computer Control",
    role: "Desktop",
    description:
      "Opens apps, browses the web, types, clicks, reads the screen — only with explicit permission.",
    status: "planned",
    phase: 8,
  },
  {
    id: "web-research",
    name: "Web Research",
    role: "Research",
    description: "Searches the web, browses pages and summarizes findings with sources.",
    status: "planned",
    phase: 5,
  },
  {
    id: "files",
    name: "File Agent",
    role: "Documents",
    description: "Reads, writes, organizes and searches files and documents safely.",
    status: "planned",
    phase: 5,
  },
  {
    id: "email",
    name: "Email Agent",
    role: "Communication",
    description: "Drafts, reviews and (with approval) sends emails.",
    status: "planned",
    phase: 6,
  },
  {
    id: "github",
    name: "GitHub Agent",
    role: "Code",
    description: "Works with repositories, issues, PRs and CI — with permission.",
    status: "planned",
    phase: 6,
  },
  {
    id: "calendar",
    name: "Calendar Agent",
    role: "Schedule",
    description: "Reads and manages calendar events and reminders.",
    status: "planned",
    phase: 6,
  },
  {
    id: "job",
    name: "Job / Work Agent",
    role: "Career",
    description: "Prepares job applications, tracks opportunities and drafts materials.",
    status: "planned",
    phase: 10,
  },
  {
    id: "security",
    name: "Security & Permission",
    role: "Guard",
    description:
      "Blocks unsafe actions, requires approval for sensitive operations and keeps the audit log.",
    status: "planned",
    phase: 7,
  },
];

export const AGENT_COUNT = AGENTS.length;
