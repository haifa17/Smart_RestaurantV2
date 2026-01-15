/*
  Warnings:

  - You are about to drop the column `name` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `menu_items` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `menu_items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurantId,nameEn]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restaurantId,nameFr]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restaurantId,nameAr]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "categories_restaurantId_name_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "name",
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "nameAr" TEXT,
ADD COLUMN     "nameEn" TEXT,
ADD COLUMN     "nameFr" TEXT;

-- AlterTable
ALTER TABLE "menu_items" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "descriptionAr" TEXT,
ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "descriptionFr" TEXT,
ADD COLUMN     "isChefRecommendation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPopular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSpicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVegetarian" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nameAr" TEXT,
ADD COLUMN     "nameEn" TEXT,
ADD COLUMN     "nameFr" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "categories_restaurantId_nameEn_key" ON "categories"("restaurantId", "nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "categories_restaurantId_nameFr_key" ON "categories"("restaurantId", "nameFr");

-- CreateIndex
CREATE UNIQUE INDEX "categories_restaurantId_nameAr_key" ON "categories"("restaurantId", "nameAr");
