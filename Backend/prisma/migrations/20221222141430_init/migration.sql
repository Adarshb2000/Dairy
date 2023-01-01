/*
  Warnings:

  - The primary key for the `Animal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `tagNumber` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Animals" AS ENUM ('cow', 'buffalo');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_tag_fkey";

-- DropForeignKey
ALTER TABLE "Disease" DROP CONSTRAINT "Disease_tag_fkey";

-- DropForeignKey
ALTER TABLE "Milk" DROP CONSTRAINT "Milk_tag_fkey";

-- DropForeignKey
ALTER TABLE "Pregnancy" DROP CONSTRAINT "Pregnancy_tag_fkey";

-- AlterTable
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_pkey",
ADD COLUMN     "tagNumber" INTEGER NOT NULL,
ADD COLUMN     "type" "Animals" NOT NULL,
ALTER COLUMN "tag" SET DATA TYPE TEXT,
ADD CONSTRAINT "Animal_pkey" PRIMARY KEY ("tag");

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "tag" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Disease" ALTER COLUMN "tag" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Milk" ALTER COLUMN "tag" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Pregnancy" ALTER COLUMN "tag" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tag_fkey" FOREIGN KEY ("tag") REFERENCES "Animal"("tag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregnancy" ADD CONSTRAINT "Pregnancy_tag_fkey" FOREIGN KEY ("tag") REFERENCES "Animal"("tag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disease" ADD CONSTRAINT "Disease_tag_fkey" FOREIGN KEY ("tag") REFERENCES "Animal"("tag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milk" ADD CONSTRAINT "Milk_tag_fkey" FOREIGN KEY ("tag") REFERENCES "Animal"("tag") ON DELETE RESTRICT ON UPDATE CASCADE;
