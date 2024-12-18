const sendResponse = (res, {
    statusCode,
    success = false,
    message = null,
    redirectUrl = null,
    data = null,
}) => {
    return res.status(statusCode).json({
        success,
        message,
        redirectUrl,
        data,
    });
};

export default sendResponse;