/**
 * AGENTS — module types.
 *
 * The Main Brain decides which agent handles a task. Every agent is a
 * typed module so new agents can be added to the registry later without
 * touching the brain.
 */

export type AgentStatus = "ready" | "standby" | "busy" | "error" | "planned";

export interface AgentDefinition {
  id: string;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  /** Which phase of the roadmap brings this agent to life. */
  phase: number;
}

export interface AgentRegistry {
  agents: AgentDefinition[];
}
