/*
  Warnings:

  - You are about to drop the column `bullNumber` on the `Copulation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Copulation" RENAME "bullNumber" TO "bull";
ALTER TABLE "Copulation" ALTER COLUMN "bull" TYPE TEXT
