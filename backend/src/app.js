// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

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

app.use((req, res, next) => {
    const token = req.cookies.authToken;

    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            res.locals.isLoggedIn = true;
            res.locals.username = `${decodedToken.firstName} ${decodedToken.lastName}`.trim();
        } catch (error) {
            console.error("Invalid token:", error.message);

            res.locals.isLoggedIn = false;
            res.locals.username = null;
        }
    } else {
        res.locals.isLoggedIn = false;
        res.locals.username = null;
    }

    next();
});

import indexRoutes from "./routes/indexRoutes";
import userRoutes from "./routes/userRoutes";

app.use("/", indexRoutes);
app.use("/user", userRoutes);

// Listen
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
