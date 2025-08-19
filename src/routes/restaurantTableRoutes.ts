import { Router } from "express";
import { getAvailableTableByIdService } from "../service/restaurantTableService.js";
const router = Router();
router.get("/:id", getAvailableTableByIdService);
export default router;
