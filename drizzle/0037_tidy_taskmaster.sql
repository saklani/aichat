DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `plan` ALTER COLUMN "message_usage" TO "message_usage" integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `plan` ALTER COLUMN "message_limit" TO "message_limit" integer NOT NULL DEFAULT 200;