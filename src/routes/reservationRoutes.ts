import { Router } from "express";
import { reserveRestaurantService } from "../service/reservationService.js";
const router = Router();
router.post("/", reserveRestaurantService);
export default router;
