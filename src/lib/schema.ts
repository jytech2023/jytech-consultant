import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  vector,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Users (synced from Auth0) ──────────────────────────────────────
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  auth0Id: text("auth0_id").notNull().unique(),
  email: text("email"),
  name: text("name"),
  picture: text("picture"),
  // Preferences
  preferredModel: text("preferred_model").default("openrouter/auto").notNull(),
  // Subscription: "free" | "pro" | "enterprise"
  plan: text("plan").default("free").notNull(),
  planExpiresAt: timestamp("plan_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  chatSessions: many(chatSessions),
}));

// ── Chat Sessions ──────────────────────────────────────────────────
export const chatSessions = pgTable(
  "chat_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    industrySlug: text("industry_slug").notNull(),
    moduleSlug: text("module_slug").notNull(),
    title: text("title"),
    // Vector embedding of the session for semantic search (1536 = OpenAI dim)
    embedding: vector("embedding", { dimensions: 1536 }),
    messageCount: integer("message_count").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("chat_sessions_user_id_idx").on(table.userId),
    index("chat_sessions_industry_idx").on(table.industrySlug, table.moduleSlug),
  ]
);

export const chatSessionsRelations = relations(chatSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [chatSessions.userId],
    references: [users.id],
  }),
  messages: many(chatMessages),
}));

// ── Chat Messages ──────────────────────────────────────────────────
export const chatMessages = pgTable(
  "chat_messages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => chatSessions.id, { onDelete: "cascade" }),
    role: text("role").notNull(), // "user" | "assistant"
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("chat_messages_session_id_idx").on(table.sessionId),
  ]
);

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  session: one(chatSessions, {
    fields: [chatMessages.sessionId],
    references: [chatSessions.id],
  }),
}));
