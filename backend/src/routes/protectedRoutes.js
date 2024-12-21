import express from 'express';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Example of a protected route
router.get('/dashboard', verifyToken, (req, res) => {
    return res.json({
        success: true,
        message: 'Welcome to your dashboard.',
        user: req.user,
    });
});

export default router;
