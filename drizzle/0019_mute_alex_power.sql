DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `messages` ALTER COLUMN "createdAt" TO "createdAt" integer NOT NULL DEFAULT (unixepoch());--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);