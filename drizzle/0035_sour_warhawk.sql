CREATE TABLE `objects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`url` text,
	`status` text DEFAULT 'created',
	`user_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `plan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT 'free',
	`user_id` text NOT NULL,
	`message_usage` integer DEFAULT 0,
	`message_limit` integer DEFAULT 200,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
