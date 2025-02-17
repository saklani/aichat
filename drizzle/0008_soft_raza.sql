ALTER TABLE "chats" ALTER COLUMN "model_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "collection_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "embeddings" ALTER COLUMN "object_id" SET DATA TYPE uuid;