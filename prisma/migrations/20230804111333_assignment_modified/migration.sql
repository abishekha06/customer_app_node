/*
  Warnings:

  - Added the required column `bid_id` to the `assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assignment" ADD COLUMN     "bid_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_bid_id_fkey" FOREIGN KEY ("bid_id") REFERENCES "provider_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
