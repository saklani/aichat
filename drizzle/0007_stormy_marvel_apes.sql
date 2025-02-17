ALTER TABLE "messages" RENAME COLUMN "user_id" TO "chat_id";--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_user_id_chats_id_fk";
--> statement-breakpoint
DROP INDEX "message_chat_id_idx";--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "message_chat_id_idx" ON "messages" USING btree ("chat_id");