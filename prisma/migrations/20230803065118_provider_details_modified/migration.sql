/*
  Warnings:

  - A unique constraint covering the columns `[mobile]` on the table `customer_details` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `provider_details` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mobile` on table `provider_details` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `provider_details` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vehicle` on table `provider_details` required. This step will fail if there are existing NULL values in that column.
  - Made the column `documents` on table `provider_details` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "address_book" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "label" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "logitude" DROP NOT NULL;

-- AlterTable
ALTER TABLE "customer_feedback" ALTER COLUMN "param1" DROP NOT NULL,
ALTER COLUMN "param2" DROP NOT NULL,
ALTER COLUMN "param3" DROP NOT NULL,
ALTER COLUMN "param4" DROP NOT NULL,
ALTER COLUMN "remark" DROP NOT NULL;

-- AlterTable
ALTER TABLE "provider_details" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "mobile" SET NOT NULL,
ALTER COLUMN "mobile" SET DATA TYPE TEXT,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "vehicle" SET NOT NULL,
ALTER COLUMN "documents" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customer_details_mobile_key" ON "customer_details"("mobile");
