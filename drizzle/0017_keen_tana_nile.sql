ALTER TABLE "collections" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "collections" CASCADE;--> statement-breakpoint
ALTER TABLE "chats" RENAME COLUMN "collection_id" TO "file_ids";--> statement-breakpoint
ALTER TABLE "chats" DROP CONSTRAINT "chats_collection_id_collections_id_fk";
