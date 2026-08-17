import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("A valid email is required"),
  phone: z.string().trim().min(1, "Phone is required"),
  interest: z.string().trim().optional().default(""),
  message: z.string().trim().optional().default(""),
  hp: z.string().optional(), // honeypot
});

const listItem = z.object({
  title: z.string().trim().default(""),
  description: z.string().trim().default(""),
});

const place = z.object({
  place: z.string().trim().default(""),
  distance: z.string().trim().default(""),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().optional(),
  status: z.enum(["COMPLETED", "ONGOING", "UPCOMING"]).default("UPCOMING"),
  excerpt: z.string().optional().default(""),
  content: z.string().optional().default(""),
  location: z.string().optional().default(""),
  tagline: z.string().optional().default(""),
  units: z.string().optional().default(""),
  config: z.string().optional().default(""),
  ptype: z.string().optional().default(""),
  parking: z.string().optional().default(""),
  transit: z.string().optional().default(""),
  map: z.string().optional().default(""),
  overviewHeading: z.string().optional().default(""),
  overviewLead: z.string().optional().default(""),
  brochure: z.string().optional().default(""),
  configs: z.array(listItem).optional().default([]),
  floorplanFeatures: z.array(z.string()).optional().default([]),
  amCommunity: z.array(listItem).optional().default([]),
  amInfra: z.array(listItem).optional().default([]),
  amLifestyle: z.array(listItem).optional().default([]),
  places: z.array(place).optional().default([]),
  heroImage: z.string().optional().default(""),
  floorplanImage: z.string().optional().default(""),
  gallery: z.array(z.string()).optional().default([]),
  isSample: z.boolean().optional().default(false),
  menuOrder: z.number().int().optional().default(0),
});

export const postSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().optional(),
  excerpt: z.string().optional().default(""),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional().default(""),
  author: z.string().optional().default("GMR Buildcon"),
  status: z.enum(["published", "draft"]).optional().default("published"),
  publishedAt: z.string().optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type PostInput = z.infer<typeof postSchema>;
