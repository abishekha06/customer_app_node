/*
  Warnings:

  - You are about to drop the column `provd_id` on the `order_details` table. All the data in the column will be lost.
  - You are about to drop the column `veh_type_id` on the `order_details` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_provd_id_fkey";

-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_veh_type_id_fkey";

-- AlterTable
ALTER TABLE "order_details" DROP COLUMN "provd_id",
DROP COLUMN "veh_type_id";

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "provider_id" INTEGER NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
