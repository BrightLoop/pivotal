import jwt from "jsonwebtoken";

import httpStatusCodes from "../utils/httpStatusCodes.js";
import sendResponse from "../utils/sendResponse.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
};

// GitHub Callback
const githubCallback = (req, res) => {
    // `req.user` will be populated by Passport after successful GitHub authentication
    if (!req.user) {
        return sendResponse({
            res,
            statusCode: httpStatusCodes.UNAUTHORIZED,
            success: false,
            message: 'Authentication failed.',
        });
    }

    // Generate JWT for authenticated user
    const token = generateToken(req.user);

    res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "strict",
    });

    // Send token to frontend
    return sendResponse({
      res,
      statusCode: httpStatusCodes.UNAUTHORIZED,
      success: false,
      message: "Authentication failed.",
    });
};

export default {
  githubCallback,
};
