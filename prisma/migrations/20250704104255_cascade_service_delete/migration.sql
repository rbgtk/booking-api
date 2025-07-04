/*
  Warnings:

  - Added the required column `summary` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_serviceId_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "summary" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
