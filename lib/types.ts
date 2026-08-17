// Shapes for the JSON list fields on Project.

export type ListItem = { title: string; description: string };
export type Place = { place: string; distance: string };

export const PROJECT_STATUSES = ["COMPLETED", "ONGOING", "UPCOMING"] as const;
export type ProjectStatusValue = (typeof PROJECT_STATUSES)[number];
