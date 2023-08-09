/*
  Warnings:

  - The `status` column on the `assignment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "assignment" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN;
