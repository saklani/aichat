ALTER TABLE "embeddings" ALTER COLUMN "vector" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "plans" ALTER COLUMN "end_date" SET DEFAULT (now() + interval '28 day');--> statement-breakpoint
ALTER TABLE "embeddings" ADD COLUMN "content" text NOT NULL;