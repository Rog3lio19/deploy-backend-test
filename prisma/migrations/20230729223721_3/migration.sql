/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `familiares` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `familiares_key_key` ON `familiares`(`key`);
