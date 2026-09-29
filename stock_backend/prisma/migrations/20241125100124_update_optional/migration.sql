-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_prompay_id_fkey`;

-- AlterTable
ALTER TABLE `Orders` MODIFY `prompay_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_prompay_id_fkey` FOREIGN KEY (`prompay_id`) REFERENCES `PrompayDetails`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
