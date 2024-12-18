import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

import httpStatusCodes from "../utils/httpStatusCodes.js";

const getUserLogin = (req, res) => {
    const locals = { title: "User Login | Pivotal" };
    return res.status(httpStatusCodes.OK).json({
        redirectUrl: "/user/login",
        message: "Please log in to continue.",
    });
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
            .select("_id firstName lastName email phoneNumber password")
            .lean();

        if (!user) {
            return res.status(httpStatusCodes.NOT_FOUND).json({
                success: false,
                message: "User not found.",
            });
        }

        const isMatchingPassword = await bcrypt.compare(password, user.password);
        if (!isMatchingPassword) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Password do not match.",
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

        return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Login successfull.",
            redirectUrl: "/",
        });
    } catch (error) {
        console.error("An internal error occurred:", error);

        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred. Please try again later.",
            redirectUrl: "/user/login",
        });
    }
};

const getUserSignup = (req, res) => {
    const locals = { title: "User Signup | Pivotal" };
    return res.status(httpStatusCodes.OK).json({
        redirectUrl: "/user/signup",
        message: "Please signup to continue.",
    });
};

const userSignup = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

    try {
        const isExistingUser = await User.exists({ email });
        if (isExistingUser) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Email already taken.",
            });
        }

        if (password !== confirmPassword) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Passwords do not match.",
            });
        }

        await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
        });

        return res.status(httpStatusCodes.CREATED).json({
            success: true,
            message: "User registration successfull.",
            redirectUrl: "/user/login",
        });
    } catch (error) {
        console.error("An internal error occurred:", error);

        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred. Please try again later.",
            redirectUrl: "/user/signup",
        });
    }
};

const userLogout = (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res.status(httpStatusCodes.OK).json({
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