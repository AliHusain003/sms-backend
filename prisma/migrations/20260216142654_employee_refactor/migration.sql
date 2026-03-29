/*
  Warnings:

  - The primary key for the `subjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subjectId` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `subjects` table. All the data in the column will be lost.
  - The primary key for the `teachers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `joiningDate` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNumber` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `teachers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeId` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmployeeType" AS ENUM ('TEACHER', 'ACCOUNTANT', 'ADMIN_STAFF', 'PRINCIPAL', 'LIBRARIAN', 'SUPPORT_STAFF');

-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_userId_fkey";

-- AlterTable
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_pkey",
DROP COLUMN "subjectId",
DROP COLUMN "teacherId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "subjects_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_pkey",
DROP COLUMN "address",
DROP COLUMN "firstName",
DROP COLUMN "joiningDate",
DROP COLUMN "lastName",
DROP COLUMN "mobileNumber",
DROP COLUMN "salary",
DROP COLUMN "status",
DROP COLUMN "teacherId",
DROP COLUMN "userId",
ADD COLUMN     "employeeId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "teachers_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teaching_assignments" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "academicYear" TEXT NOT NULL,

    CONSTRAINT "teaching_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "salary" DOUBLE PRECISION,
    "status" TEXT NOT NULL,
    "type" "EmployeeType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountants" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "certification" TEXT,
    "experience" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accountants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_staff" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "department" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teaching_assignments_teacherId_subjectId_sectionId_academic_key" ON "teaching_assignments"("teacherId", "subjectId", "sectionId", "academicYear");

-- CreateIndex
CREATE UNIQUE INDEX "employees_userId_key" ON "employees"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accountants_employeeId_key" ON "accountants"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_staff_employeeId_key" ON "admin_staff"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_employeeId_key" ON "teachers"("employeeId");

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teaching_assignments" ADD CONSTRAINT "teaching_assignments_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teaching_assignments" ADD CONSTRAINT "teaching_assignments_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teaching_assignments" ADD CONSTRAINT "teaching_assignments_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accountants" ADD CONSTRAINT "accountants_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_staff" ADD CONSTRAINT "admin_staff_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
