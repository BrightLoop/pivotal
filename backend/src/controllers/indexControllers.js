import httpStatusCodes from "../utils/httpStatusCodes.js";

const getHome = (req, res) => {
    const locals = { title: "Home | Pivotal" };
    return res.status(httpStatusCodes.OK).json({
        message: "Welcome to Pivotal Home.",
        redirectUrl: "/",
    });
};

export default {
    getHome,
};