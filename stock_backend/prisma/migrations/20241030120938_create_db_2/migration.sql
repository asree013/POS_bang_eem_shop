/*
  Warnings:

  - You are about to drop the column `payment_id` on the `Payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_id]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Payments` DROP FOREIGN KEY `Payments_payment_id_fkey`;

-- AlterTable
ALTER TABLE `Orders` ADD COLUMN `payment_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Payments` DROP COLUMN `payment_id`;

-- CreateIndex
CREATE UNIQUE INDEX `Orders_payment_id_key` ON `Orders`(`payment_id`);

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `Payments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
