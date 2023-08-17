/*
  Warnings:

  - Added the required column `altaIMSS` to the `alumnos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `alumnos` ADD COLUMN `altaIMSS` TEXT NOT NULL;
