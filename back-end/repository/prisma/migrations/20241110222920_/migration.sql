/*
  Warnings:

  - You are about to drop the column `numerOfTables` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `roundNumber` on the `Table` table. All the data in the column will be lost.
  - Added the required column `numberOfTables` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Round" DROP COLUMN "numerOfTables",
ADD COLUMN     "numberOfTables" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "roundNumber";
