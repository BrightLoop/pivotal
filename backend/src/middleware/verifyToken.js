import jwt from 'jsonwebtoken';
import httpStatusCodes from 'http-status-codes';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
    if (!token) {
        return res.status(httpStatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Token is missing. Access denied.',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user to request object
        next();
    } catch (err) {
        return res.status(httpStatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid or expired token. Access denied.',
        });
    }
};

export default verifyToken;
