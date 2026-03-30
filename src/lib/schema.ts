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
  preferredModel: text("preferred_model").default("openrouter/free").notNull(),
  // BYOK — user's own LlamaIndex API key (encrypted in production)
  llamaindexApiKey: text("llamaindex_api_key"),
  // Expert profile
  isExpert: integer("is_expert").default(0).notNull(), // 0 = no, 1 = yes
  expertStatus: text("expert_status").default("draft").notNull(), // draft | pending | approved | rejected
  expertIndustries: text("expert_industries"), // comma-separated slugs, e.g. "technology,media"
  hourlyRateOnline: integer("hourly_rate_online"), // online consultation rate in USD
  hourlyRateOnsite: integer("hourly_rate_onsite"), // on-site consultation rate in USD
  expertCity: text("expert_city"), // e.g. "San Francisco, CA"
  expertBio: text("expert_bio"), // short self-introduction
  // Keep hourlyRate as legacy / default
  hourlyRate: integer("hourly_rate"), // in USD (legacy, defaults to online rate)
  // Subscription: "free" | "start" | "growth" | "enterprise"
  plan: text("plan").default("free").notNull(),
  planExpiresAt: timestamp("plan_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  chatSessions: many(chatSessions),
  documents: many(documents),
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

// ── Knowledge Base Documents ───────────────────────────────────────
export const documents = pgTable(
  "documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    fileName: text("file_name").notNull(),
    fileSize: integer("file_size").notNull(),
    fileType: text("file_type").notNull(),
    // LlamaParse job tracking
    parseJobId: text("parse_job_id"),
    parseStatus: text("parse_status").default("pending").notNull(), // pending | processing | success | error
    // Parsed content stored for RAG
    content: text("content"),
    // Which API key was used: "system" or "byok"
    keySource: text("key_source").default("system").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("documents_user_id_idx").on(table.userId),
  ]
);

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
}));

// ── Calendly Tokens (expert OAuth connections) ────────────────────
export const calendlyTokens = pgTable(
  "calendly_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    calendlyUserUri: text("calendly_user_uri").notNull(),
    calendlyEmail: text("calendly_email"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("calendly_tokens_user_id_idx").on(table.userId),
  ]
);

export const calendlyTokensRelations = relations(calendlyTokens, ({ one }) => ({
  user: one(users, {
    fields: [calendlyTokens.userId],
    references: [users.id],
  }),
}));
