import { gql } from "apollo-server-express";

export const teachingAssignmentType = gql`
  type TeachingAssignment {
    id: ID!
    teacher: Teacher!
    subject: Subject!
    section: Section!
    academicYear: String!
  }

  type Subject {
    id: ID!
    name: String!
  }

  type Class {
    id: ID!
    name: String!
  }

  type Section {
    id: ID!
    name: String!
    class: Class!
  }
`;
