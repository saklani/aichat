CREATE TABLE `data` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text,
	`raw` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `file`;