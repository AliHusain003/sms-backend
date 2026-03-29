import { gql } from 'apollo-server-express';

export const employeeResponse = gql`
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
`;
