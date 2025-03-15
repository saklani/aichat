ALTER TABLE "messages" DROP CONSTRAINT "messages_model_id_model_id_fk";
--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN "model_id";