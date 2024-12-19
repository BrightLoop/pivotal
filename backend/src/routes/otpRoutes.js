import express from "express";
const router = express.Router();

import otpControllers from "../controllers/otpControllers.js";

router.get("/verify", otpControllers.getOtpPage);

export default router;