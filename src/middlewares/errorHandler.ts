import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[ERREUR] ${req.method} ${req.originalUrl} -`, err.message);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Erreur interne du serveur",
  });
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} introuvable`));
}
