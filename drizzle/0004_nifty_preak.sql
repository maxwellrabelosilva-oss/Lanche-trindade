ALTER TABLE `menuItems` MODIFY COLUMN `price` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `storeConfig` ADD `deliveryFee` decimal(10,2) DEFAULT '5.00' NOT NULL;