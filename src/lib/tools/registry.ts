import type { ToolDefinition } from "./types";

/**
 * TOOL REGISTRY — the hands of the system.
 * Sensitive and irreversible tools are gated behind permission requests.
 */
export const TOOLS: ToolDefinition[] = [
  {
    id: "web-search",
    name: "Web Search",
    description: "Search the internet and return ranked results.",
    status: "planned",
    sensitivity: "safe",
    phase: 5,
  },
  {
    id: "browse",
    name: "Browse Page",
    description: "Open a page and extract readable content.",
    status: "planned",
    sensitivity: "safe",
    phase: 5,
  },
  {
    id: "file-read",
    name: "Read File",
    description: "Read a file from the workspace.",
    status: "planned",
    sensitivity: "safe",
    phase: 5,
  },
  {
    id: "file-write",
    name: "Write File",
    description: "Create or edit a file.",
    status: "planned",
    sensitivity: "sensitive",
    phase: 5,
  },
  {
    id: "screenshot",
    name: "Screen Capture",
    description: "Capture what is on the screen to understand UI elements.",
    status: "planned",
    sensitivity: "sensitive",
    phase: 9,
  },
  {
    id: "mouse-click",
    name: "Click / Type",
    description: "Move the mouse, click and type — with permission.",
    status: "planned",
    sensitivity: "sensitive",
    phase: 8,
  },
  {
    id: "run-command",
    name: "Run Command",
    description: "Execute an approved shell command on this machine.",
    status: "planned",
    sensitivity: "irreversible",
    phase: 8,
  },
  {
    id: "send-email",
    name: "Send Email",
    description: "Send an email through the user's account.",
    status: "planned",
    sensitivity: "irreversible",
    phase: 6,
  },
  {
    id: "github-push",
    name: "GitHub Push",
    description: "Commit and push changes to a repository.",
    status: "planned",
    sensitivity: "irreversible",
    phase: 6,
  },
];

export const TOOL_COUNT = TOOLS.length;
