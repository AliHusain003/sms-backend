import { mergeResolvers } from "@graphql-tools/merge";

import { studentResolvers } from "../Graphql/students/student.resolver.js";
import { authResolver } from "../Graphql/auth/auth.resolver.js";
import { userResolver } from "../Graphql/users/user.resolver.js";
import { subjectResolvers } from "./subjects/subject.resolver.js";
import { teacherResolvers } from "./teachers/teacher.resolver.js";
import { employeeResolvers } from "./employees/employee.resolver.js";
export default mergeResolvers([
  studentResolvers,
  authResolver,
  subjectResolvers,
  teacherResolvers,
  employeeResolvers,
  userResolver,
]);
