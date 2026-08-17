import Link from "next/link";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminPosts() {
  await requireSession();
  const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <>
      <div className="a-toolbar">
        <h1 className="a-h1" style={{ marginBottom: 0 }}>
          Blog posts
        </h1>
        <div className="a-toolbar__spacer" />
        <Link className="a-btn" href="/admin/posts/new">
          + New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="a-empty">No posts yet. Write your first one.</div>
      ) : (
        <table className="a-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.title}</strong>
                  <br />
                  <span className="a-muted" style={{ fontSize: ".8rem" }}>/{p.slug}</span>
                </td>
                <td>
                  <span className={`a-pill a-pill--${p.status === "draft" ? "draft" : "published"}`}>
                    {p.status === "draft" ? "Draft" : "Published"}
                  </span>
                </td>
                <td>{formatDate(p.publishedAt)}</td>
                <td>
                  <div className="row-actions">
                    <Link className="a-btn a-btn--ghost a-btn--sm" href={`/admin/posts/${p.id}`}>
                      Edit
                    </Link>
                    <a
                      className="a-btn a-btn--ghost a-btn--sm"
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                    <DeleteButton endpoint={`/api/admin/posts/${p.id}`} confirmText={`Delete "${p.title}"?`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
