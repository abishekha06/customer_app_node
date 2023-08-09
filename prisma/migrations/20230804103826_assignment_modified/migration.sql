/*
  Warnings:

  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_provider_id_fkey";

-- DropTable
DROP TABLE "Assignment";

-- CreateTable
CREATE TABLE "assignment" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "provider_id" INTEGER NOT NULL,

    CONSTRAINT "assignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
