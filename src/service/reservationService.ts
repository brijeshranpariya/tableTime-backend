import { Request, Response } from "express";
import { STATUS_CODE } from "../enums/enums.js";
import { reserveRestaurant } from "../repository/reservationRepo.js";
import { isValidPhoneNumber } from "../utils/helper.js";
import { statSync } from "fs";

export const reserveRestaurantService = async (req: Request, res: Response) => {
  try {
    const { reservationDetails, registeredPhoneNumber } = req.body;
    if (!isValidPhoneNumber(reservationDetails.phoneNumber)) {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: "Invalid Phone Number" });
    }
    await reserveRestaurant(reservationDetails, registeredPhoneNumber);
    res
      .status(STATUS_CODE.SUCCESS)
      .json({ message: "Table reserved successfully!" });
  } catch (err) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERR)
      .json({ message: "Error while reserving restaurant" });
  }
};
