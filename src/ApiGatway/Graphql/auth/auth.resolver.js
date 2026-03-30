import { hashPassword, comparePassword } from "../../utils/password.js";
import { createToken } from "../../utils/jwt.js";
import prisma from "../../utils/prismaClient.js";
import { success, failed } from "../../utils/response.js";


export const authResolver = {
  Mutation: {
    signup: async (_parent, args) => {
      const hashedPassword = await hashPassword(args.password);

      const user = await prisma.user.create({
        data: {
          email: args.email,
          name: args.name,
          password: hashedPassword,
          role: args.role,
        },
      });

      const token = createToken(user.id);
      return {
        token,
        user,
      };
      //   return success("Sign-in Successfully", { token, user });
    },
    login: async (_parent, args, context) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });

      if (!user) throw new Error("No user found");

      const valid = await comparePassword(args.password.trim(), user.password);
      if (!valid) throw new Error("Incorrect password");

      const token = createToken(user.id);
      const isProd = process.env.NODE_ENV === "production";

      // 🔥 SET COOKIE
      context.res.cookie("token", token, {
        httpOnly: true,
        path: "/",
        sameSite: isProd ? "none" : "lax",
        secure: isProd,
      });

      return {
        token,
        user,
      };
    },
    logout: async (_parent, _args, context) => {
      const isProd = process.env.NODE_ENV === "production";
      context.res.cookie("token", "", {
        httpOnly: true,
        path: "/",
        sameSite: isProd ? "none" : "lax",
        secure: isProd,
        expires: new Date(0), // 🔥 delete cookie
      });

      return true;
    },
  },
};
