import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";
import { verifyToken } from "../utils/jwt";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return next(new ApiError(401, "Token d'authentification manquant"));
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return next(new ApiError(403, "Token invalide ou expiré"));
  }
}
