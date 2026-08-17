import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminSubmissions() {
  await requireSession();
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
  });

  return (
    <>
      <h1 className="a-h1">Enquiries</h1>
      <p className="a-sub">Contact-form submissions from the website.</p>

      {submissions.length === 0 ? (
        <div className="a-empty">No enquiries yet.</div>
      ) : (
        <table className="a-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Interest</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id}>
                <td style={{ whiteSpace: "nowrap" }}>{formatDate(s.createdAt)}</td>
                <td>
                  <strong>{s.name}</strong>
                </td>
                <td>
                  <a href={`mailto:${s.email}`}>{s.email}</a>
                  {s.phone ? (
                    <>
                      <br />
                      <a href={`tel:${s.phone}`} className="a-muted">
                        {s.phone}
                      </a>
                    </>
                  ) : null}
                </td>
                <td>{s.interest || "—"}</td>
                <td style={{ maxWidth: "280px" }}>{s.message || "—"}</td>
                <td>
                  <DeleteButton endpoint={`/api/admin/submissions/${s.id}`} confirmText="Delete this enquiry?" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
