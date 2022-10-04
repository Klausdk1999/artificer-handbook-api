/*
  Warnings:

  - You are about to drop the column `categoryId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `dislikes` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_categoryId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "categoryId",
DROP COLUMN "dislikes",
DROP COLUMN "likes",
ADD COLUMN     "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "externalURL" TEXT,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeLink" TEXT;

-- CreateTable
CREATE TABLE "CategoriesOnProjects" (
    "projectId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CategoriesOnProjects_pkey" PRIMARY KEY ("projectId","categoryId")
);

-- CreateTable
CREATE TABLE "medias" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medias_name_key" ON "medias"("name");

-- CreateIndex
CREATE UNIQUE INDEX "projects_title_key" ON "projects"("title");

-- AddForeignKey
ALTER TABLE "CategoriesOnProjects" ADD CONSTRAINT "CategoriesOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProjects" ADD CONSTRAINT "CategoriesOnProjects_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
