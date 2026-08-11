/**
 * TOOLS — module types.
 *
 * Tools are the hands of the agents. Each tool declares what it can do and
 * whether it needs user permission. Sensitive tools always require approval.
 */

export type ToolStatus = "planned" | "ready" | "requires-permission";

export type ToolSensitivity = "safe" | "sensitive" | "irreversible";

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  status: ToolStatus;
  sensitivity: ToolSensitivity;
  phase: number;
}

export interface ToolRegistry {
  tools: ToolDefinition[];
}
