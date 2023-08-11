-- AlterTable
ALTER TABLE "customer_details" ALTER COLUMN "feedback_average" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "customer_feedback" ALTER COLUMN "average" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "provider_feedback" ALTER COLUMN "average" SET DATA TYPE DOUBLE PRECISION;
