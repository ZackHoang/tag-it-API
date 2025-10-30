/*
  Warnings:

  - You are about to drop the column `char1` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `char2` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `char3` on the `games` table. All the data in the column will be lost.
  - Added the required column `characters` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "char1",
DROP COLUMN "char2",
DROP COLUMN "char3",
ADD COLUMN     "characters" JSONB NOT NULL;
