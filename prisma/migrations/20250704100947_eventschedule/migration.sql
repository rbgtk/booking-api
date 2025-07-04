/*
  Warnings:

  - You are about to drop the column `experienceId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `serviceId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "experienceId",
DROP COLUMN "scheduleId",
ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "serviceId" INTEGER NOT NULL,
ADD COLUMN     "time" TEXT,
ADD COLUMN     "type" "ScheduleType" NOT NULL,
ADD COLUMN     "weekday" "Weekday";

-- DropTable
DROP TABLE "Experience";

-- DropTable
DROP TABLE "Schedule";

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
