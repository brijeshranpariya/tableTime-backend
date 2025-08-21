import { NextFunction } from "express";
import { Request, Response } from "express";
import { verifyToken } from "../repository/authenticationRepo.js";
declare global {
  namespace Express {
    interface Request {
      user?: {
        phone: string;
        [key: string]: any; // keep it flexible if you have more claims
      };
    }
  }
}

export const authenticationToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      res.status(401).json({
        message: "Sorry! You are not authorized to perform such an action.",
      });
      return;
    }

    const result = verifyToken(token.toString());

    if (!result?.success || !result?.decoded) {
      res.status(403).json({ error: result?.err || "Invalid token" });
      return;
    }
    const phone = result.decoded.phone;
    const id = result.decoded.id;
    req.user = { phone, id };

    console.log("Token verified successfully, phone:", phone);
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
