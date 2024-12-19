import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

import httpStatusCodes from "../utils/httpStatusCodes.js";
import sendResponse from "../utils/responseUtils.js";

// Renders the user login page.
const getUserLogin = (req, res) => {
    const locals = { title: "User Login | Pivotal" };

    return sendResponse({
        res,
        statusCode: httpStatusCodes.OK,
        success: true,
        message: "Please log in to continue.",
        redirectUrl: "/user/login",
        data: locals,
    });
};

// Handles user login and issues a JWT token.
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
            .select("_id firstName lastName email phoneNumber password")
            .lean();

        if (!user) {
            return sendResponse({
                res,
                statusCode: httpStatusCodes.NOT_FOUND,
                message: "User not found.",
                redirectUrl: "/user/login",
            });
        }

        const isMatchingPassword = await bcrypt.compare(password, user.password);
        if (!isMatchingPassword) {
            return sendResponse({
                res,
                statusCode: httpStatusCodes.BAD_REQUEST,
                message: "Password do not match.",
                redirectUrl: "/user/login",
            });
        }

        const payload = {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "strict",
        });

        return sendResponse({
            res,
            statusCode: httpStatusCodes.OK,
            success: true,
            message: "Login successfull.",
            redirectUrl: "/",
        });
    } catch (error) {
        console.error("An internal error occurred:", error);

        return sendResponse({
            res,
            statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
            message: "An error occurred. Please try again later.",
            redirectUrl: "/user/login",
        });
    }
};

// Renders the user signup page.
const getUserSignup = (req, res) => {
    const locals = { title: "User Signup | Pivotal" };

    return sendResponse({
        res,
        statusCode: httpStatusCodes.OK,
        success: true,
        message: "Please signup to continue.",
        redirectUrl: "/user/signup",
        data: locals,
    });
};

// Handles user signup and creates a new user.
const userSignup = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

    try {
        const isExistingUser = await User.exists({ email });
        if (isExistingUser) {
            return sendResponse({
                res,
                statusCode: httpStatusCodes.BAD_REQUEST,
                message: "Email is used by another account.",
                redirectUrl: "/user/signup",
            });
        }

        if (password !== confirmPassword) {
            return sendResponse({
                res,
                statusCode: httpStatusCodes.BAD_REQUEST,
                message: "Passwords do not match.",
                redirectUrl: "/user/signup",
            });
        }

        await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
        });

        return sendResponse({
            res,
            statusCode: httpStatusCodes.CREATED,
            success: true,
            message: "User registration successfull.",
            redirectUrl: "/user/login",
        });
    } catch (error) {
        console.error("An internal error occurred:", error);

        return sendResponse({
            res,
            statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
            message: "An error occurred. Please try again later.",
            redirectUrl: "/user/signup",
        });
    }
};

// Logs out the user by clearing the authentication token.
const userLogout = (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return sendResponse({
        res,
        statusCode: httpStatusCodes.OK,
        success: true,
        message: "Logged out successfully.",
        redirectUrl: "/user/login",
    });
};

export default {
    getUserLogin,
    userLogin,
    getUserSignup,
    userSignup,
    userLogout,
};