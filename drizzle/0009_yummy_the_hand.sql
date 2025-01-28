ALTER TABLE `chat` ADD `title` text;--> statement-breakpoint
ALTER TABLE `chat` DROP COLUMN `model`;--> statement-breakpoint
ALTER TABLE `object` ADD `vector_store_id` text;