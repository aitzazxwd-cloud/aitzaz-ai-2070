/**
 * SECURITY — module types (Phase 7).
 *
 * Separation between AI reasoning and privileged actions:
 *  - the AI can think and plan freely,
 *  - but every sensitive action must pass the permission gate,
 *  - and everything is written to the activity log.
 */

export type PermissionDecision = "approved" | "rejected" | "pending";

export interface PermissionRequest {
  id: string;
  toolId: string;
  action: string;
  summary: string; // shown to the user: "I am ready to send this email. Approve?"
  sensitivity: "safe" | "sensitive" | "irreversible";
  decision: PermissionDecision;
  decidedAt?: string;
}

export interface ActivityLogEntry {
  id: string;
  ts: string;
  actor: string; // "brain" | "agent:email" | "user"
  action: string;
  outcome: "success" | "failure" | "approved" | "rejected" | "started";
  detail: string;
}

/** Contract for the audit log store. */
export interface ActivityLogStore {
  append(entry: Omit<ActivityLogEntry, "id" | "ts">): Promise<ActivityLogEntry>;
  list(limit?: number): Promise<ActivityLogEntry[]>;
}
