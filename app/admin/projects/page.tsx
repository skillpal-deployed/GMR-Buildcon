import Link from "next/link";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { statusSlug, statusLabel } from "@/lib/status";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  await requireSession();
  const projects = await prisma.project.findMany({
    orderBy: [{ status: "asc" }, { menuOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <div className="a-toolbar">
        <h1 className="a-h1" style={{ marginBottom: 0 }}>
          Projects
        </h1>
        <div className="a-toolbar__spacer" />
        <Link className="a-btn" href="/admin/projects/new">
          + New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="a-empty">No projects yet. Create your first one.</div>
      ) : (
        <table className="a-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong>{p.title}</strong>
                  {p.isSample ? <span className="a-pill a-pill--sample" style={{ marginLeft: ".5rem" }}>Sample</span> : null}
                  <br />
                  <span className="a-muted" style={{ fontSize: ".8rem" }}>/{p.slug}</span>
                </td>
                <td>
                  <span className={`a-pill a-pill--${statusSlug(p.status)}`}>{statusLabel(p.status)}</span>
                </td>
                <td>{p.location || "—"}</td>
                <td>
                  <div className="row-actions">
                    <Link className="a-btn a-btn--ghost a-btn--sm" href={`/admin/projects/${p.id}`}>
                      Edit
                    </Link>
                    <a
                      className="a-btn a-btn--ghost a-btn--sm"
                      href={`/projects/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                    <DeleteButton endpoint={`/api/admin/projects/${p.id}`} confirmText={`Delete "${p.title}"?`} />
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
