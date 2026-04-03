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
  // License info (required for legal, medical, finance industries)
  licenseType: text("license_type"), // e.g. "Bar License", "CPA", "MD"
  licenseNumber: text("license_number"),
  licenseState: text("license_state"), // e.g. "CA", "NY"
  licenseVerified: integer("license_verified").default(0).notNull(), // 0 = unverified, 1 = verified
  // Keep hourlyRate as legacy / default
  hourlyRate: integer("hourly_rate"), // in USD (legacy, defaults to online rate)
  // Referral: commission earned by importing LinkedIn connections
  referralCommission: integer("referral_commission").default(0).notNull(), // e.g. 5 = 5% of total booking
  referredBy: uuid("referred_by").references((): any => users.id), // who referred this user
  linkedinImported: integer("linkedin_imported").default(0).notNull(), // number of connections imported
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

// ── Chat Ratings (user feedback on AI responses) ─────────────────
export const chatRatings = pgTable(
  "chat_ratings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    sessionId: uuid("session_id").references(() => chatSessions.id, { onDelete: "set null" }),
    modelId: text("model_id").notNull(), // actual model used, e.g. "qwen/qwen3-coder:free"
    industrySlug: text("industry_slug"),
    moduleSlug: text("module_slug"),
    locale: text("locale"),
    rating: integer("rating").notNull(), // 1 = good, -1 = bad
    comment: text("comment"), // optional user feedback
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("chat_ratings_model_idx").on(table.modelId),
    index("chat_ratings_created_idx").on(table.createdAt),
  ]
);

// ── Model Routing Scores (weekly aggregated) ─────────────────────
export const modelScores = pgTable(
  "model_scores",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    modelId: text("model_id").notNull(),
    industrySlug: text("industry_slug"), // null = global score
    locale: text("locale"), // null = all locales
    totalRatings: integer("total_ratings").default(0).notNull(),
    positiveRatings: integer("positive_ratings").default(0).notNull(),
    score: integer("score").default(0).notNull(), // 0-100 percentage
    userSelectCount: integer("user_select_count").default(0).notNull(), // how many users chose this model
    period: text("period").notNull(), // e.g. "2026-W13"
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("model_scores_lookup_idx").on(table.modelId, table.industrySlug, table.locale, table.period),
  ]
);

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

// ── Experts (platform-listed consultants) ────────────────────────
export const expertsTable = pgTable(
  "experts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    nameZh: text("name_zh"),
    industries: text("industries").notNull(), // comma-separated slugs, e.g. "technology,media"
    title: text("title").notNull(),
    titleZh: text("title_zh"),
    bio: text("bio"),
    bioZh: text("bio_zh"),
    hourlyRate: integer("hourly_rate"),
    city: text("city"),
    profileUrl: text("profile_url").notNull(), // e.g. "/industry/technology/experts/jay-lin"
    avatarUrl: text("avatar_url"), // e.g. "/avatar/grace-zhou.png"
    externalAvatarUrl: text("external_avatar_url"), // e.g. https://...
    // Link to auth0 user if they have an account
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    active: integer("active").default(1).notNull(), // 1 = visible, 0 = hidden
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("experts_slug_idx").on(table.slug),
    index("experts_active_idx").on(table.active),
  ]
);
