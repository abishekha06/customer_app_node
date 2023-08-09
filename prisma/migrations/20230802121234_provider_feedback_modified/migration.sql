/*
  Warnings:

  - Added the required column `param1` to the `customer_feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `param2` to the `customer_feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `param3` to the `customer_feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `param4` to the `customer_feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remark` to the `customer_feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `provider_response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_id` to the `provider_response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer_feedback" ADD COLUMN     "param1" TEXT NOT NULL,
ADD COLUMN     "param2" TEXT NOT NULL,
ADD COLUMN     "param3" TEXT NOT NULL,
ADD COLUMN     "param4" TEXT NOT NULL,
ADD COLUMN     "remark" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "provider_response" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "provider_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "provider_response" ADD CONSTRAINT "provider_response_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
