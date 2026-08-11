/**
 * DB — module types (Phase 3).
 * Conversations + messages persisted in PostgreSQL (Supabase-compatible).
 */

export type ChatRole = "user" | "assistant" | "system";

export interface ConversationRecord {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageRecord {
  id: string;
  conversationId: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

/** Store modes — always honest about which one is active. */
export type StoreMode = "postgres" | "memory";

/** Contract every chat store must implement. */
export interface ChatStore {
  readonly mode: StoreMode;
  createConversation(title?: string): Promise<ConversationRecord>;
  listConversations(): Promise<ConversationRecord[]>;
  getConversation(id: string): Promise<ConversationRecord | null>;
  getMessages(conversationId: string): Promise<MessageRecord[]>;
  appendMessage(
    conversationId: string,
    role: ChatRole,
    content: string,
  ): Promise<MessageRecord>;
  touchConversation(id: string): Promise<void>;
  renameConversation(id: string, title: string): Promise<void>;
}
