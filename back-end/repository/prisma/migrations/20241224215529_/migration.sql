-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_roundId_fkey";

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;
