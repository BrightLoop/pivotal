const sendResponse = ({ res, statusCode, success, message, data = {}, redirectUrl = null }) => {
    const response = { success, message, data };
    if (redirectUrl) response.redirectUrl = redirectUrl;
    return res.status(statusCode).json(response);
};

export default sendResponse;
