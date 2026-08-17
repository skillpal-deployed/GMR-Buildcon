import type { ProjectStatusValue } from "./types";

// The display order + labels of the three status groups (ported from gmr_status_groups).
export const STATUS_GROUPS: {
  key: ProjectStatusValue;
  slug: string;
  label: string;
  tag: string;
}[] = [
  { key: "COMPLETED", slug: "completed", label: "Completed", tag: "Delivered" },
  { key: "ONGOING", slug: "ongoing", label: "Ongoing", tag: "Selling now" },
  { key: "UPCOMING", slug: "upcoming", label: "Upcoming", tag: "Coming soon" },
];

export function statusLabel(status: ProjectStatusValue): string {
  return STATUS_GROUPS.find((g) => g.key === status)?.label ?? status;
}

export function statusSlug(status: ProjectStatusValue): string {
  return STATUS_GROUPS.find((g) => g.key === status)?.slug ?? status.toLowerCase();
}
