import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import signale from "signale";
import { JWT_SECRET } from "../constants";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  const [_, token] = `${authToken}`.split(" ");

  const secret = `${JWT_SECRET}`;

  try {
    const { sub } = verify(token, secret) as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ errorCode: "token.expired" });
  }
}
