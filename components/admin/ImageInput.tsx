"use client";

import { useState } from "react";

export default function ImageInput({
  label,
  value,
  onChange,
  hint,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string; error?: string };
      if (res.ok && json.ok && json.url) onChange(json.url);
      else setErr(json.error || "Upload failed");
    } catch {
      setErr("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="a-field">
      {label ? (
        <label>
          {label}
          {hint ? <span className="hint"> — {hint}</span> : null}
        </label>
      ) : null}
      <div className="a-image">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="a-thumb" src={value} alt="" />
        ) : null}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/assets/images/… or https://…"
        />
        <label className="a-btn a-btn--ghost a-btn--sm" style={{ cursor: "pointer" }}>
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        </label>
        {value ? (
          <button type="button" className="a-btn a-btn--ghost a-btn--sm" onClick={() => onChange("")}>
            Clear
          </button>
        ) : null}
      </div>
      {err ? (
        <span className="hint" style={{ color: "#b23b26" }}>
          {err}
        </span>
      ) : null}
    </div>
  );
}
