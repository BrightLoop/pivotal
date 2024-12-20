import express from 'express';
import passport from '../config/githubAuth.js';
import authController from '../controllers/authController.js';

const router = express.Router();

// GitHub login
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback
router.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    authController.githubCallback
);

export default router;
