// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Initialize the Express application
const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

import indexRoutes from "./routes/indexRoutes";
import userRoutes from "./routes/userRoutes";

app.use("/", indexRoutes);
app.use("/user", userRoutes);

// Listen
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
