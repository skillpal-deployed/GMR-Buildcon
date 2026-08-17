import type { Metadata } from "next";
import "./admin.css";
import { getSession } from "@/lib/session";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    // Login page renders its own full-screen layout.
    return <div className="admin">{children}</div>;
  }

  return (
    <div className="admin">
      <AdminNav user={{ email: session.email, name: session.name }} />
      <div className="admin__main">{children}</div>
    </div>
  );
}
