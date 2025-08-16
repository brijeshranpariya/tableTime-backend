import { Router } from "express";
import { fetchMenuItemsByIdService } from "../service/menuItemsService.js";
const router = Router();
router.get("/:id", fetchMenuItemsByIdService);
export default router;
