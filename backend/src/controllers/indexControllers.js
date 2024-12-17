import httpStatusCodes from "../utils/httpStatusCodes.js";

const getHome = (req, res) => {
    const locals = { title: "Home | Pivotal" };
    return res.status(httpStatusCodes.OK).render("home", {
        locals,
    });
};

export default {
    getHome,
};