import Link from "next/link";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireSession();
  const [projects, posts, submissions] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.contactSubmission.count(),
  ]);

  return (
    <>
      <h1 className="a-h1">Dashboard</h1>
      <p className="a-sub">Manage your website content — projects, blog posts and enquiries.</p>

      <div className="a-cards">
        <Link className="a-card" href="/admin/projects">
          <div className="a-card__num">{projects}</div>
          <div className="a-card__label">Projects</div>
        </Link>
        <Link className="a-card" href="/admin/posts">
          <div className="a-card__num">{posts}</div>
          <div className="a-card__label">Blog posts</div>
        </Link>
        <Link className="a-card" href="/admin/submissions">
          <div className="a-card__num">{submissions}</div>
          <div className="a-card__label">Enquiries</div>
        </Link>
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Link className="a-btn" href="/admin/projects/new">
          + New project
        </Link>
        <Link className="a-btn a-btn--ghost" href="/admin/posts/new">
          + New blog post
        </Link>
      </div>
    </>
  );
}
