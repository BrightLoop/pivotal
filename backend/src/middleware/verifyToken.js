import jwt from 'jsonwebtoken';

import httpStatusCodes from "../utils/httpStatusCodes.js";
import sendResponse from "../utils/responseUtils.js";

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return sendResponse({
            res,
            statusCode: httpStatusCodes.UNAUTHORIZED,
            success: false,
            message: "Access denied. Please log in.",
            redirectUrl: "/user/login",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return sendResponse({
                    res,
                    statusCode: httpStatusCodes.UNAUTHORIZED,
                    success: false,
                    message: "Session has expired. Please log in again.",
                    redirectUrl: "/user/login",
                });
            }

            return sendResponse({
                res,
                statusCode: httpStatusCodes.UNAUTHORIZED,
                success: false,
                message: "Invalid token. Please log in again.",
                redirectUrl: "/user/login",
            });
        }

        req.user = decoded;
        next();
    });
};

export default verifyToken;
