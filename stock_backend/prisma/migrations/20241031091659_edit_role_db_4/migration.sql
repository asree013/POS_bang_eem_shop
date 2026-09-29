/*
  Warnings:

  - You are about to drop the column `role` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Products` DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `Users` MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'user';
