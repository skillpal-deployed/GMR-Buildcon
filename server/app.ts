import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import publicRoutes from "./routes/public";
import adminRoutes from "./routes/admin";

export function createApp() {
  const app = express();

  // Parse JSON bodies — but skip if the platform already parsed them
  // (Vercel's serverless runtime pre-fills req.body; re-reading the consumed
  // stream would otherwise blank it out and break POST endpoints).
  const jsonParser = express.json({ limit: "2mb" });
  app.use((req, res, next) => {
    if (req.body !== undefined && req.body !== null) return next();
    jsonParser(req, res, next);
  });
  app.use(cookieParser());
  // Same-origin in production; reflect origin + allow cookies for local dev proxy.
  app.use(cors({ origin: true, credentials: true }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "gmr-api" });
  });

  app.use("/api/admin", adminRoutes);
  app.use("/api", publicRoutes);

  // JSON 404 for any unmatched API route.
  app.use("/api", (_req, res) => {
    res.status(404).json({ ok: false, error: "Not found" });
  });

  return app;
}
