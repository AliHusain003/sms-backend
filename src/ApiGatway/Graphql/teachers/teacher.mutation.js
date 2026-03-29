import { gql } from "apollo-server-express";

export const teacherMutation = gql`
  input CreateTeacherInput {
    # Employee fields
    firstName: String!
    lastName: String!
    mobileNumber: String!
    address: String!
    joiningDate: String!
    salary: Float
    status: String!

    # Teacher specific fields
    qualification: String!
    experience: Int
    gender: String!
    dateOfBirth: String!
  }

  input UpdateTeacherInput {
    firstName: String
    lastName: String
    mobileNumber: String
    address: String
    joiningDate: String
    salary: Float
    status: String

    qualification: String
    experience: Int
    gender: String
    dateOfBirth: String
  }

  extend type Mutation {
    createTeacher(data: CreateTeacherInput!): TeacherResponse!

    updateTeacher(
      teacherId: Int!
      data: UpdateTeacherInput!
    ): TeacherResponse!

    deleteTeacher(teacherId: Int!): TeacherResponse!
  }
`;
