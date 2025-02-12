DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `plan` ALTER COLUMN "name" TO "name" text DEFAULT 'Free';--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);