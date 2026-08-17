"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  endpoint,
  confirmText = "Delete this item? This cannot be undone.",
  label = "Delete",
  redirectTo,
}: {
  endpoint: string;
  confirmText?: string;
  label?: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (!window.confirm(confirmText)) return;
    setBusy(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (res.ok) {
        if (redirectTo) router.push(redirectTo);
        router.refresh();
      } else {
        alert("Delete failed.");
        setBusy(false);
      }
    } catch {
      alert("Delete failed.");
      setBusy(false);
    }
  }

  return (
    <button type="button" className="a-btn a-btn--danger a-btn--sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : label}
    </button>
  );
}
