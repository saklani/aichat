ALTER TABLE `data` RENAME TO `object`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_object` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`url` text,
	`raw` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_object`("id", "name", "url", "raw", "user_id") SELECT "id", "name", "url", "raw", "user_id" FROM `object`;--> statement-breakpoint
DROP TABLE `object`;--> statement-breakpoint
ALTER TABLE `__new_object` RENAME TO `object`;--> statement-breakpoint
PRAGMA foreign_keys=ON;