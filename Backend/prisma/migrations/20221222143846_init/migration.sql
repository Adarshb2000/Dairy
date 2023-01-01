/*
  Warnings:

  - You are about to drop the column `tagNumber` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Animal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "tagNumber",
DROP COLUMN "type";
