import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET: string = process.env.JWT_SECRET || "dev-insecure-secret-change-me";

export const AUTH_COOKIE = "gmr_admin";

export type SessionUser = {
  id: number;
  email: string;
  name: string | null;
  role: string;
};

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(user: SessionUser): string {
  return jwt.sign(user, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    const payload = jwt.verify(token, SECRET) as jwt.JwtPayload;
    return {
      id: Number(payload.id),
      email: String(payload.email),
      name: (payload.name as string | null) ?? null,
      role: String(payload.role ?? "admin"),
    };
  } catch {
    return null;
  }
}

export const cookieOptions = {
  httpOnly: true as const,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};
