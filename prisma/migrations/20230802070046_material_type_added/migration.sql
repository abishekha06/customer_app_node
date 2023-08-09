-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "material_type" TEXT;

-- AlterTable
ALTER TABLE "provider_details" ALTER COLUMN "mobile" SET DATA TYPE BIGINT;
