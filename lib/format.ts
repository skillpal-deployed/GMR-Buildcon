// Date formatting to match WordPress's default get_the_date() ("F j, Y").
export function formatDate(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function trimWords(text: string, count: number, more = "…"): string {
  const words = (text || "").trim().split(/\s+/);
  if (words.length <= count) return words.join(" ");
  return words.slice(0, count).join(" ") + more;
}

export function stripHtml(html: string): string {
  return (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Render stored body text as HTML. Passes existing HTML through; otherwise wraps
// blank-line-separated blocks in <p> (a light wpautop, for admin/seeded prose).
export function renderContentHtml(text?: string | null): string {
  const t = (text || "").trim();
  if (!t) return "";
  if (/<[a-z][\s\S]*>/i.test(t)) return t;
  return t
    .split(/\n{2,}/)
    .map((p) => `<p>${p.trim().replace(/\n/g, "<br/>")}</p>`)
    .join("");
}
