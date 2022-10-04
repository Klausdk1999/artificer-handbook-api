/*
  Warnings:

  - You are about to drop the column `score` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the `CategoriesOnProjects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnProjects" DROP CONSTRAINT "CategoriesOnProjects_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnProjects" DROP CONSTRAINT "CategoriesOnProjects_projectId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "score";

-- DropTable
DROP TABLE "CategoriesOnProjects";

-- DropTable
DROP TABLE "categories";
