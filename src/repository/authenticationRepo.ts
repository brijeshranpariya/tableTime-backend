import jwt from "jsonwebtoken";
export const verifyToken = (token: string) => {
  const secretKey = process.env.JWT_SECRET;
  if (secretKey) {
    try {
      const result = jwt.verify(token, secretKey);
      return { success: true, data: result };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Token verification failed", error);
        return { success: false, err: error.message };
      } else {
        console.log("An unknown error occurred");
        return { success: false, err: "An unknown error occurred" };
      }
    }
  } else {
    console.log("no secret key available");
  }
};
