// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Import required modules
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

// Initialize the Express application
const app = express();

// CORS middleware
app.use(
    cors({
      origin: "http://localhost:5173/",
      methods: ["GET", "POST"],
      credentials: true,
    })
);

// Middleware to verify JWT token and store the user information in locals
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



// Routes
import indexRoutes from "./routes/indexRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";




// Register the routes
app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/otp", otpRoutes);

// Utility imports
import httpStatusCodes from "./utils/httpStatusCodes.js";
import sendResponse from "./utils/responseUtils.js";

// 404 Middleware
app.use((req, res, next) => {
    const locals = { title: "404 | Page Not Found" };

    return sendResponse({
        res,
        statusCode: httpStatusCodes.NOT_FOUND,
        success: true,
        message: "Page not found.",
        data: locals,
    });
});

// 500 Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    const locals = { title: "500 | Internal Server Error" };
    return sendResponse({
        res,
        statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
        success: true,
        message: "An unexpected error occurred. Please try again later.",
        data: locals,
    });
});

// Start the server and listen on the specified port
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});