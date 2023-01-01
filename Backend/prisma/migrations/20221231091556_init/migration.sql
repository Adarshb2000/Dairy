/*
  Warnings:

  - Made the column `number` on table `Delivery` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Delivery` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Delivery` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Examination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `doctor` on table `Examination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isPregnant` on table `Examination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Lactation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `Milk` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE delivery_number_seq;
ALTER TABLE "Delivery" ALTER COLUMN "number" SET NOT NULL,
ALTER COLUMN "number" SET DEFAULT nextval('delivery_number_seq'),
ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL;
ALTER SEQUENCE delivery_number_seq OWNED BY "Delivery"."number";

-- AlterTable
ALTER TABLE "Examination" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "doctor" SET NOT NULL,
ALTER COLUMN "isPregnant" SET NOT NULL;

-- AlterTable
ALTER TABLE "Lactation" ALTER COLUMN "date" SET NOT NULL;

-- AlterTable
ALTER TABLE "Milk" ALTER COLUMN "date" SET NOT NULL;
