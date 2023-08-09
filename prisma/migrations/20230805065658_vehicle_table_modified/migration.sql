/*
  Warnings:

  - Added the required column `provider_id` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "provider_feedback" ALTER COLUMN "remarks" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "provider_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
