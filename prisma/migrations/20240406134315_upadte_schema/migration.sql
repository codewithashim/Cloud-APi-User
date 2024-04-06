/*
  Warnings:

  - You are about to drop the column `cityId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_cityId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "cityId",
ADD COLUMN     "city" TEXT NOT NULL;

-- DropTable
DROP TABLE "City";
