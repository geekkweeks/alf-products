/*
  Warnings:

  - Added the required column `original_name` to the `assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assets` ADD COLUMN `original_name` VARCHAR(250) NOT NULL;
