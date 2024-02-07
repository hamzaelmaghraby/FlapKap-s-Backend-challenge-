/*
  Warnings:

  - You are about to drop the `cats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `cats`;

-- DropTable
DROP TABLE `dogs`;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `deposit` INTEGER NOT NULL,
    `role` ENUM('USER', 'BUYER') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `Users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `porductName` VARCHAR(191) NOT NULL,
    `amountAvailable` INTEGER NOT NULL,
    `cost` INTEGER NOT NULL,
    `sellerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
