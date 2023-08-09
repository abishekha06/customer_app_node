-- CreateTable
CREATE TABLE "provider_details" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "mobile" INTEGER,
    "type" TEXT,
    "vehicle" JSONB,
    "documents" JSONB,
    "gst" TEXT,
    "password" TEXT,
    "photo" JSONB,

    CONSTRAINT "provider_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" SERIAL NOT NULL,
    "veh_num" TEXT,
    "veh_brand" TEXT,
    "veh_model" TEXT,
    "weight" INTEGER,
    "volume" INTEGER,
    "covered" TEXT,
    "refrigerated" TEXT,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_feedback" (
    "id" SERIAL NOT NULL,
    "provider_id" INTEGER NOT NULL,
    "param1" TEXT,
    "param2" TEXT,
    "param3" TEXT,
    "param4" TEXT,
    "remarks" TEXT,

    CONSTRAINT "provider_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_type" (
    "id" SERIAL NOT NULL,
    "veh_type" TEXT,
    "wght" INTEGER,
    "vol" INTEGER,

    CONSTRAINT "vehicle_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_details" (
    "id" SERIAL NOT NULL,
    "from" TEXT,
    "to" TEXT,
    "order_date" TIMESTAMP(3),
    "products" TEXT,
    "quoted_price" INTEGER,
    "bandwidth" INTEGER,
    "actual_price" INTEGER,
    "provd_id" INTEGER NOT NULL,
    "type" TEXT,
    "veh_type_id" INTEGER NOT NULL,
    "status" TEXT,
    "custmr_id" INTEGER NOT NULL,

    CONSTRAINT "order_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_response" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "provider_response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_details" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "mobile" INTEGER,
    "address" TEXT,
    "password" TEXT,
    "type" TEXT,
    "gst" TEXT,

    CONSTRAINT "customer_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_feedback" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "customer_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address_book" (
    "id" SERIAL NOT NULL,
    "custom_id" INTEGER NOT NULL,

    CONSTRAINT "address_book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" SERIAL NOT NULL,
    "product" TEXT,
    "density" TEXT,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "provider_details_email_key" ON "provider_details"("email");

-- CreateIndex
CREATE UNIQUE INDEX "provider_details_mobile_key" ON "provider_details"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "customer_details_email_key" ON "customer_details"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_details_mobile_key" ON "customer_details"("mobile");

-- AddForeignKey
ALTER TABLE "provider_feedback" ADD CONSTRAINT "provider_feedback_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_provd_id_fkey" FOREIGN KEY ("provd_id") REFERENCES "provider_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_veh_type_id_fkey" FOREIGN KEY ("veh_type_id") REFERENCES "vehicle_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_custmr_id_fkey" FOREIGN KEY ("custmr_id") REFERENCES "customer_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_response" ADD CONSTRAINT "provider_response_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_feedback" ADD CONSTRAINT "customer_feedback_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address_book" ADD CONSTRAINT "address_book_custom_id_fkey" FOREIGN KEY ("custom_id") REFERENCES "customer_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
