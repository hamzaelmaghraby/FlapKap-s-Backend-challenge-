/*
  Warnings:

  - A unique constraint covering the columns `[porductName]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Product_porductName_key` ON `Product`(`porductName`);
