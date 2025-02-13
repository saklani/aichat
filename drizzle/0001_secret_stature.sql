ALTER TABLE `session` RENAME COLUMN "sessionToken" TO "id";--> statement-breakpoint
ALTER TABLE `session` RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
CREATE TABLE `password_reset` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`code` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
DROP TABLE `authenticator`;--> statement-breakpoint
DROP TABLE `verificationToken`;--> statement-breakpoint
ALTER TABLE `session` ADD `expires_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ALTER COLUMN "user_id" TO "user_id" text NOT NULL REFERENCES user(id) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `expires`;--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `plan` ALTER COLUMN "name" TO "name" text DEFAULT 'free';--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "email" TO "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `password_hash` text;--> statement-breakpoint
ALTER TABLE `user` ADD `google_id` text;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `emailVerified`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `image`;