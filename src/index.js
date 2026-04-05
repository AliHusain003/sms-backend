import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import server from "./ApiGatway/ApolloServer/apolloServer.js";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const app = express();

app.use(cookieParser());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

let isStarted = false;

async function startServer() {
  if (!isStarted) {
    await server.start();
    server.applyMiddleware({
      app,
      cors: false,
      path: "/graphql", // ✅ explicitly define
    });
    isStarted = true;
  }
}

// 🔥 THIS IS THE FIX
export default async function handler(req, res) {
  await startServer();
  return serverless(app)(req, res);
}