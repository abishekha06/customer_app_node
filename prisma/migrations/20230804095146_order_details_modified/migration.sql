/*
  Warnings:

  - The `products` column on the `order_details` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "order_details" DROP COLUMN "products",
ADD COLUMN     "products" JSONB;
