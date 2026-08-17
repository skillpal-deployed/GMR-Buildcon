import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, AUTH_COOKIE, type SessionUser } from "@/server/lib/auth";

// Reads + verifies the admin session cookie in Next server components.
export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE)?.value;
  return token ? verifyToken(token) : null;
}

// Guards a protected admin page — redirects to /admin/login when signed out.
export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
