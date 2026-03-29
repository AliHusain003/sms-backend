import { gql } from "apollo-server-express";

export const employeeQuery = gql`
  type Pagination {
    totalCount: Int
    currentPage: Int
    totalPages: Int
    limit: Int
  }

  extend type Query {
    employees(page: Int, limit: Int): EmployeesResponse!

    employee(employeeId: ID!): EmployeeResponse!
  }
`;