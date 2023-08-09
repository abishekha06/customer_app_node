/*
  Warnings:

  - Added the required column `address` to the `address_book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `address_book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `address_book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logitude` to the `address_book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "customer_details_mobile_key";

-- AlterTable
ALTER TABLE "address_book" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "logitude" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customer_details" ALTER COLUMN "mobile" SET DATA TYPE TEXT;
