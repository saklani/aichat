ALTER TABLE `Message` RENAME TO `message`;--> statement-breakpoint
CREATE TABLE `embeddings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vector` F32_BLOB(3),
	`objectId` text NOT NULL,
	FOREIGN KEY (`objectId`) REFERENCES `object`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_message` (
	`id` text PRIMARY KEY NOT NULL,
	`chatId` text NOT NULL,
	`content` text NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`chatId`) REFERENCES `chat`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_message`("id", "chatId", "content", "createdAt") SELECT "id", "chatId", "content", "createdAt" FROM `message`;--> statement-breakpoint
DROP TABLE `message`;--> statement-breakpoint
ALTER TABLE `__new_message` RENAME TO `message`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `chat` ADD `file_ids` text DEFAULT '[]';--> statement-breakpoint
ALTER TABLE `object` DROP COLUMN `vector_store_id`;