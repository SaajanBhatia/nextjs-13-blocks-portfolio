/*
  Warnings:

  - You are about to drop the column `userId` on the `socials` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `socials` DROP FOREIGN KEY `Socials_userId_fkey`;

-- AlterTable
ALTER TABLE `socials` DROP COLUMN `userId`;
