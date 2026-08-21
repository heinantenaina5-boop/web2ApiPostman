import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { ApiError } from "../middlewares/ApiError";
import { userRepository } from "../repositories/user.repository";
import { generateToken } from "../utils/jwt";

export function login(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ApiError(400, "Champs requis manquants : username, password"));
  }

  const user = userRepository.findByUsername(username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(new ApiError(401, "Identifiants invalides"));
  }

  const token = generateToken({ id: user.id, username: user.username });

  res.status(200).json({ success: true, data: { token } });
}
