import { requireSession } from "@/lib/session";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  await requireSession();
  return (
    <>
      <h1 className="a-h1">New project</h1>
      <p className="a-sub">Add a development to your project listings.</p>
      <ProjectForm />
    </>
  );
}
