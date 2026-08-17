import multer from "multer";
import path from "node:path";
import fs from "node:fs";

// Local-disk uploads (standalone / Node hosts). Files land in /public/uploads
// and are served by Next at /uploads/<name>. On read-only serverless hosts
// (e.g. Vercel) use a cloud store instead — see README "Image uploads".
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export function ensureUploadDir() {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    ensureUploadDir();
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase()
      .slice(0, 40);
    const rand = Math.random().toString(36).slice(2, 8);
    cb(null, `${base || "image"}-${rand}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, /^image\//.test(file.mimetype));
  },
});
