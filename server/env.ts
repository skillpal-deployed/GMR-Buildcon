// Load .env for standalone / CLI processes (Next.js loads its own env).
// Node 20.12+/22+ ships a built-in env-file loader.
try {
  (process as unknown as { loadEnvFile?: (path?: string) => void }).loadEnvFile?.();
} catch {
  // No .env file present — rely on the real environment.
}

export {};
