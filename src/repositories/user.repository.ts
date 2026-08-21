import { db } from "../config/database";
import { User } from "../models/user.model";

export const userRepository = {
  findByUsername(username: string): User | undefined {
    return db
      .prepare("SELECT * FROM users WHERE username = ?")
      .get(username) as User | undefined;
  },
};
