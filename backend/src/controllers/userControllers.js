import bcrypt from "bcrypt";

import User from "../models/userModel.js";

import httpStatusCodes from "../utils/httpStatusCodes.js";

const getUserLogin = (req, res) => {
    const locals = { title: "User Login | Pivotal" };
    return res.status(httpStatusCodes.OK).render("users/login", {
        locals,
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

        return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Login successfull",
        });
    } catch (error) {
        console.error("An internal error occurred:", error);

        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred. Please try again later.",
        });
    }
};

const getUserSignup = (req, res) => {
    const locals = { title: "User Signup | Pivotal" };
    return res.status(httpStatusCodes.OK).render("users/signup", {
        locals,
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
        });
    } catch (error) {
        console.error("An internal error occurred:", error);

        return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "An error occurred. Please try again later.",
        });
    }
};

export default {
    getUserLogin,
    userLogin,
    getUserSignup,
    userSignup,
};