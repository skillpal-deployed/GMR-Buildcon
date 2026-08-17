import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LoginForm from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="a-login">
      <div className="a-login__card">
        <h1 className="a-login__title">GMR Admin</h1>
        <p className="a-login__sub">Sign in to manage projects, blog posts and enquiries.</p>
        <LoginForm />
      </div>
    </div>
  );
}
