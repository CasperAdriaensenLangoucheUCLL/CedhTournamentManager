-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "draws" DROP NOT NULL,
ALTER COLUMN "draws" SET DEFAULT 0,
ALTER COLUMN "losses" DROP NOT NULL,
ALTER COLUMN "losses" SET DEFAULT 0,
ALTER COLUMN "opponentWinRate" DROP NOT NULL,
ALTER COLUMN "opponentWinRate" SET DEFAULT 0,
ALTER COLUMN "wins" DROP NOT NULL,
ALTER COLUMN "wins" SET DEFAULT 0;
