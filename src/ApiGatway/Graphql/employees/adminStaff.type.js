import { gql } from "apollo-server-express";

export const adminStaffType = gql`
  type AdminStaff {
    id: ID!
    employee: Employee!

    department: String

    createdAt: String!
    updatedAt: String!
  }
`;
