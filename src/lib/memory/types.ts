/**
 * MEMORY — module types (Phase 4).
 *
 * Persistent, searchable memory. We never dump the full conversation into
 * the AI — only relevant memories are retrieved per task.
 */

export type MemoryKind = "conversation" | "project" | "preference" | "decision" | "fact" | "workflow";

export interface MemoryRecord {
  id: string;
  kind: MemoryKind;
  content: string;
  tags: string[];
  importance: number; // 0..1
  createdAt: string;
  lastAccessAt: string;
}

/** Contract every memory store must implement (SQL now, vector search later). */
export interface MemoryStore {
  save(record: Omit<MemoryRecord, "id" | "createdAt" | "lastAccessAt">): Promise<MemoryRecord>;
  search(query: string, limit?: number): Promise<MemoryRecord[]>;
  listRecent(limit?: number): Promise<MemoryRecord[]>;
  delete(id: string): Promise<void>;
}
