export interface User {
  id: number;
  username: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  username: string;
}
