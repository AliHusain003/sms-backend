import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import server from "./ApiGatway/ApolloServer/apolloServer.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 🔥 ORDER MATTERS
app.use(cookieParser());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server tools and non-browser requests.
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,               // allow cookies
  })
);

app.use(express.json());

const PORT = process.env.PORT || 4000;

async function startServer() {
  await server.start();
  server.applyMiddleware({
    app,
    cors: false, // 🔥 IMPORTANT: disable Apollo's internal CORS
  });

  app.listen(PORT, () => {
    console.log(
      `GraphQL server running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
