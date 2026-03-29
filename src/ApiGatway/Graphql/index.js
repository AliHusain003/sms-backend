import { mergeTypeDefs } from "@graphql-tools/merge";

import { rootTypes } from "./rootTypes.js";

import { UserType } from "../Graphql/users/user.typrDef.js";
import { StudentType } from "../Graphql/students/student.typeDef.js";
import { teacherType } from "../Graphql/teachers/teacher.typeDef.js";
import { studentResponses } from "../Graphql/students/student.response.js";
import { teacherResponse } from "../Graphql/teachers/teacher.response.js";
import { AuthResponse } from "./auth/auth.response.js";
import { teacherMutation } from "../Graphql/teachers/teacher.mutation.js";
import { studentMutation } from "../Graphql/students/student.mutation.js";
import { authMutation } from "../Graphql/auth/auth.mutation.js";
// import { teacherResponse } from "../teachers/teacher.response.js";
import { userQuery } from "./users/user.query.js";
import { AuthType } from "./auth/auth.typeDef.js";
import { teacherQuery } from "../Graphql/teachers/teacher.query.js";
import { studentQuery } from "../Graphql/students/student.query.js";
import { SubjectType } from "../Graphql/subjects/subject.typeDef.js";
import { subjectResponse } from "../Graphql/subjects/subject.response.js";
import { subjectQuery } from "../Graphql/subjects/subject.query.js";
import { subjectMutation } from "../Graphql/subjects/subject.mutation.js";
import { userResponse } from "./users/user.response.js";
import { teachingAssignmentType } from "./teachingAssignments/teachingassignment.type.js";
import { employeeType } from "./employees/employee.type.js";
import { employeeQuery } from "./employees/employee.query.js";
import { employeeMutation } from "./employees/employee.mutation.js";
import { employeeResponse } from "./employees/employee.response.js";

const typeDefs = mergeTypeDefs([
  rootTypes,
  UserType,
  userResponse,
  StudentType,
  teacherType,
  studentResponses,
  teachingAssignmentType,
  AuthType,
  employeeType,
  employeeMutation,
  employeeQuery,
  employeeResponse,
  teacherQuery,
  studentQuery,
  AuthResponse,
  teacherMutation,
  studentMutation,
  teacherResponse,
  authMutation,
  SubjectType,
  subjectResponse,
  subjectQuery,
  subjectMutation,
  userQuery,
]);

export default typeDefs;
