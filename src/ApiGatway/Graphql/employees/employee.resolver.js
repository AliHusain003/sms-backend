import prisma from "../../utils/prismaClient.js";
import { success, failed } from "../../utils/response.js";

export const employeeResolvers = {
  Query: {
    employees: async (_parent, args, context) => {
      try {
        console.log("_parent", context);
        if (!context.userId) return failed("Not authenticated");

        const page = args.page || 1;
        const limit = args.limit || 10;
        const skip = (page - 1) * limit;

        const employees = await prisma.employee.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        });

        const totalCount = await prisma.employee.count();

        return {
          status: "success",
          message: "Employees fetched successfully",
          data: employees,
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

    employee: async (_parent, { employeeId }, context) => {
      try {
        if (!context.userId) return failed("Not authenticated");

        const employee = await prisma.employee.findUnique({
          where: { id: Number(employeeId) },
          include: {
            teacher: true, // include teacher details if employee is a teacher
          },
        });

        if (!employee) return failed("Employee not found");

        return success("Employee fetched successfully", employee);
      } catch (error) {
        return failed(error.message);
      }
    },
  },

  Mutation: {
    createEmployee: async (_parent, { data }, context) => {
      try {
        if (!context.userId) return failed("Not authenticated");

        const result = await prisma.$transaction(async (tx) => {
          // 1️⃣ Create Employee
          const employee = await tx.employee.create({
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
              mobileNumber: data.mobileNumber,
              address: data.address,
              joiningDate: new Date(data.joiningDate),
              salary: data.salary,
              status: data.status,
              type: data.type,
            },
          });

          // 2️⃣ If TEACHER → create Teacher record
          if (data.type === "TEACHER") {
            await tx.teacher.create({
              data: {
                employeeId: employee.id,

                // ⚠️ you MUST send these from frontend
                qualification: data.qualification || "N/A",
                experience: data.experience || 0,
                gender: data.gender || "UNKNOWN",
                dateOfBirth: data.dateOfBirth
                  ? new Date(data.dateOfBirth)
                  : new Date(),
              },
            });
          }

          // (optional) other types
          if (data.type === "ACCOUNTANT") {
            await tx.accountant.create({
              data: {
                employeeId: employee.id,
              },
            });
          }

          if (data.type === "ADMIN_STAFF") {
            await tx.adminStaff.create({
              data: {
                employeeId: employee.id,
              },
            });
          }

          return employee;
        });

        return success("Employee created successfully", result);
      } catch (error) {
        return failed(error.message);
      }
    },

    updateEmployee: async (_parent, { employeeId, data }, context) => {
      try {
        if (!context.userId) return failed("Not authenticated");

        const employee = await prisma.employee.findUnique({
          where: { id: employeeId },
        });

        if (!employee) return failed("Employee not found");

        const updated = await prisma.employee.update({
          where: { id: employeeId },
          data: {
            ...data,
            joiningDate: data.joiningDate
              ? new Date(data.joiningDate)
              : undefined,
          },
          include: {
            teacher: true, // include teacher details if employee is a teacher
          },
        });

        return success("Employee updated successfully", updated);
      } catch (error) {
        return failed(error.message);
      }
    },

    deleteEmployee: async (_parent, { employeeId }, context) => {
      try {
        if (!context.userId) return failed("Not authenticated");

        await prisma.employee.delete({
          where: { id: employeeId },
        });

        return success("Employee deleted successfully", true);
      } catch (error) {
        return failed(error.message);
      }
    },
  },
};
