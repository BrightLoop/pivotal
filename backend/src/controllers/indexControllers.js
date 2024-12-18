import httpStatusCodes from "../utils/httpStatusCodes.js";
import sendResponse from "../utils/responseUtils.js";

const getHome = (req, res) => {
    const locals = { title: "Home | Pivotal" };
    
    return sendResponse({
        res,
        statusCode: httpStatusCodes.OK,
        success: true,
        message: "Welcome to Pivotal home.",
        redirectUrl: "/",
        data: locals,
    });
};

export default {
    getHome,
};