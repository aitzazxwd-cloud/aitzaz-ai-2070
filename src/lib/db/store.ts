import { randomUUID } from "crypto";

import { SCHEMA_SQL } from "./schema";
import type {
  ChatRole,
  ChatStore,
  ConversationRecord,
  MessageRecord,
  StoreMode,
} from "./types";

/**
 * Chat store — two real backends behind one interface:
 *
 *  - "postgres": a real PostgreSQL database via DATABASE_URL
 *    (works with Supabase's direct connection string). Persists forever.
 *  - "memory": in-process storage when DATABASE_URL is not configured.
 *    Data survives only while the server is running — the UI always says
 *    which mode is active, so nothing is ever presented as persisted when
 *    it is not.
 */

// ─────────────────────────────────────────────────────────────────────────
// Postgres store
// ─────────────────────────────────────────────────────────────────────────

async function createPostgresStore(): Promise<ChatStore> {
  const { Pool } = await import("pg");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  await pool.query(SCHEMA_SQL);

  const rowToConversation = (r: {
    id: string;
    title: string;
    created_at: string | Date;
    updated_at: string | Date;
  }): ConversationRecord => ({
    id: r.id,
    title: r.title,
    createdAt: new Date(r.created_at).toISOString(),
    updatedAt: new Date(r.updated_at).toISOString(),
  });

  const rowToMessage = (r: {
    id: string;
    conversation_id: string;
    role: ChatRole;
    content: string;
    created_at: string | Date;
  }): MessageRecord => ({
    id: r.id,
    conversationId: r.conversation_id,
    role: r.role,
    content: r.content,
    createdAt: new Date(r.created_at).toISOString(),
  });

  return {
    mode: "postgres",

    async createConversation(title = "New chat") {
      const id = randomUUID();
      await pool.query(
        "INSERT INTO conversations (id, title) VALUES ($1, $2)",
        [id, title],
      );
      const { rows } = await pool.query(
        "SELECT * FROM conversations WHERE id = $1",
        [id],
      );
      return rowToConversation(rows[0]);
    },

    async listConversations() {
      const { rows } = await pool.query(
        "SELECT * FROM conversations ORDER BY updated_at DESC LIMIT 100",
      );
      return rows.map(rowToConversation);
    },

    async getConversation(id: string) {
      const { rows } = await pool.query(
        "SELECT * FROM conversations WHERE id = $1",
        [id],
      );
      return rows[0] ? rowToConversation(rows[0]) : null;
    },

    async getMessages(conversationId: string) {
      const { rows } = await pool.query(
        "SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC, id ASC",
        [conversationId],
      );
      return rows.map(rowToMessage);
    },

    async appendMessage(conversationId: string, role: ChatRole, content: string) {
      const id = randomUUID();
      await pool.query(
        "INSERT INTO messages (id, conversation_id, role, content) VALUES ($1, $2, $3, $4)",
        [id, conversationId, role, content],
      );
      await pool.query(
        "UPDATE conversations SET updated_at = now() WHERE id = $1",
        [conversationId],
      );
      const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
      return rowToMessage(rows[0]);
    },

    async touchConversation(id: string) {
      await pool.query("UPDATE conversations SET updated_at = now() WHERE id = $1", [id]);
    },

    async renameConversation(id: string, title: string) {
      await pool.query("UPDATE conversations SET title = $1 WHERE id = $2", [title, id]);
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────
// In-memory store (honest dev fallback)
// ─────────────────────────────────────────────────────────────────────────

function createMemoryStore(): ChatStore {
  const conversations = new Map<string, ConversationRecord>();
  const messages = new Map<string, MessageRecord[]>();

  return {
    mode: "memory",

    async createConversation(title = "New chat") {
      const now = new Date().toISOString();
      const record: ConversationRecord = {
        id: randomUUID(),
        title,
        createdAt: now,
        updatedAt: now,
      };
      conversations.set(record.id, record);
      messages.set(record.id, []);
      return record;
    },

    async listConversations() {
      return [...conversations.values()].sort((a, b) =>
        b.updatedAt.localeCompare(a.updatedAt),
      );
    },

    async getConversation(id: string) {
      return conversations.get(id) ?? null;
    },

    async getMessages(conversationId: string) {
      return messages.get(conversationId) ?? [];
    },

    async appendMessage(conversationId: string, role: ChatRole, content: string) {
      const list = messages.get(conversationId) ?? [];
      const record: MessageRecord = {
        id: randomUUID(),
        conversationId,
        role,
        content,
        createdAt: new Date().toISOString(),
      };
      list.push(record);
      messages.set(conversationId, list);

      const conv = conversations.get(conversationId);
      if (conv) {
        conv.updatedAt = record.createdAt;
        if (conv.title === "New chat" && role === "user") {
          conv.title = content.slice(0, 60);
        }
      }
      return record;
    },

    async touchConversation(id: string) {
      const conv = conversations.get(id);
      if (conv) conv.updatedAt = new Date().toISOString();
    },

    async renameConversation(id: string, title: string) {
      const conv = conversations.get(id);
      if (conv) conv.title = title;
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Singleton + factory
// ─────────────────────────────────────────────────────────────────────────

let cachedStore: ChatStore | null = null;

/** Build the active store. Throws only if DATABASE_URL is set but broken. */
export async function getChatStore(): Promise<ChatStore> {
  if (cachedStore) return cachedStore;

  if (process.env.DATABASE_URL?.trim()) {
    cachedStore = await createPostgresStore();
  } else {
    cachedStore = createMemoryStore();
  }
  return cachedStore;
}

/** Cheap, sync hint about which mode is active (no DB connection needed). */
export function storeMode(): StoreMode {
  return process.env.DATABASE_URL?.trim() ? "postgres" : "memory";
}
