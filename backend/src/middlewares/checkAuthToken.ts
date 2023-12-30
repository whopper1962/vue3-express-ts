import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const checkAuthToken = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { token } = request.cookies;

    if (!token) throw new Error();

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) throw new Error();

    const user = verify(token, jwtSecretKey) as {
      id: string;
      iat: number;
      exp: number;
    };

    request.userId = user.id;
    next();
  } catch {
    request.userId = "";
    response.clearCookie("token");
    return response.status(401).send("Authentication Failed");
  }
};
