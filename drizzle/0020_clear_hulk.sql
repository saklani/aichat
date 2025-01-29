DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `agent` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (unixepoch());--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);