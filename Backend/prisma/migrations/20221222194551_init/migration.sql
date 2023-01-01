/*
  Warnings:

  - A unique constraint covering the columns `[id,tag]` on the table `Pregnancy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pregnancy_id_tag_key" ON "Pregnancy"("id", "tag");
