CREATE TABLE "chats" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"user_id" text NOT NULL,
	"model_id" text,
	"collection_id" text NOT NULL,
	"system_prompt" text,
	"last_message_at" timestamp,
	"message_count" integer DEFAULT 0 NOT NULL,
	"is_archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT (now()) NOT NULL,
	"updated_at" timestamp DEFAULT (now()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text,
	"file_ids" json,
	"created_at" timestamp DEFAULT (now()) NOT NULL,
	"updated_at" timestamp DEFAULT (now()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "embeddings" (
	"id" text PRIMARY KEY NOT NULL,
	"vector" vector(1536)
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" text PRIMARY KEY NOT NULL,
	"chat_id" text NOT NULL,
	"content" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"tokens" integer,
	"model_id" text,
	"metadata" text,
	"created_at" timestamp DEFAULT (now()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "model" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"provider" text NOT NULL,
	"url" text,
	"key" text,
	"status" text DEFAULT 'active' NOT NULL,
	"config" text,
	"context_window" integer,
	"cost_per_1k_tokens" integer,
	"created_at" timestamp DEFAULT (now()) NOT NULL,
	"updated_at" timestamp DEFAULT (now()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "objects" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text,
	"size" integer,
	"url" text,
	"status" text DEFAULT 'created' NOT NULL,
	"user_id" text NOT NULL,
	"metadata" text,
	"created_at" timestamp DEFAULT (now()) NOT NULL,
	"updated_at" timestamp DEFAULT (now()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plans" (
	"id" text PRIMARY KEY DEFAULT (gen_random_uuid()) NOT NULL,
	"user_id" text NOT NULL,
	"type" text DEFAULT 'free' NOT NULL,
	"message_usage" integer DEFAULT 0 NOT NULL,
	"message_limit" integer DEFAULT 200 NOT NULL,
	"storage_usage" integer DEFAULT 0 NOT NULL,
	"storage_limit" integer DEFAULT 104857600 NOT NULL,
	"start_date" timestamp DEFAULT (now()) NOT NULL,
	"end_date" timestamp DEFAULT (now() + interval 28 day) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT (now()) NOT NULL,
	"updated_at" timestamp DEFAULT (now()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"password_hash" text,
	"google_id" text,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT (now()) NOT NULL,
	"updated_at" timestamp DEFAULT (now()) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"user_id" text NOT NULL,
	"default_model" text DEFAULT 'gpt-4o-mini' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_model_id_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."model"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_model_id_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."model"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "objects" ADD CONSTRAINT "objects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plans" ADD CONSTRAINT "plans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "chat_user_id_idx" ON "chats" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "chat_last_message_idx" ON "chats" USING btree ("last_message_at");--> statement-breakpoint
CREATE INDEX "collection_user_id_idx" ON "collections" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "embeddingIndex" ON "embeddings" USING hnsw ("vector" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX "message_chat_id_idx" ON "messages" USING btree ("chat_id");--> statement-breakpoint
CREATE INDEX "object_user_id_idx" ON "objects" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "plan_user_id_idx" ON "plans" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "plan_user_id_unique" ON "plans" USING btree ("user_id");