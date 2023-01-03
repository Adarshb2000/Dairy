/*
  Warnings:

  - You are about to drop the column `seller` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleNumber` on the `Animal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Animal" RENAME COLUMN "seller" TO "information";
ALTER TABLE "Animal" DROP COLUMN "vehicleNumber"
