/*
  Warnings:

  - Added the required column `numerOfTables` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ranked` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "numerOfTables" INTEGER NOT NULL,
ADD COLUMN     "ranked" BOOLEAN NOT NULL;
