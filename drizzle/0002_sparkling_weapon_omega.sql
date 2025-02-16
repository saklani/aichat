ALTER TABLE "embeddings" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "embeddings" ADD COLUMN "object_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "embeddings" ADD CONSTRAINT "embeddings_object_id_objects_id_fk" FOREIGN KEY ("object_id") REFERENCES "public"."objects"("id") ON DELETE cascade ON UPDATE no action;