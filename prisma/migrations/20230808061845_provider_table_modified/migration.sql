/*
  Warnings:

  - You are about to drop the column `chassis_no` on the `provider_details` table. All the data in the column will be lost.
  - You are about to drop the column `engine_no` on the `provider_details` table. All the data in the column will be lost.
  - You are about to drop the column `model_no` on the `provider_details` table. All the data in the column will be lost.
  - You are about to drop the column `owner_name` on the `provider_details` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `provider_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "provider_details" DROP COLUMN "chassis_no",
DROP COLUMN "engine_no",
DROP COLUMN "model_no",
DROP COLUMN "owner_name",
DROP COLUMN "photo";

-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "photo" JSONB;
