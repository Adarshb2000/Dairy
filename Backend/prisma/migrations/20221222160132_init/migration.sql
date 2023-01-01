-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_tag_fkey";

-- DropForeignKey
ALTER TABLE "Copulation" DROP CONSTRAINT "Copulation_pregnancyId_fkey";

-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_pregnancyId_fkey";

-- DropForeignKey
ALTER TABLE "Disease" DROP CONSTRAINT "Disease_tag_fkey";

-- DropForeignKey
ALTER TABLE "Examination" DROP CONSTRAINT "Examination_pregnancyId_fkey";

-- DropForeignKey
ALTER TABLE "Lactation" DROP CONSTRAINT "Lactation_pregnancyId_fkey";

-- DropForeignKey
ALTER TABLE "Milk" DROP CONSTRAINT "Milk_tag_fkey";

-- DropForeignKey
ALTER TABLE "Pregnancy" DROP CONSTRAINT "Pregnancy_tag_fkey";

-- DropForeignKey
ALTER TABLE "Vaccination" DROP CONSTRAINT "Vaccination_diseaseId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_tag_fkey" FOREIGN KEY ("tag") REFERENCES "Animal"("tag") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pregnancy" ADD CONSTRAINT "Pregnancy_tag_fkey" FOREIGN KEY ("tag") REFERENCES "Animal"("tag") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Copulation" ADD CONSTRAINT "Copulation_pregnancyId_fkey" FOREIGN KEY ("pregnancyId") REFERENCES "Pregnancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Examination" ADD CONSTRAINT "Examination_pregnancyId_fkey" FOREIGN KEY ("pregnancyId") REFERENCES "Pregnancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lactation" ADD CONSTRAINT "Lactation_pregnancyId_fkey" FOREIGN KEY ("pregnancyId") REFERENCES "Pregnancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_pregnancyId_fkey" FOREIGN KEY ("pregnancyId") REFERENCES "Pregnancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disease" ADD CONSTRAINT "Disease_tag_fkey" FOREIGN KEY ("tag") REFERENCES "Animal"("tag") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccination" ADD CONSTRAINT "Vaccination_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milk" ADD CONSTRAINT "Milk_tag_fkey" FOREIGN KEY ("tag") REFERENCES "Animal"("tag") ON DELETE CASCADE ON UPDATE CASCADE;
