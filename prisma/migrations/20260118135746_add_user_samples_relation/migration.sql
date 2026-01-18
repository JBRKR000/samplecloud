/*
  Warnings:

  - Added the required column `userId` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

UPDATE "Sample" SET "userId" = (SELECT id FROM "user" LIMIT 1) WHERE "userId" IS NULL;
-- AlterColumn