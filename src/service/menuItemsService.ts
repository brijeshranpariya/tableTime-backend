import { Request, Response } from "express";
import { STATUS_CODE } from "../enums/enums.js";
import { fetchMenuItemsById } from "../repository/menuItemsRepo.js";

export const fetchMenuItemsByIdService = async (
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
    const menuItems = await fetchMenuItemsById(id);
    res.status(STATUS_CODE.SUCCESS).json({
      message: "Menu items fetched successfully!",
      menuItems: menuItems,
    });
  } catch (err) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERR)
      .json({ message: "Failed to fetch the menu." });
  }
};
