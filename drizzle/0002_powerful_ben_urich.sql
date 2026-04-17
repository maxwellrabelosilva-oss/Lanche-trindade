CREATE TABLE `menuCategories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`order` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `menuCategories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menuItemImages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`menuItemId` int NOT NULL,
	`imageUrl` text NOT NULL,
	`imageKey` varchar(512) NOT NULL,
	`isPrimary` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `menuItemImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `storeConfig` (
	`id` int NOT NULL DEFAULT 1,
	`storeName` varchar(255) NOT NULL DEFAULT 'Lanchonete do Max',
	`storeDescription` text,
	`storePhone` varchar(20),
	`storeEmail` varchar(320),
	`storeAddress` text,
	`openingTime` varchar(5) NOT NULL DEFAULT '10:00',
	`closingTime` varchar(5) NOT NULL DEFAULT '23:00',
	`isOpen` int NOT NULL DEFAULT 1,
	`closedDays` varchar(50) NOT NULL DEFAULT '',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `storeConfig_id` PRIMARY KEY(`id`)
);
