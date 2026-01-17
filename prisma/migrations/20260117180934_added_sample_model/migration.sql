-- CreateEnum
CREATE TYPE "SampleType" AS ENUM ('LOOP', 'ONE_SHOT');

-- CreateTable
CREATE TABLE "Sample" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SampleType" NOT NULL,
    "bpm" INTEGER,
    "key" TEXT,
    "time" DOUBLE PRECISION NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);
