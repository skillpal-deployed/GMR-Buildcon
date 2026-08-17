"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageInput from "./ImageInput";

export type PostFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  status: "published" | "draft";
  publishedAt: string; // YYYY-MM-DD
};

const EMPTY: PostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  author: "GMR Buildcon",
  status: "published",
  publishedAt: "",
};

export default function PostForm({
  initial,
  postId,
}: {
  initial?: Partial<PostFormValues>;
  postId?: number;
}) {
  const router = useRouter();
  const [v, setV] = useState<PostFormValues>({ ...EMPTY, ...initial });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof PostFormValues>(k: K, val: PostFormValues[K]) {
    setV((s) => ({ ...s, [k]: val }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const endpoint = postId ? `/api/admin/posts/${postId}` : "/api/admin/posts";
      const payload = { ...v, publishedAt: v.publishedAt || undefined };
      const res = await fetch(endpoint, {
        method: postId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        setError(json.error || "Could not save. Check the fields and try again.");
        setSaving(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form className="a-form a-panel" onSubmit={onSubmit}>
      {error && <div className="a-alert a-alert--error">{error}</div>}

      <div className="a-field">
        <label htmlFor="title">Title *</label>
        <input id="title" type="text" value={v.title} onChange={(e) => set("title", e.target.value)} required />
      </div>

      <div className="a-grid2">
        <div className="a-field">
          <label htmlFor="slug">Slug<span className="hint"> — leave blank to auto-generate</span></label>
          <input id="slug" type="text" value={v.slug} onChange={(e) => set("slug", e.target.value)} />
        </div>
        <div className="a-field">
          <label htmlFor="author">Author</label>
          <input id="author" type="text" value={v.author} onChange={(e) => set("author", e.target.value)} />
        </div>
        <div className="a-field">
          <label htmlFor="status">Status</label>
          <select id="status" value={v.status} onChange={(e) => set("status", e.target.value as PostFormValues["status"])}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className="a-field">
          <label htmlFor="publishedAt">Publish date</label>
          <input id="publishedAt" type="date" value={v.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
        </div>
      </div>

      <ImageInput label="Featured image" value={v.featuredImage} onChange={(val) => set("featuredImage", val)} />

      <div className="a-field">
        <label htmlFor="excerpt">Excerpt<span className="hint"> — short summary for cards & previews</span></label>
        <textarea id="excerpt" value={v.excerpt} onChange={(e) => set("excerpt", e.target.value)} style={{ minHeight: "70px" }} />
      </div>

      <div className="a-field">
        <label htmlFor="content">Content * <span className="hint"> — HTML is supported (paragraphs, headings, links)</span></label>
        <textarea id="content" value={v.content} onChange={(e) => set("content", e.target.value)} required style={{ minHeight: "260px" }} />
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button className="a-btn" type="submit" disabled={saving}>
          {saving ? "Saving…" : postId ? "Save changes" : "Create post"}
        </button>
        <button type="button" className="a-btn a-btn--ghost" onClick={() => router.push("/admin/posts")}>
          Cancel
        </button>
      </div>
    </form>
  );
}
