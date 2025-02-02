CREATE TABLE `model` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
ALTER TABLE `chat` ADD `model_id` integer NOT NULL REFERENCES model(id);