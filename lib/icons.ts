// Inline SVG icon library (ported verbatim from gmr_icon() in functions.php).
// Each value is the inner markup of a 24x24, stroke="currentColor" icon.

export const ICON_PATHS: Record<string, string> = {
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  download:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  star: '<path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 9.5l6.9-.6L12 2z"/>',
  drop: '<path d="M12 2.7s6 6.5 6 10.8a6 6 0 0 1-12 0c0-4.3 6-10.8 6-10.8z"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 8-11 16-11 0 8-5 16-11 16z"/><path d="M4 20c4-3 7-6 9-9"/>',
  flame:
    '<path d="M12 2c2 4-2 5-2 8a4 4 0 0 0 8 0c0-1-1-2-1-3 2 1 3 3 3 6a8 8 0 0 1-16 0c0-5 5-7 5-11 1 0 2 1 3 1z"/>',
  waves:
    '<path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
  road: '<path d="M4 19 8 5"/><path d="M20 19 16 5"/><path d="M12 6v2"/><path d="M12 11v2"/><path d="M12 16v2"/>',
  bolt: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/>',
  tree: '<path d="M12 2 6 10h3l-4 6h5v6h4v-6h5l-4-6h3z"/>',
  play: '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/>',
  run: '<circle cx="13" cy="5" r="2"/><path d="M7 21l3-6 3 2 1 4"/><path d="m10 15-2-4 5-2 3 3h3"/>',
  cctv: '<path d="M3 7l15-4 1.5 4L4.5 11 3 7z"/><path d="M4 11v4a2 2 0 0 0 2 2h4"/><circle cx="14" cy="18" r="2"/>',
  sparkle: '<path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18"/>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5"/>',
  cross: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>',
  train:
    '<rect x="5" y="3" width="14" height="13" rx="3"/><path d="M9 16l-2 4M15 16l2 4M8 9h8"/><circle cx="8.5" cy="13" r="1"/><circle cx="15.5" cy="13" r="1"/>',
  bus: '<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M7 17v3M17 17v3"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/>',
  bank: '<path d="M3 10 12 4l9 6"/><path d="M5 10v8M19 10v8M9 10v8M15 10v8M3 21h18"/>',
  plane:
    '<path d="M17.8 19.2 16 11l5-5c1-1 1-2 .5-2.5S20 3 19 4l-5 5-8.2-1.8c-.5-.1-.9 0-1.2.3l-.7.7 6 3.2-3 3-2-.5-.8.8 3 1.5L9.3 22l.8-.8.5-2 3-3 3.2 6 .7-.7c.3-.3.4-.7.3-1.2z"/>',
  park: '<path d="M12 2a5 5 0 0 0-5 5c0 3 5 8 5 8s5-5 5-8a5 5 0 0 0-5-5z"/><path d="M5 21h14"/>',
  facebook:
    '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram:
    '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>',
  linkedin:
    '<rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 13v4"/>',
  youtube:
    '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3V9z" fill="currentColor" stroke="none"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  building:
    '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
  car: '<path d="M5 13l1.5-5h11L19 13M5 13h14v5H5zM5 13l-2 0M19 13h2"/><circle cx="8" cy="18" r="1.5"/><circle cx="16" cy="18" r="1.5"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16 8-2 6-6 2 2-6 6-2z"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
};
