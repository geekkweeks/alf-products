/*
  Warnings:

  - You are about to drop the column `location` on the `productimages` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `productimages` table. All the data in the column will be lost.
  - Added the required column `asset_id` to the `productimages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productimages` DROP COLUMN `location`,
    DROP COLUMN `name`,
    ADD COLUMN `asset_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `assets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `location` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productimages` ADD CONSTRAINT `productimages_asset_id_fkey` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
