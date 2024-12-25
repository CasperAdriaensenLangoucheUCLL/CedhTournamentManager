/*
  Warnings:

  - Added the required column `draws` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `losses` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opponentWinRate` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wins` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "draws" INTEGER NOT NULL,
ADD COLUMN     "losses" INTEGER NOT NULL,
ADD COLUMN     "opponentWinRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "wins" INTEGER NOT NULL;
