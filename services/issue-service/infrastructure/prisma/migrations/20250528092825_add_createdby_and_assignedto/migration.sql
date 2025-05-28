/*
  Warnings:

  - Added the required column `createdById` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "assignedToId" TEXT,
ADD COLUMN     "createdById" TEXT NOT NULL;
