import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return { success: true, decoded };
  } catch (err) {
    return { success: false, err };
  }
};
