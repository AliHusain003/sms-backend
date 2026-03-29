import { gql } from "apollo-server-express";

export const employeeQuery = gql`
  type Pagination {
    totalCount: Int
    currentPage: Int
    totalPages: Int
    limit: Int
  }

  type EmployeeResponse {
    status: String!
    message: String!
    data: Employee
  }

  type EmployeesResponse {
    status: String!
    message: String!
    data: [Employee]
    pagination: Pagination
  }

  extend type Query {
    employees(page: Int, limit: Int): EmployeesResponse!

    employee(employeeId: ID!): EmployeeResponse!
  }
`;