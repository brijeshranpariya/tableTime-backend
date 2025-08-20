import { Router } from "express";
import customerRoutes from "./customerRoutes.js";
import favoriteRoutes from "./favoriteRoutes.js";
import menuItemsRoutes from "./menuItemsRoutes.js";
import orderItemsRoutes from "./orderItemsRoutes.js";
import otpVerificationRoutes from "./otpVerificationRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import reservationRoutes from "./reservationRoutes.js";
import restaurantTableRoutes from "./restaurantTableRoutes.js";
import restaurantsRoutes from "./restaurantsRoutes.js";
import { authenticationToken } from "../service/AuthenticationService.js";
const router = Router();
router.use("/customers", customerRoutes);
router.use(
  "/favorite",
  authenticationToken,
  authenticationToken,
  favoriteRoutes
);
router.use("/menu-items", authenticationToken, menuItemsRoutes);
router.use("/order-items", authenticationToken, orderItemsRoutes);
router.use("/orders", authenticationToken, orderItemsRoutes);
router.use("/otp-verification", otpVerificationRoutes);
router.use("/payment", authenticationToken, paymentRoutes);
router.use("/reservation", authenticationToken, reservationRoutes);
router.use("/restaurant-table", authenticationToken, restaurantTableRoutes);
router.use("/restaurants", authenticationToken, restaurantsRoutes);
export default router;
