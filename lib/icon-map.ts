// Keyword -> icon-name mapping so content editors never type icon names.
// Ported from gmr_guess_icon() / gmr_guess_place_icon().

const AMENITY_MAP: [string, string][] = [
  ["water", "drop"], ["rain", "leaf"], ["fire", "flame"], ["storm", "waves"],
  ["drain", "waves"], ["infrastruct", "road"], ["internal", "road"], ["road", "road"],
  ["access", "road"], ["power", "bolt"], ["electric", "bolt"], ["backup", "bolt"],
  ["club", "sparkle"], ["common", "sparkle"], ["garden", "tree"], ["landscap", "tree"],
  ["green", "tree"], ["play", "play"], ["child", "play"], ["kid", "play"],
  ["jog", "run"], ["walk", "run"], ["track", "run"], ["security", "cctv"],
  ["surveillanc", "cctv"], ["cctv", "cctv"], ["camera", "cctv"], ["party", "star"],
  ["event", "star"], ["serene", "leaf"], ["setting", "leaf"],
];

const PLACE_MAP: [string, string][] = [
  ["universi", "cap"], ["college", "cap"], ["school", "cap"], ["hospital", "cross"],
  ["clinic", "cross"], ["medical", "cross"], ["railway", "train"], ["train", "train"],
  ["metro", "train"], ["bus", "bus"], ["bank", "bank"], ["atm", "bank"],
  ["airport", "plane"], ["park", "park"],
];

export function guessIcon(label: string, fallback = "sparkle"): string {
  const l = (label || "").toLowerCase();
  for (const [needle, icon] of AMENITY_MAP) {
    if (l.includes(needle)) return icon;
  }
  return fallback;
}

export function guessPlaceIcon(label: string): string {
  const l = (label || "").toLowerCase();
  for (const [needle, icon] of PLACE_MAP) {
    if (l.includes(needle)) return icon;
  }
  return "pin";
}
