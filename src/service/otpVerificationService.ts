import { STATUS_CODE } from "../enums/enums.js";
import { Request, Response } from "express";
import { isValidPhoneNumber } from "../utils/helper.js";
import { resendOtp, verifyOtp } from "../repository/otpVarificationRepo.js";
export const verifyOtpService = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, OTP } = req.body;
    if (!isValidPhoneNumber(phoneNumber)) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Enter a valid phone number to continue.",
        verified: false,
      });
    }
    if (String(OTP).trim().length !== 6) {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: "OTP you entered is invalid.", verified: false });
    }
    const { isValid, token } = await verifyOtp(OTP, phoneNumber);
    if (!isValid) {
      res.status(STATUS_CODE.EXPIRED).json({
        messaage: "Your OTP has expired. Please request a new one.",
        verified: false,
      });
    } else {
      res.status(STATUS_CODE.SUCCESS).json({
        message: "OTP verified successfully!",
        verified: true,
        token: token,
      });
    }
  } catch (err) {
    console.log("Error while verifying the OTP:", err);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERR).json({
      message: "Failed to verify the OTP, Please try to register again",
    });
  }
};

export const resendOtpService = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    if (!isValidPhoneNumber(phoneNumber)) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Failed to resend the OTP, Please try again",
      });
    }
    const newOtp = await resendOtp(phoneNumber);
    res
      .status(STATUS_CODE.SUCCESS)
      .json({ message: "OTP Generated successfully!", OTP: newOtp });
  } catch (err) {
    console.log("Error while resending the OTP:", err);
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERR)
      .json({ message: "Failed to resend the OTP, Please try again" });
  }
};
