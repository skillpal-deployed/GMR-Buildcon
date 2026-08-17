import "../server/env";
import { PrismaClient, ProjectStatus, Prisma } from "@prisma/client";
import { hashPassword } from "../server/lib/auth";

const prisma = new PrismaClient();

const IMG = "/assets/images/";

async function ensureAdmin() {
  const email = (process.env.ADMIN_EMAIL || "admin@gmrbuildcon.com").toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`• admin already exists: ${email}`);
    return;
  }
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const passwordHash = await hashPassword(password);
  await prisma.user.create({
    data: { email, name: process.env.ADMIN_NAME || "GMR Admin", passwordHash, role: "admin" },
  });
  console.log(`✓ created admin: ${email}`);
}

async function ensureProject(slug: string, data: Prisma.ProjectCreateInput) {
  const existing = await prisma.project.findUnique({ where: { slug } });
  if (existing) {
    console.log(`• project already exists: ${slug}`);
    return;
  }
  await prisma.project.create({ data });
  console.log(`✓ created project: ${slug}`);
}

async function ensurePost(slug: string, data: Prisma.PostCreateInput) {
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    console.log(`• post already exists: ${slug}`);
    return;
  }
  await prisma.post.create({ data });
  console.log(`✓ created post: ${slug}`);
}

async function seedRedwood() {
  await ensureProject("redwood-utopia", {
    slug: "redwood-utopia",
    title: "Redwood Utopia",
    status: ProjectStatus.ONGOING,
    excerpt: "A thoughtfully planned 2 & 3 BHK low-rise development in Jagatpura, Jaipur.",
    content:
      "Spread across approximately 0.29 acres, Redwood Utopia is a low-density project with just 48 exclusive units — ensuring a more private and peaceful living experience. The development features well-designed 2 & 3 BHK apartments, with smart layouts that maximize space, ventilation, and natural light.",
    location: "Jagatpura, Jaipur",
    tagline:
      "A thoughtfully planned residential development in the fast-growing locality of Jagatpura, Jaipur.",
    units: "~48",
    config: "2 & 3 BHK",
    ptype: "Apartments",
    parking: "48",
    transit: "65",
    map: "Jagatpura, Jaipur, Rajasthan",
    overviewHeading: "Comfort, connectivity & practicality in perfect balance",
    overviewLead:
      "Designed for modern urban living, Redwood Utopia is an ideal choice for both homeowners and investors.",
    configs: [
      {
        title: "2 BHK Apartments",
        description:
          "Efficiently planned two-bedroom homes with spacious living & dining areas, a smart kitchen and utility layout, and balconies for light and ventilation.",
      },
      {
        title: "3 BHK Apartments",
        description:
          "Generous three-bedroom homes designed for privacy and comfort, with well-spaced rooms, ample natural light, and smooth movement across the floor.",
      },
    ],
    floorplanFeatures: [
      "Central lift & staircase core",
      "Well-spaced units for privacy",
      "Efficient use of space",
      "Balconies for light & ventilation",
      "Spacious living & dining areas",
      "Smart kitchen + utility layout",
      "Bedrooms designed for privacy",
      "Smooth movement across the floor",
      "Better natural light & airflow",
      "Less crowding, more comfort",
      "Designed for real family living",
    ],
    amCommunity: [
      {
        title: "Common Areas",
        description:
          "Thoughtfully designed common areas that enhance everyday living, offering residents a comfortable and functional environment for relaxation and interaction.",
      },
      {
        title: "Seamless Access",
        description:
          "Built with a focus on practicality, the project ensures seamless access to daily necessities through efficient planning and reliable infrastructure.",
      },
      {
        title: "Serene Setting",
        description:
          "Surrounded by a calm and well-organized setting, Utopia provides a serene atmosphere ideal for modern urban living.",
      },
    ],
    amInfra: [
      { title: "24x7 Water Supply", description: "Continuous and reliable water availability for a hassle-free lifestyle." },
      { title: "Rainwater Harvesting System", description: "Sustainable infrastructure designed for efficient water management." },
      { title: "Fire Safety Systems", description: "Equipped with essential fire protection measures ensuring resident safety." },
      { title: "Storm Water Drainage", description: "Proper drainage systems to maintain hygiene and prevent waterlogging." },
      { title: "Well-Developed Internal Infrastructure", description: "Smooth internal planning for easy movement and daily convenience." },
      { title: "Power Backup for Common Areas", description: "Ensuring uninterrupted functioning of essential services and common spaces." },
    ],
    amLifestyle: [
      { title: "Clubhouse", description: "Clubhouse with recreational facilities for residents." },
      { title: "Landscaped Gardens", description: "Landscaped gardens and open green spaces throughout." },
      { title: "Children's Play Zone", description: "A safe, dedicated play area for the little ones." },
      { title: "Jogging & Walking Tracks", description: "Tracks woven through the development for an active lifestyle." },
      { title: "24/7 Security", description: "Round-the-clock security and surveillance for peace of mind." },
      { title: "Party / Event Area", description: "A common area for parties, gatherings, and community events." },
    ],
    places: [
      { place: "University / College", distance: "1.0 km" },
      { place: "Hospital", distance: "1.5 km" },
      { place: "Railway Station", distance: "1.0 km" },
      { place: "Bus Station", distance: "1.5 km" },
      { place: "Bank / ATM", distance: "0.3 km" },
      { place: "Airport", distance: "2.0 km" },
      { place: "Children's Parks", distance: "0.3 km" },
    ],
    heroImage: `${IMG}hero-render.png`,
    floorplanImage: `${IMG}floor-plan.png`,
    gallery: [`${IMG}hero-render.png`, `${IMG}photo-1.jpg`, `${IMG}photo-2.jpg`, `${IMG}photo-3.jpg`],
    isSample: false,
    menuOrder: 0,
  });
}

