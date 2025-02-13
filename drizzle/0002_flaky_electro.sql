CREATE TABLE `chats` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`user_id` text NOT NULL,
	`model_id` text,
	`system_prompt` text,
	`last_message_at` integer,
	`message_count` integer DEFAULT 0 NOT NULL,
	`is_archived` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`model_id`) REFERENCES `model`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `chat_user_id_idx` ON `chats` (`user_id`);--> statement-breakpoint
CREATE INDEX `chat_last_message_idx` ON `chats` (`last_message_at`);--> statement-breakpoint
CREATE TABLE `plans` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`type` text DEFAULT 'free' NOT NULL,
	`message_usage` integer DEFAULT 0 NOT NULL,
	`message_limit` integer DEFAULT 200 NOT NULL,
	`storage_usage` integer DEFAULT 0 NOT NULL,
	`storage_limit` integer DEFAULT 104857600 NOT NULL,
	`start_date` integer DEFAULT (unixepoch()) NOT NULL,
	`end_date` integer,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `plan_user_id_idx` ON `plans` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `plan_user_id_unique` ON `plans` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`password_hash` text,
	`google_id` text,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
DROP TABLE `chat`;--> statement-breakpoint
DROP TABLE `password_reset`;--> statement-breakpoint
DROP TABLE `plan`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`chat_id` text NOT NULL,
	`content` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`tokens` integer,
	`model_id` text,
	`metadata` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`model_id`) REFERENCES `model`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_messages`("id", "chat_id", "content", "role", "tokens", "model_id", "metadata", "created_at") SELECT "id", "chat_id", "content", "role", "tokens", "model_id", "metadata", "created_at" FROM `messages`;--> statement-breakpoint
DROP TABLE `messages`;--> statement-breakpoint
ALTER TABLE `__new_messages` RENAME TO `messages`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `message_chat_id_idx` ON `messages` (`chat_id`);--> statement-breakpoint
CREATE TABLE `__new_objects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text,
	`size` integer,
	`url` text,
	`status` text DEFAULT 'created' NOT NULL,
	`user_id` text NOT NULL,
	`metadata` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_objects`("id", "name", "type", "size", "url", "status", "user_id", "metadata", "created_at", "updated_at") SELECT "id", "name", "type", "size", "url", "status", "user_id", "metadata", "created_at", "updated_at" FROM `objects`;--> statement-breakpoint
DROP TABLE `objects`;--> statement-breakpoint
ALTER TABLE `__new_objects` RENAME TO `objects`;--> statement-breakpoint
CREATE INDEX `object_user_id_idx` ON `objects` (`user_id`);--> statement-breakpoint
DROP INDEX "chat_user_id_idx";--> statement-breakpoint
DROP INDEX "chat_last_message_idx";--> statement-breakpoint
DROP INDEX "message_chat_id_idx";--> statement-breakpoint
DROP INDEX "object_user_id_idx";--> statement-breakpoint
DROP INDEX "plan_user_id_idx";--> statement-breakpoint
DROP INDEX "plan_user_id_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `model` ALTER COLUMN "name" TO "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE `model` ADD `provider` text NOT NULL;--> statement-breakpoint
ALTER TABLE `model` ADD `status` text DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE `model` ADD `config` text;--> statement-breakpoint
ALTER TABLE `model` ADD `context_window` integer;--> statement-breakpoint
ALTER TABLE `model` ADD `cost_per_1k_tokens` integer;--> statement-breakpoint
ALTER TABLE `model` ADD `created_at` integer DEFAULT (unixepoch()) NOT NULL;--> statement-breakpoint
ALTER TABLE `model` ADD `updated_at` integer DEFAULT (unixepoch()) NOT NULL;