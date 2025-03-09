DROP INDEX "chat_title_idx";--> statement-breakpoint
DROP INDEX "chat_title_trgm_idx";--> statement-breakpoint
DROP INDEX "message_content_idx";--> statement-breakpoint
DROP INDEX "message_content_trgm_idx";--> statement-breakpoint
ALTER TABLE "user_preferences" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;