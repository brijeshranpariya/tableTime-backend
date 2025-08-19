import { Request, Response } from "express";
import { STATUS_CODE } from "../enums/enums.js";
import { getAvailableTableById } from "../repository/restaurantTableRepo.js";

export const getAvailableTableByIdService = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Invalid request. Please provide a valid restaurant.",
      });
    }
    const result = await getAvailableTableById(id);
    res
      .status(STATUS_CODE.SUCCESS)
      .json({
        message: "Available details fetched successfully!",
        tableDetails: result,
      });
  } catch (err) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERR)
      .json("Failed to fetch table details.");
  }
};
