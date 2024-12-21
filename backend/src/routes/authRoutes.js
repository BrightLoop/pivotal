import express from "express";
import passport from "../config/githubConfig.js";
import authController from "../controllers/authControllers.js";

const router = express.Router();

// GitHub login
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  authController.githubCallback
);

export default router;
