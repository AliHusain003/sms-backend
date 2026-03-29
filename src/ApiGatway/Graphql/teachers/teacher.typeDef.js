import { gql } from "apollo-server-express";


export const teacherType = gql`
  type Teacher {
    id: ID!

    employee: Employee!

    qualification: String!
    experience: Int
    gender: String!
    dateOfBirth: String!

    assignments: [TeachingAssignment!]!

    createdAt: String!
    updatedAt: String!
  }
    
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

`;
