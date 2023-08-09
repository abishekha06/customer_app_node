/*
  Warnings:

  - The `address` column on the `address_book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "address_book" DROP COLUMN "address",
ADD COLUMN     "address" JSONB;
