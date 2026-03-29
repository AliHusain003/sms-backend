import prisma from "../../utils/prismaClient.js";
import { success, failed } from "../../utils/response.js";

export const teacherResolvers = {
  Query: {
    teachers: async (_parent, args, context) => {
      try {
        if (!context.userId) return failed("Not authenticated");

        const page = args.page || 1;
        const limit = args.limit || 10;
        const skip = (page - 1) * limit;

        const teachers = await prisma.teacher.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          include: {
            employee: true,   // IMPORTANT
          },
        });

        const totalCount = await prisma.teacher.count();

        return {
          status: "success",
          message: "Teachers fetched successfully",
          data: teachers,
          pagination: {
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            limit,
          },
        };
      } catch (error) {
        return failed(error.message);
      }
    },

    teacher: async (_parent, args, context) => {
      try {
        if (!context.userId) return failed("Not authenticated");

        const teacher = await prisma.teacher.findUnique({
          where: { id: args.teacherId },
          include: {
            employee: true,
          },
        });

        if (!teacher) return failed("Teacher not found");

        return success("Teacher fetched successfully", teacher);
      } catch (error) {
        return failed(error.message);
      }
    },
  },

  Mutation: {
    createTeacher: async (_parent, { data }, context) => {
      try {
        if (!context.userId) return failed("Not authenticated");

        const result = await prisma.$transaction(async (tx) => {

          // 1️⃣ Create Employee first
          const employee = await tx.employee.create({
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
              mobileNumber: data.mobileNumber,
              address: data.address,
              joiningDate: new Date(data.joiningDate),
              salary: data.salary,
              status: data.status,
              type: "TEACHER",
            },
          });

          // 2️⃣ Create Teacher linked to employee
          const teacher = await tx.teacher.create({
            data: {
              employeeId: employee.id,
              qualification: data.qualification,
              experience: data.experience,
              gender: data.gender,
              dateOfBirth: new Date(data.dateOfBirth),
            },
            include: {
              employee: true,
            },
          });

          return teacher;
        });

        return success("Teacher created successfully", result);
      } catch (error) {
        console.error("CREATE TEACHER ERROR:", error);
        return failed(error.message);
      }
    },

    deleteTeacher: async (_parent, { teacherId }, context) => {
      try {
        if (!context.userId) return failed("Not authenticated");

        await prisma.$transaction(async (tx) => {

          const teacher = await tx.teacher.findUnique({
            where: { id: teacherId },
          });

          if (!teacher) throw new Error("Teacher not found");

          await tx.teacher.delete({
            where: { id: teacherId },
          });

          await tx.employee.delete({
            where: { id: teacher.employeeId },
          });

        });

        return success("Teacher deleted successfully", true);
      } catch (error) {
        return failed(error.message);
      }
    },

    updateTeacher: async (_parent, { teacherId, data }, context) => {
      try {
        if (!context.userId) return failed("Not authenticated");

        const teacher = await prisma.teacher.findUnique({
          where: { id: teacherId },
        });

        if (!teacher) return failed("Teacher not found");

        const updated = await prisma.$transaction(async (tx) => {

          await tx.employee.update({
            where: { id: teacher.employeeId },
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
              mobileNumber: data.mobileNumber,
              address: data.address,
              joiningDate: data.joiningDate
                ? new Date(data.joiningDate)
                : undefined,
              salary: data.salary,
              status: data.status,
            },
          });

          const updatedTeacher = await tx.teacher.update({
            where: { id: teacherId },
            data: {
              qualification: data.qualification,
              experience: data.experience,
              gender: data.gender,
              dateOfBirth: data.dateOfBirth
                ? new Date(data.dateOfBirth)
                : undefined,
            },
            include: {
              employee: true,
            },
          });

          return updatedTeacher;
        });

        return success("Teacher updated successfully", updated);
      } catch (error) {
        return failed(error.message);
      }
    },
  },
};
