import { Router } from "express";
import {
  resendOtpService,
  verifyOtpService,
} from "../service/otpVerificationService.js";
const router = Router();
router.post("/verifyOtp", verifyOtpService);
router.post("/resend", resendOtpService);
export default router;
