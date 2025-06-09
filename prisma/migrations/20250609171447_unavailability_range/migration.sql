/*
  Warnings:

  - You are about to drop the column `date` on the `Unavailability` table. All the data in the column will be lost.
  - Added the required column `dateFrom` to the `Unavailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTo` to the `Unavailability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Unavailability" DROP COLUMN "date",
ADD COLUMN     "dateFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateTo" TIMESTAMP(3) NOT NULL;
