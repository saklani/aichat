ALTER TABLE "embeddings" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "embeddings" ALTER COLUMN "id" SET DEFAULT (nextval('embeddings_id_seq'));