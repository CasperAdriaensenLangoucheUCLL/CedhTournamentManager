/*
  Warnings:

  - You are about to drop the column `opponentWinRate` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "opponentWinRate",
ADD COLUMN     "opponentScore" INTEGER DEFAULT 0;
