/**
 * DB — SQL schema (Phase 3).
 * Tables are created idempotently at startup when PostgreSQL is configured.
 * UUIDs are generated in the app (crypto.randomUUID) to avoid extension deps.
 */

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS conversations (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL DEFAULT 'local',
  title       TEXT NOT NULL DEFAULT 'New chat',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id              TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role            TEXT NOT NULL CHECK (role IN ('user','assistant','system')),
  content         TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation
  ON messages(conversation_id, created_at);

CREATE INDEX IF NOT EXISTS idx_conversations_updated
  ON conversations(updated_at DESC);
`;
