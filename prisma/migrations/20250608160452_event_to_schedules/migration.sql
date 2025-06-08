/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "scheduleId";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
