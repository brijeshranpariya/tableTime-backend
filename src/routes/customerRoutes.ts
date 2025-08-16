import { Router } from "express";
import { customerSignUpService } from "../service/customerService.js";
const router = Router();

router.post("/sign-up", customerSignUpService);

export default router;
