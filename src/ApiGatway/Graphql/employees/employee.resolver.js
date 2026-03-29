import prisma from "../../utils/prismaClient.js";
import { success, failed } from "../../utils/response.js";

export const employeeResolvers = {
  Query: {
    employees: async (_parent, args, context) => {
      try {
        console.log("_parent",context)
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
          where: { id: employeeId },
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

        const employee = await prisma.employee.create({
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

        return success("Employee created successfully", employee);
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
