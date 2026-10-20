// Company details — single source of truth (ported from gmr_info() in functions.php).

export const site = {
  name: "GMR Buildcon",
  tagline: "Real Estate",
  phone: "+91 9660637969",
  phoneLink: "+919660637969",
  email: "info@gmrbuildcon.com",
  address: "Plot No. F-7, Nilay Kunj, Jagatpura, Jaipur (Raj.)",
  brochure:
    "https://drive.google.com/uc?export=download&id=1mvYolF4qDwva3NdZXIPZkH1SuMPEc9Bx",
  about:
    "A symbol of trust, quality, and innovation in real estate — crafting thoughtfully designed homes and lifestyle experiences in Jaipur.",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61587108992934",
    instagram: "https://www.instagram.com/gmr.buildcon",
    linkedin: "https://www.linkedin.com/company/gmr-buildcon/",
    youtube: "https://www.youtube.com/@GMRBuildcon-Redwood/shorts",
  },
} as const;

// Stable slug of the flagship project — used for DB-free deep links (footer, etc.).
export const PRIMARY_PROJECT_SLUG = "redwood-utopia";

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
