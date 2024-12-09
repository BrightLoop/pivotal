import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

// App
const app = express();
const PORT = process.env.APP_PORT;
console.log(PORT);

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Listen
app.listen(PORT, () => {
  console.log("server is running");
});
