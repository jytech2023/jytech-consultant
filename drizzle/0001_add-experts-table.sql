CREATE TABLE "calendly_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token" text NOT NULL,
	"refresh_token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"calendly_user_uri" text NOT NULL,
	"calendly_email" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_ratings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"session_id" uuid,
	"model_id" text NOT NULL,
	"industry_slug" text,
	"module_slug" text,
	"locale" text,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"file_name" text NOT NULL,
	"file_size" integer NOT NULL,
	"file_type" text NOT NULL,
	"parse_job_id" text,
	"parse_status" text DEFAULT 'pending' NOT NULL,
	"content" text,
	"key_source" text DEFAULT 'system' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"name_zh" text,
	"industries" text NOT NULL,
	"title" text NOT NULL,
	"title_zh" text,
	"bio" text,
	"bio_zh" text,
	"hourly_rate" integer,
	"city" text,
	"profile_url" text NOT NULL,
	"avatar_url" text,
	"external_avatar_url" text,
	"user_id" uuid,
	"active" integer DEFAULT 1 NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "experts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "model_scores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"model_id" text NOT NULL,
	"industry_slug" text,
	"locale" text,
	"total_ratings" integer DEFAULT 0 NOT NULL,
	"positive_ratings" integer DEFAULT 0 NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"user_select_count" integer DEFAULT 0 NOT NULL,
	"period" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "preferred_model" text DEFAULT 'openrouter/free' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "llamaindex_api_key" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_expert" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "expert_status" text DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "expert_industries" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "hourly_rate_online" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "hourly_rate_onsite" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "expert_city" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "expert_bio" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "license_type" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "license_number" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "license_state" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "license_verified" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "hourly_rate" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "referral_commission" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "referred_by" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "linkedin_imported" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "plan" text DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "plan_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "calendly_tokens" ADD CONSTRAINT "calendly_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_ratings" ADD CONSTRAINT "chat_ratings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_ratings" ADD CONSTRAINT "chat_ratings_session_id_chat_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."chat_sessions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experts" ADD CONSTRAINT "experts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "calendly_tokens_user_id_idx" ON "calendly_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "chat_ratings_model_idx" ON "chat_ratings" USING btree ("model_id");--> statement-breakpoint
CREATE INDEX "chat_ratings_created_idx" ON "chat_ratings" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "documents_user_id_idx" ON "documents" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "experts_slug_idx" ON "experts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "experts_active_idx" ON "experts" USING btree ("active");--> statement-breakpoint
CREATE INDEX "model_scores_lookup_idx" ON "model_scores" USING btree ("model_id","industry_slug","locale","period");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_referred_by_users_id_fk" FOREIGN KEY ("referred_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;