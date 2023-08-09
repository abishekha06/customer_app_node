/*
  Warnings:

  - The `param1` column on the `customer_feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `param2` column on the `customer_feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `param3` column on the `customer_feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `param4` column on the `customer_feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `remark` column on the `customer_feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `param1` column on the `provider_feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `param2` column on the `provider_feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `param3` column on the `provider_feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `param4` column on the `provider_feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `remarks` column on the `provider_feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "customer_feedback" DROP COLUMN "param1",
ADD COLUMN     "param1" INTEGER,
DROP COLUMN "param2",
ADD COLUMN     "param2" INTEGER,
DROP COLUMN "param3",
ADD COLUMN     "param3" INTEGER,
DROP COLUMN "param4",
ADD COLUMN     "param4" INTEGER,
DROP COLUMN "remark",
ADD COLUMN     "remark" INTEGER;

-- AlterTable
ALTER TABLE "provider_details" ADD COLUMN     "chassis_no" TEXT,
ADD COLUMN     "engine_no" TEXT,
ADD COLUMN     "model_no" TEXT,
ADD COLUMN     "owner_name" TEXT;

-- AlterTable
ALTER TABLE "provider_feedback" DROP COLUMN "param1",
ADD COLUMN     "param1" INTEGER,
DROP COLUMN "param2",
ADD COLUMN     "param2" INTEGER,
DROP COLUMN "param3",
ADD COLUMN     "param3" INTEGER,
DROP COLUMN "param4",
ADD COLUMN     "param4" INTEGER,
DROP COLUMN "remarks",
ADD COLUMN     "remarks" INTEGER;

-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "chassis_num" TEXT,
ADD COLUMN     "engine_num" TEXT,
ADD COLUMN     "ownername" TEXT,
ADD COLUMN     "year_of_make" TEXT;
