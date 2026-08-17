import "../server/env";
import fs from "node:fs";
import path from "node:path";
import { parseStringPromise } from "xml2js";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

// Imports posts from a WordPress export (WXR / .xml file) into Postgres.
// Usage:  npm run import:wxr -- path/to/wordpress-export.xml
//
// Existing posts (matched by slug) are skipped, so it is safe to re-run.

const prisma = new PrismaClient();

/* eslint-disable @typescript-eslint/no-explicit-any */
function first(node: any): any {
  return Array.isArray(node) ? node[0] : node;
}

function text(node: any): string {
  const v = first(node);
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object" && "_" in v) return String(v._ ?? "");
  return String(v);
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: npm run import:wxr -- <path-to-wordpress-export.xml>");
    process.exit(1);
  }
  const abs = path.resolve(file);
  if (!fs.existsSync(abs)) {
    console.error("File not found:", abs);
    process.exit(1);
  }

  const xml = fs.readFileSync(abs, "utf8");
  const parsed = await parseStringPromise(xml, { explicitArray: true, trim: false });
  const channel = parsed?.rss?.channel?.[0];
  if (!channel) {
    console.error("This does not look like a WordPress export (missing rss > channel).");
    process.exit(1);
  }

  const items: any[] = channel.item || [];

  // Map attachment post-id -> URL, to resolve featured images.
  const attachments = new Map<string, string>();
  for (const it of items) {
    if (text(it["wp:post_type"]) === "attachment") {
      const id = text(it["wp:post_id"]);
      const url = text(it["wp:attachment_url"]);
      if (id && url) attachments.set(id, url);
    }
  }

  let created = 0;
  let skipped = 0;

  for (const it of items) {
    if (text(it["wp:post_type"]) !== "post") continue;
    const status = text(it["wp:status"]);
    if (status === "trash" || status === "auto-draft") continue;

    const title = text(it.title) || "Untitled";
    let slug = text(it["wp:post_name"]);
    if (!slug) slug = slugify(title, { lower: true, strict: true }) || `post-${text(it["wp:post_id"]) || created}`;

    const content = text(it["content:encoded"]);
    const excerpt = text(it["excerpt:encoded"]);
    const author = text(it["dc:creator"]) || "GMR Buildcon";
    const dateStr = text(it["wp:post_date_gmt"]) || text(it["wp:post_date"]);
    const publishedAt =
      dateStr && dateStr !== "0000-00-00 00:00:00"
        ? new Date(dateStr.replace(" ", "T") + "Z")
        : new Date();
    const mappedStatus = status === "publish" ? "published" : "draft";

    // Featured image via the _thumbnail_id postmeta.
    let featuredImage: string | null = null;
    const metas: any[] = it["wp:postmeta"] || [];
    for (const m of metas) {
      if (text(m["wp:meta_key"]) === "_thumbnail_id") {
        featuredImage = attachments.get(text(m["wp:meta_value"])) || null;
      }
    }

    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      skipped++;
      console.log(`• skip (already exists): ${slug}`);
      continue;
    }

    await prisma.post.create({
      data: {
        slug,
        title,
        excerpt: excerpt || null,
        content: content || "<p></p>",
        featuredImage,
        author,
        status: mappedStatus,
        publishedAt,
      },
    });
    created++;
    console.log(`✓ imported: ${slug}`);
  }

  console.log(`\nDone. Imported ${created}, skipped ${skipped}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
