/*
  Warnings:

  - You are about to drop the column `round` on the `Game` table. All the data in the column will be lost.
  - Added the required column `roundId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "round",
ADD COLUMN     "roundId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
