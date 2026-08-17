import { Router } from "express";
import { ProjectStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getPosts, getProjectBySlug } from "../../lib/data";
import { contactSchema } from "../lib/validators";
import { sendContactEmail } from "../lib/mailer";

const router = Router();

/* ---- Projects ---- */
router.get("/projects", async (req, res) => {
  const raw = typeof req.query.status === "string" ? req.query.status.toUpperCase() : "";
  const valid = (["COMPLETED", "ONGOING", "UPCOMING"] as string[]).includes(raw);
  const projects = await prisma.project.findMany({
    where: valid ? { status: raw as ProjectStatus } : {},
    orderBy: [{ menuOrder: "asc" }, { createdAt: "desc" }],
  });
  res.json({ ok: true, projects });
});

router.get("/projects/:slug", async (req, res) => {
  const project = await getProjectBySlug(req.params.slug);
  if (!project) {
    res.status(404).json({ ok: false, error: "Not found" });
    return;
  }
  res.json({ ok: true, project });
});

/* ---- Posts ---- */
router.get("/posts", async (req, res) => {
  const page = Math.max(1, parseInt(String(req.query.page || "1"), 10) || 1);
  const data = await getPosts(page);
  res.json({ ok: true, ...data });
});

router.get("/posts/:slug", async (req, res) => {
  const post = await prisma.post.findUnique({ where: { slug: req.params.slug } });
  if (!post || post.status !== "published") {
    res.status(404).json({ ok: false, error: "Not found" });
    return;
  }
  res.json({ ok: true, post });
});

/* ---- Contact (ported from gmr_handle_contact) ---- */
router.post("/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message || "Invalid input" });
    return;
  }
  const { hp, name, email, phone, interest, message } = parsed.data;

  // Honeypot — bots fill this hidden field; pretend success.
  if (hp && hp.trim()) {
    res.json({ ok: true });
    return;
  }

  try {
    await prisma.contactSubmission.create({
      data: { name, email, phone, interest: interest || null, message: message || null },
    });
  } catch (err) {
    console.error("[contact] save failed:", err);
    res.status(500).json({ ok: false, error: "Could not save your message. Please try again." });
    return;
  }

  await sendContactEmail({ name, email, phone, interest: interest || "", message: message || "" });
  res.json({ ok: true });
});

export default router;
