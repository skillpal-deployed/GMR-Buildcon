export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export const metadata = { robots: { index: false, follow: false } };

function host(u: string): string {
  const m = u.match(/@([^/?]+)/);
  return m ? m[1] : "(no host parsed)";
}

export default async function DbCheck() {
  const dbUrl = process.env.DATABASE_URL || "";
  const directUrl = process.env.DIRECT_URL || "";

  let dbResult: string;
  try {
    const [projects, posts, users] = await Promise.all([
      prisma.project.count(),
      prisma.post.count(),
      prisma.user.count(),
    ]);
    dbResult = `CONNECTED OK -> projects: ${projects}, posts: ${posts}, users: ${users}`;
  } catch (e) {
    const err = e as { message?: string; name?: string; code?: string };
    dbResult = `DB ERROR\n  name: ${err?.name}\n  code: ${err?.code}\n  message: ${err?.message}`;
  }

  const report = [
    "=== GMR DB diagnostic ===",
    `DATABASE_URL present: ${dbUrl ? "yes" : "NO"}   host: ${dbUrl ? host(dbUrl) : "-"}`,
    `DIRECT_URL present:   ${directUrl ? "yes" : "NO"}   host: ${directUrl ? host(directUrl) : "-"}`,
    `JWT_SECRET present:   ${process.env.JWT_SECRET ? "yes" : "NO"}`,
    "",
    dbResult,
  ].join("\n");

  return (
    <pre style={{ padding: 24, whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: 14 }}>
      {report}
    </pre>
  );
}
