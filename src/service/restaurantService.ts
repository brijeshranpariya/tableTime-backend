import { Request, Response } from "express";
import { STATUS_CODE } from "../enums/enums.js";
import {
  getRestaurantDetails,
  listRestaurants,
} from "../repository/restaurantsRepo.js";

export const listRestaurantService = async (req: Request, res: Response) => {
  try {
    const restaurantList = await listRestaurants();
    res.status(STATUS_CODE.SUCCESS).json({
      message: "Restaurants details fetched successfully!",
      restaurantList: restaurantList,
    });
  } catch (err) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERR)
      .json({ message: `Failed to fetch restaurant details.` });
  }
};
export const getRestaurantDetailService = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const restaurantDetails = await getRestaurantDetails(id);
    res.status(STATUS_CODE.SUCCESS).json({
      message: "Restaurant details fetched successfully!",
      restaurantDetails: restaurantDetails,
    });
  } catch (err) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERR)
      .json({ message: `Error while fetching restaurant details` });
  }
};
