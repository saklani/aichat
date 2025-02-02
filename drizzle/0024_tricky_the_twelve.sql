ALTER TABLE `agent` RENAME TO `chat`;--> statement-breakpoint
ALTER TABLE `messages` RENAME COLUMN "agentId" TO "chatId";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_chat` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`user_id` text NOT NULL,
	`modelId` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`modelId`) REFERENCES `model`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_chat`("id", "name", "user_id", "modelId", "created_at") SELECT "id", "name", "user_id", "modelId", "created_at" FROM `chat`;--> statement-breakpoint
DROP TABLE `chat`;--> statement-breakpoint
ALTER TABLE `__new_chat` RENAME TO `chat`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `messages` ALTER COLUMN "chatId" TO "chatId" text NOT NULL REFERENCES chat(id) ON DELETE no action ON UPDATE no action;