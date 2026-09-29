/*
  Warnings:

  - You are about to drop the column `first_name_pp` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `last_name_pp` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `phone_pp` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `prompay_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Orders` DROP COLUMN `first_name_pp`,
    DROP COLUMN `last_name_pp`,
    DROP COLUMN `phone_pp`,
    ADD COLUMN `prompay_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PrompayDetails` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `number_phone` VARCHAR(191) NOT NULL,
    `create_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_prompay_id_fkey` FOREIGN KEY (`prompay_id`) REFERENCES `PrompayDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
