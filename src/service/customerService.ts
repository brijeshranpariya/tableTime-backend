import { Request, Response } from "express";
import { STATUS_CODE } from "../enums/enums.js";
import parsePhoneNumber from "libphonenumber-js";
import { isValidPhoneNumber } from "../utils/helper.js";
import {
  checkCustomerExist,
  customerSignUp,
} from "../repository/customerRepo.js";
export const customerSignUpService = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    if (!isValidPhoneNumber(phoneNumber)) {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: "Enter a valid phone number to continue." });
    }
    
    const { otp, expirationTime } = await customerSignUp(phoneNumber);
    res.status(STATUS_CODE.SUCCESS).json({
      message: "OTP Generated successfully!",
      OTP: otp,
      expiresIn: expirationTime,
    });
  } catch (err) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERR)
      .json({ message: "Failed to Generate the OTP. Please try again." });
  }
};
