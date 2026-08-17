// Image helpers. Projects/posts store image URLs (absolute or /assets/... paths).

export const FALLBACK_HERO = "/assets/images/hero-render.png";

export function imageOr(url: string | null | undefined, fallback = ""): string {
  return url && url.trim() ? url : fallback;
}

export function hasImage(url: string | null | undefined): boolean {
  return !!(url && url.trim());
}
