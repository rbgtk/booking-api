/*
  Warnings:

  - Added the required column `guests` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "guests" INTEGER NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "scheduleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
