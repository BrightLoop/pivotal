import httpStatusCodes from "../utils/httpStatusCodes.js";
import sendResponse from "../utils/responseUtils.js";

// Renders the page to input OTP.
const getOtpPage = (req, res) => {
    const locals = { title: "OTP Page | Pivotal" };
    
    return sendResponse({
        res,
        statusCode: httpStatusCodes.OK,
        success: true,
        message: "Enter OTP for verification.",
        redirectUrl: "/otp/verify",
        data: locals,
    });
};

export default {
    getOtpPage,
};