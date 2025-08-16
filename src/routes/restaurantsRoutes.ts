import { Router } from "express";
import {
  getRestaurantDetailService,
  listRestaurantService,
} from "../service/restaurantService.js";
const router = Router();
router.get("/", listRestaurantService);
router.get("/:id", getRestaurantDetailService);
export default router;
