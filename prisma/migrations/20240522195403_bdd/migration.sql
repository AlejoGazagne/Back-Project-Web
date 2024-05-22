/*
  Warnings:

  - Added the required column `datetime` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "datetime" TIMESTAMP(3) NOT NULL;
