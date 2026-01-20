/*
  Warnings:

  - You are about to drop the `story_cards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "story_cards" DROP CONSTRAINT "story_cards_restaurantId_fkey";

-- DropTable
DROP TABLE "story_cards";
