/*
  Warnings:

  - You are about to drop the column `first_name_pp` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `last_name_pp` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `phone_pp` on the `Payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Orders` ADD COLUMN `first_name_pp` VARCHAR(191) NULL,
    ADD COLUMN `last_name_pp` VARCHAR(191) NULL,
    ADD COLUMN `phone_pp` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Payments` DROP COLUMN `first_name_pp`,
    DROP COLUMN `last_name_pp`,
    DROP COLUMN `phone_pp`;
