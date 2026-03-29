import { gql } from "apollo-server-express";

export const accountantType = gql`
  type Accountant {
    id: ID!
    employee: Employee!

    certification: String
    experience: Int

    createdAt: String!
    updatedAt: String!
  }
`;
