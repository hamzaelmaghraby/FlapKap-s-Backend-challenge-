-- AlterTable
ALTER TABLE `cats` ADD COLUMN `role` ENUM('USER', 'ADMIN', 'BUYER') NOT NULL DEFAULT 'USER';
