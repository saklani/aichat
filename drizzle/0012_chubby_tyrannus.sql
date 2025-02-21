ALTER TABLE "chats" ADD COLUMN "parent_id" uuid;--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "parent_id" uuid;