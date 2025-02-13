CREATE TABLE `user_preferences` (
	`user_id` text NOT NULL,
	`default_model` text DEFAULT 'gpt-4o-mini' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
DROP INDEX "chat_user_id_idx";--> statement-breakpoint
DROP INDEX "chat_last_message_idx";--> statement-breakpoint
DROP INDEX "message_chat_id_idx";--> statement-breakpoint
DROP INDEX "object_user_id_idx";--> statement-breakpoint
DROP INDEX "plan_user_id_idx";--> statement-breakpoint
DROP INDEX "plan_user_id_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `chats` ALTER COLUMN "title" TO "title" text NOT NULL;--> statement-breakpoint
CREATE INDEX `chat_user_id_idx` ON `chats` (`user_id`);--> statement-breakpoint
CREATE INDEX `chat_last_message_idx` ON `chats` (`last_message_at`);--> statement-breakpoint
CREATE INDEX `message_chat_id_idx` ON `messages` (`chat_id`);--> statement-breakpoint
CREATE INDEX `object_user_id_idx` ON `objects` (`user_id`);--> statement-breakpoint
CREATE INDEX `plan_user_id_idx` ON `plans` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `plan_user_id_unique` ON `plans` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);