import type { ListItem, Place } from "./types";

// Split a textarea into trimmed, non-empty lines (ported from gmr_parse_lines).
export function parseLines(text?: string | null): string[] {
  if (!text) return [];
  return text
    .split(/\r\n|\r|\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

// "Title | Description" -> { title, description } (ported from gmr_split_pipe).
export function splitPipe(line: string): ListItem {
  const parts = line.split("|");
  return {
    title: (parts[0] ?? "").trim(),
    description: (parts.slice(1).join("|") ?? "").trim(),
  };
}

// "Place | Distance" -> { place, distance }
export function splitPlace(line: string): Place {
  const parts = line.split("|");
  return {
    place: (parts[0] ?? "").trim(),
    distance: (parts.slice(1).join("|") ?? "").trim(),
  };
}

// Parse a multi-line "Title | Description" textarea into ListItem[].
export function parsePipeLines(text?: string | null): ListItem[] {
  return parseLines(text).map(splitPipe);
}

// Parse a multi-line "Place | Distance" textarea into Place[].
export function parsePlaceLines(text?: string | null): Place[] {
  return parseLines(text).map(splitPlace);
}
