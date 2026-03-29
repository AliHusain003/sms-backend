import { gql } from "apollo-server-express";

export const employeeType = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    mobileNumber: String!
    address: String!
    joiningDate: String!
    salary: Float
    status: String!
    type: EmployeeType!

    createdAt: String!
    updatedAt: String!
  }

  enum EmployeeType {
    TEACHER
    ACCOUNTANT
    ADMIN_STAFF
    PRINCIPAL
    LIBRARIAN
    SUPPORT_STAFF
  }
`;
