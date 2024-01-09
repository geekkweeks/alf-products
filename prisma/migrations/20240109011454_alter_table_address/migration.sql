/*
  Warnings:

  - You are about to drop the column `address_detailnp` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `city` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `address_detailnp`,
    ADD COLUMN `city` VARCHAR(100) NOT NULL,
    ADD COLUMN `postal_code` VARCHAR(100) NOT NULL,
    ADD COLUMN `province` VARCHAR(100) NOT NULL,
    ADD COLUMN `street` VARCHAR(350) NOT NULL;
