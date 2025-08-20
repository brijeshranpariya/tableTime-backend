import { NextFunction } from "express";
import { Request, Response } from "express";
import { verifyToken } from "../repository/authenticationRepo.js";
export const authenticationToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["token"];
    console.log("headers:: ", req.headers);
    console.log("token: ", token);
    if (!token) {
      res.status(401).json({
        message: "Sorry! You are not authorized to perform such an action.",
      });
      return;
    }
    const result = verifyToken(token.toString());
    if (!result?.success) {
      res.status(403).json({ error: result?.err });
      return;
    }

    console.log("Token verified successfully, before next");
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
