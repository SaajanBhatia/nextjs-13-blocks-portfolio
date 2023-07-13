/*
  Warnings:

  - Made the column `url` on table `block` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `block` MODIFY `url` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Socials` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `Socials_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Socials` ADD CONSTRAINT `Socials_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
