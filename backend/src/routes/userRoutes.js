import express from "express";
const router = express.Router();

import userControllers from "../controllers/userControllers.js";

router.route("/login")
    .get(userControllers.getUserLogin)
    .post(userControllers.userLogin);

router.route("/signup")
    .get(userControllers.getUserSignup)
    .post(userControllers.userSignup);

router.get("/logout", userControllers.userLogout);

export default router;