-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_vendorId_fkey`;

-- DropIndex
DROP INDEX `User_vendorId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('CUSTOMER', 'ADMIN', 'VENDOR') NOT NULL DEFAULT 'CUSTOMER',
    MODIFY `vendorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
