import { gql } from "apollo-server-express";

export const employeeMutation = gql`
  input CreateEmployeeInput {
    firstName: String!
    lastName: String!
    mobileNumber: String!
    address: String!
    joiningDate: String!
    salary: Float
    status: String!
    type: EmployeeType!
  }

  input UpdateEmployeeInput {
    firstName: String
    lastName: String
    mobileNumber: String
    address: String
    joiningDate: String
    salary: Float
    status: String
    type: EmployeeType
  }

  extend type Mutation {
    createEmployee(data: CreateEmployeeInput!): EmployeeResponse!

    updateEmployee(
      employeeId: Int!
      data: UpdateEmployeeInput!
    ): EmployeeResponse!

    deleteEmployee(employeeId: Int!): EmployeeResponse!
  }
`;
