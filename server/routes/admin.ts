import { Router } from "express";
import slugify from "slugify";
import { ProjectStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { projectSchema, postSchema, type ProjectInput, type PostInput } from "../lib/validators";
import {
  verifyPassword,
  signToken,
  AUTH_COOKIE,
  cookieOptions,
} from "../lib/auth";
import { requireAuth, type AuthedRequest } from "../middleware/auth";
import { upload } from "../lib/storage";

const router = Router();

async function uniqueSlug(
  base: string,
  table: "project" | "post",
  excludeId?: number
): Promise<string> {
  const root = slugify(base, { lower: true, strict: true }) || "item";
  let candidate = root;
  let n = 2;
  for (;;) {
    const existing =
      table === "project"
        ? await prisma.project.findUnique({ where: { slug: candidate }, select: { id: true } })
        : await prisma.post.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!existing || existing.id === excludeId) return candidate;
    candidate = `${root}-${n++}`;
  }
}

function toProjectData(d: ProjectInput, slug: string) {
  return {
    slug,
    title: d.title,
    status: d.status as ProjectStatus,
    excerpt: d.excerpt || null,
    content: d.content || null,
    location: d.location || null,
    tagline: d.tagline || null,
    units: d.units || null,
    config: d.config || null,
    ptype: d.ptype || null,
    parking: d.parking || null,
    transit: d.transit || null,
    map: d.map || null,
    overviewHeading: d.overviewHeading || null,
    overviewLead: d.overviewLead || null,
    brochure: d.brochure || null,
    configs: d.configs,
    floorplanFeatures: d.floorplanFeatures,
    amCommunity: d.amCommunity,
    amInfra: d.amInfra,
    amLifestyle: d.amLifestyle,
    places: d.places,
    heroImage: d.heroImage || null,
    floorplanImage: d.floorplanImage || null,
    gallery: d.gallery,
    isSample: d.isSample ?? false,
    menuOrder: d.menuOrder ?? 0,
  };
}

/* ---- Auth ---- */
router.post("/login", async (req, res) => {
  const email = String(req.body?.email || "").toLowerCase().trim();
  const password = String(req.body?.password || "");
  if (!email || !password) {
    res.status(400).json({ ok: false, error: "Email and password are required" });
    return;
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    res.status(401).json({ ok: false, error: "Invalid email or password" });
    return;
  }
  const token = signToken({ id: user.id, email: user.email, name: user.name, role: user.role });
  res.cookie(AUTH_COOKIE, token, cookieOptions);
  res.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

router.post("/logout", (_req, res) => {
  res.clearCookie(AUTH_COOKIE, { path: "/" });
  res.json({ ok: true });
});

router.get("/me", requireAuth, (req: AuthedRequest, res) => {
  res.json({ ok: true, user: req.user });
});

/* ---- Projects CRUD ---- */
router.get("/projects", requireAuth, async (_req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: [{ status: "asc" }, { menuOrder: "asc" }, { createdAt: "desc" }],
  });
  res.json({ ok: true, projects });
});

router.get("/projects/:id", requireAuth, async (req, res) => {
  const project = await prisma.project.findUnique({ where: { id: Number(req.params.id) } });
  if (!project) {
    res.status(404).json({ ok: false, error: "Not found" });
    return;
  }
  res.json({ ok: true, project });
});

router.post("/projects", requireAuth, async (req, res) => {
  const parsed = projectSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message });
    return;
  }
  const slug = await uniqueSlug(parsed.data.slug || parsed.data.title, "project");
  const project = await prisma.project.create({ data: toProjectData(parsed.data, slug) });
  res.json({ ok: true, project });
});

router.put("/projects/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = projectSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message });
    return;
  }
  const slug = await uniqueSlug(parsed.data.slug || parsed.data.title, "project", id);
  try {
    const project = await prisma.project.update({ where: { id }, data: toProjectData(parsed.data, slug) });
    res.json({ ok: true, project });
  } catch {
    res.status(404).json({ ok: false, error: "Not found" });
  }
});

router.delete("/projects/:id", requireAuth, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: Number(req.params.id) } });
    res.json({ ok: true });
  } catch {
    res.status(404).json({ ok: false, error: "Not found" });
  }
});

/* ---- Posts CRUD ---- */
router.get("/posts", requireAuth, async (_req, res) => {
  const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" } });
  res.json({ ok: true, posts });
});

router.get("/posts/:id", requireAuth, async (req, res) => {
  const post = await prisma.post.findUnique({ where: { id: Number(req.params.id) } });
  if (!post) {
    res.status(404).json({ ok: false, error: "Not found" });
    return;
  }
  res.json({ ok: true, post });
});

router.post("/posts", requireAuth, async (req, res) => {
  const parsed = postSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message });
    return;
  }
  const d: PostInput = parsed.data;
  const slug = await uniqueSlug(d.slug || d.title, "post");
  const post = await prisma.post.create({
    data: {
      slug,
      title: d.title,
      excerpt: d.excerpt || null,
      content: d.content,
      featuredImage: d.featuredImage || null,
      author: d.author || "GMR Buildcon",
      status: d.status || "published",
      publishedAt: d.publishedAt ? new Date(d.publishedAt) : new Date(),
    },
  });
  res.json({ ok: true, post });
});

router.put("/posts/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const parsed = postSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message });
    return;
  }
  const d: PostInput = parsed.data;
  const slug = await uniqueSlug(d.slug || d.title, "post", id);
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        slug,
        title: d.title,
        excerpt: d.excerpt || null,
        content: d.content,
        featuredImage: d.featuredImage || null,
        author: d.author || "GMR Buildcon",
        status: d.status || "published",
        ...(d.publishedAt ? { publishedAt: new Date(d.publishedAt) } : {}),
      },
    });
    res.json({ ok: true, post });
  } catch {
    res.status(404).json({ ok: false, error: "Not found" });
  }
});

router.delete("/posts/:id", requireAuth, async (req, res) => {
  try {
    await prisma.post.delete({ where: { id: Number(req.params.id) } });
    res.json({ ok: true });
  } catch {
    res.status(404).json({ ok: false, error: "Not found" });
  }
});

/* ---- Contact submissions ---- */
router.get("/submissions", requireAuth, async (_req, res) => {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
  });
  res.json({ ok: true, submissions });
});

router.delete("/submissions/:id", requireAuth, async (req, res) => {
  try {
    await prisma.contactSubmission.delete({ where: { id: Number(req.params.id) } });
    res.json({ ok: true });
  } catch {
    res.status(404).json({ ok: false, error: "Not found" });
  }
});

/* ---- Image upload (local disk; see README for cloud/serverless) ---- */
router.post("/upload", requireAuth, upload.single("file"), (req: AuthedRequest, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ ok: false, error: "No image uploaded (images only, max 8MB)." });
    return;
  }
  res.json({ ok: true, url: `/uploads/${file.filename}` });
});

export default router;
