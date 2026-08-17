import { prisma } from "./prisma";
import type { Project, Post } from "@prisma/client";
import type { ListItem, Place, ProjectStatusValue } from "./types";
import { STATUS_GROUPS } from "./status";

export type { Project, Post };

/* ---- casting helpers for the JSON list fields ---- */
export function asListItems(v: unknown): ListItem[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => {
      const o = x as Record<string, unknown>;
      return {
        title: String(o?.title ?? "").trim(),
        description: String(o?.description ?? "").trim(),
      };
    })
    .filter((x) => x.title || x.description);
}

export function asStrings(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => String(x ?? "").trim()).filter(Boolean);
}

export function asPlaces(v: unknown): Place[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => {
      const o = x as Record<string, unknown>;
      return {
        place: String(o?.place ?? "").trim(),
        distance: String(o?.distance ?? "").trim(),
      };
    })
    .filter((x) => x.place || x.distance);
}

/* ---- projects ---- */
export async function getProjectsByStatus(status: ProjectStatusValue): Promise<Project[]> {
  return prisma.project.findMany({
    where: { status },
    orderBy: [{ menuOrder: "asc" }, { createdAt: "desc" }],
  });
}

export type StatusGroupData = {
  slug: string;
  label: string;
  tag: string;
  status: ProjectStatusValue;
  projects: Project[];
  hasSample: boolean;
};

export async function getProjectsGrouped(): Promise<StatusGroupData[]> {
  const groups: StatusGroupData[] = [];
  for (const g of STATUS_GROUPS) {
    const projects = await getProjectsByStatus(g.key);
    groups.push({
      slug: g.slug,
      label: g.label,
      tag: g.tag,
      status: g.key,
      projects,
      hasSample: projects.some((p) => p.isSample),
    });
  }
  return groups;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return prisma.project.findUnique({ where: { slug } });
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const rows = await prisma.project.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}

export async function getPrimaryProjectUrl(): Promise<string> {
  const p = await prisma.project.findFirst({
    where: { status: "ONGOING" },
    orderBy: { menuOrder: "asc" },
    select: { slug: true },
  });
  return p ? `/projects/${p.slug}` : "/projects";
}

/* ---- posts (blog) ---- */
export const POSTS_PER_PAGE = 9;

export async function getPosts(
  page = 1,
  perPage = POSTS_PER_PAGE
): Promise<{ posts: Post[]; total: number; totalPages: number; page: number }> {
  const where = { status: "published" };
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.post.count({ where }),
  ]);
  return { posts, total, totalPages: Math.max(1, Math.ceil(total / perPage)), page };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return prisma.post.findUnique({ where: { slug } });
}

export async function getAllPostSlugs(): Promise<string[]> {
  const rows = await prisma.post.findMany({
    where: { status: "published" },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getRecentPosts(limit = 3, excludeId?: number): Promise<Post[]> {
  return prisma.post.findMany({
    where: { status: "published", ...(excludeId ? { id: { not: excludeId } } : {}) },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getAdjacentPosts(post: Post): Promise<{ prev: Post | null; next: Post | null }> {
  const [prev, next] = await Promise.all([
    prisma.post.findFirst({
      where: { status: "published", publishedAt: { lt: post.publishedAt } },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.post.findFirst({
      where: { status: "published", publishedAt: { gt: post.publishedAt } },
      orderBy: { publishedAt: "asc" },
    }),
  ]);
  return { prev, next };
}
