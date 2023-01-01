/*
  Warnings:

  - Made the column `completed` on table `Pregnancy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pregnancy" ALTER COLUMN "completed" SET NOT NULL,
ALTER COLUMN "completed" SET DEFAULT false;
