import type { Request, Response, NextFunction } from "express";
import { verifyToken, AUTH_COOKIE, type SessionUser } from "../lib/auth";

export interface AuthedRequest extends Request {
  user?: SessionUser;
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.[AUTH_COOKIE];
  const user = token ? verifyToken(token) : null;
  if (!user) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
    return;
  }
  req.user = user;
  next();
}