async function seedSamples() {
  const samples: [string, string, ProjectStatus, string, string, string, string][] = [
    // [slug, title, status, location, units, config, heroImage]
    ["maple-residency", "Maple Residency", ProjectStatus.COMPLETED, "Jaipur, Rajasthan", "60", "2 & 3 BHK", `${IMG}photo-2.jpg`],
    ["orchid-court", "Orchid Court", ProjectStatus.COMPLETED, "Jaipur, Rajasthan", "36", "2 BHK", `${IMG}photo-3.jpg`],
    ["skyline-greens", "Skyline Greens", ProjectStatus.UPCOMING, "Jaipur, Rajasthan", "", "", `${IMG}photo-1.jpg`],
    ["green-vista", "Green Vista", ProjectStatus.UPCOMING, "Jaipur, Rajasthan", "", "", `${IMG}photo-3.jpg`],
  ];
  for (const [slug, title, status, location, units, config, hero] of samples) {
    await ensureProject(slug, {
      slug,
      title,
      status,
      location,
      units: units || null,
      config: config || null,
      excerpt: "Example project entry — edit or delete it in the admin dashboard.",
      content:
        "This is an example project entry. Edit it under Projects in the admin dashboard with your real details and photos, or delete it if you do not need it.",
      heroImage: hero,
      isSample: true,
      menuOrder: 0,
    });
  }
}

async function seedPosts() {
  const posts: {
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    body: string;
  }[] = [
    {
      slug: "why-jagatpura-is-jaipurs-fastest-growing-hub",
      title: "Why Jagatpura is Jaipur's fastest-growing residential hub",
      excerpt:
        "From seamless connectivity to everyday conveniences, here's why homebuyers and investors are looking to Jagatpura.",
      image: `${IMG}photo-1.jpg`,
      date: "2026-05-12",
      body:
        "<p>Jagatpura has quietly become one of Jaipur's most sought-after residential corridors. With the airport, railway station, and major educational institutions all within a short drive, it offers the rare combination of connectivity and calm.</p>" +
        "<p>Well-planned infrastructure, green surroundings, and a steady stream of thoughtfully designed developments make it an ideal choice for families and investors alike.</p>" +
        "<p>Projects like Redwood Utopia reflect the area's promise — low-density living, smart layouts, and reliable amenities, all in a location that keeps daily necessities minutes away.</p>",
    },
    {
      slug: "2-bhk-vs-3-bhk-choosing-the-right-home",
      title: "2 BHK vs 3 BHK: choosing the right home for your family",
      excerpt:
        "A practical guide to picking the configuration that fits how your family actually lives — today and tomorrow.",
      image: `${IMG}photo-2.jpg`,
      date: "2026-05-26",
      body:
        "<p>Choosing between a 2 BHK and a 3 BHK is less about square footage and more about how you live. A growing family, the need for a home office, or frequent guests can all tip the balance.</p>" +
        "<p>A well-designed 2 BHK maximizes every corner with smart storage and open living areas. A 3 BHK adds flexibility — a study, a nursery, or simply more breathing room.</p>" +
        "<p>Whichever you choose, prioritise natural light, ventilation, and efficient layouts. These are the details that make a home comfortable for years.</p>",
    },
    {
      slug: "a-first-time-buyers-checklist",
      title: "A first-time buyer's checklist for booking an apartment",
      excerpt:
        "Ten things to verify before you book — from approvals and layouts to amenities and the fine print.",
      image: `${IMG}photo-3.jpg`,
      date: "2026-06-09",
      body:
        "<p>Booking your first home is exciting — and a little overwhelming. A short checklist keeps the process grounded.</p>" +
        "<p>Verify approvals and clear titles, understand the carpet vs built-up area, and walk through the floor plan with ventilation and light in mind. Ask about parking, water supply, power backup, and security.</p>" +
        "<p>Finally, read the payment schedule and possession timeline carefully. A transparent developer will happily answer every question — that trust matters as much as the home itself.</p>",
    },
  ];

  for (const p of posts) {
    await ensurePost(p.slug, {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.body,
      featuredImage: p.image,
      author: "GMR Buildcon",
      status: "published",
      publishedAt: new Date(p.date),
    });
  }
}

async function main() {
  console.log("Seeding GMR Buildcon database…");
  // Always ensure the admin account exists.
  await ensureAdmin();

  // Seed starter content only when the site is empty, so redeploys never
  // resurrect projects/posts the client has deleted.
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await seedRedwood();
    await seedSamples();
  } else {
    console.log(`• ${projectCount} projects already present — skipping project seed`);
  }

  const postCount = await prisma.post.count();
  if (postCount === 0) {
    await seedPosts();
  } else {
    console.log(`• ${postCount} posts already present — skipping post seed`);
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
