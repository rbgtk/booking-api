/*
  Warnings:

  - Changed the type of `weekday` on the `RecurringEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RecurringEvent" DROP COLUMN "weekday",
ADD COLUMN     "weekday" "Weekday" NOT NULL;
