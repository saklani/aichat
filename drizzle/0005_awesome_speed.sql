DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `object` ALTER COLUMN "location" TO "location" text NOT NULL DEFAULT 'aisearch';--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);