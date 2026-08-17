"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS: [string, string][] = [
  ["/admin", "Dashboard"],
  ["/admin/projects", "Projects"],
  ["/admin/posts", "Posts"],
  ["/admin/submissions", "Enquiries"],
];

export default function AdminNav({ user }: { user: { email: string; name: string | null } }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav className="admin-nav">
      <Link className="admin-nav__brand" href="/admin">
        GMR Admin
      </Link>
      <div className="admin-nav__links">
        {LINKS.map(([href, label]) => (
          <Link key={href} href={href} className={isActive(href) ? "active" : ""}>
            {label}
          </Link>
        ))}
      </div>
      <div className="admin-nav__spacer" />
      <a className="admin-nav__view" href="/" target="_blank" rel="noopener noreferrer">
        View site ↗
      </a>
      <span className="admin-nav__user">{user.name || user.email}</span>
      <button className="a-btn a-btn--ghost a-btn--sm" onClick={logout}>
        Log out
      </button>
    </nav>
  );
}
