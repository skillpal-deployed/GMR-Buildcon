// Vercel serverless entry — the whole Express app behind one function.
// vercel.json rewrites /api/(.*) to this file; Express matches the original path.
import { createApp } from "../server/app";

const app = createApp();

export default app;
