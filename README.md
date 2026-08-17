# GMR Buildcon — Next.js + Express + PostgreSQL

A modern full-stack rebuild of the GMR Buildcon website (marketing site + blog + admin CMS),
ported from the original WordPress theme with the **same design and content**.

- **Next.js 15** (App Router, server-rendered) — the public site and the admin UI
- **Express (Node.js)** — the REST API, contact form, and admin CRUD
- **PostgreSQL** via **Prisma** — projects, blog posts, enquiries, admin users
- **JWT-cookie auth** for the admin dashboard

---

## What's included

**Public site** (design-identical to the original):
Home · About · Projects (grouped into Completed / Ongoing / Upcoming) · Project detail
(with Amenities + Location folded in) · Blog (list + post) · Contact (working form).

**Admin dashboard** at `/admin`:
sign-in, create/edit/delete **projects** (every field — specs, configurations, amenities,
nearby places, gallery) and **blog posts**, upload images, and read contact **enquiries**.

**WordPress blog importer** — bring your existing posts across.

---

## Prerequisites

- **Node.js 18+** (developed on Node 24)
- A **PostgreSQL** database — local, or a hosted one (Neon, Vercel Postgres, Supabase, …)

---

## Quick start (local)

```bash
npm install
cp .env.example .env        # then edit .env — at minimum DATABASE_URL, JWT_SECRET, ADMIN_*
npm run db:push             # create the tables
npm run db:seed             # load Redwood Utopia + samples + admin user + sample posts
npm run dev                 # Next.js on :3000  +  Express API on :4000
```

Then open:

- Site → <http://localhost:3000>
- Admin → <http://localhost:3000/admin> (sign in with your `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

> `npm run dev` runs **both** the Next.js app and the Express API together (via `concurrently`).
> In development Next proxies `/api/*` to the Express server on port 4000.

---

## Environment variables

Copy `.env.example` → `.env` and fill in:

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Signs admin session cookies (use a long random value) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | ✅ | Default admin account, created by the seed |
| `CONTACT_TO` | — | Where contact enquiries are emailed |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | — | Email delivery (submissions are always saved to the DB regardless) |
| `API_PORT` | — | Standalone Express port (default 4000) |
| `API_ORIGIN` | — | For split deploys — where the frontend proxies `/api/*` |
| `NEXT_PUBLIC_SITE_URL` | — | Canonical site URL for metadata |

---

## Admin dashboard

- **Projects** — full editor: status, specs, overview, images + gallery, configurations,
  floor-plan highlights, amenities (Community / Infrastructure / Lifestyle), and nearby places.
  Icons are auto-selected from your text, exactly like the original theme.
- **Blog posts** — title, slug, excerpt, HTML content, featured image, author, publish date, draft/published.
- **Enquiries** — every contact-form submission.
- **Images** — click *Upload* (saved to `public/uploads` on local/Node hosts) or paste a URL.

---

## Import your existing WordPress blog posts

1. In WP Admin → **Tools → Export → Posts** and download the `.xml` file.
2. Run:
   ```bash
   npm run import:wxr -- path/to/wordpress-export.xml
   ```

Posts are matched by slug, so existing ones are skipped — the import is safe to re-run.
Featured images referenced by the export are linked automatically.

---

## Project structure

```
app/
  (site)/            Public pages (Home, About, Projects, Blog, Contact) + site chrome
  admin/             Admin dashboard (login, projects, posts, submissions)
  globals.css        The original theme's stylesheet, reused verbatim
  layout.tsx         Root layout (fonts, metadata)
components/          Icon, header/footer, cards, contact form, admin form controls
lib/                 config, data-access (Prisma), parsers, session, formatting
server/              Express app — routes (public + admin), auth, mailer, uploads
  standalone.ts      Runs Express as a normal server (any Node host)
api/index.ts         Runs the same Express app as a Vercel serverless function
prisma/              schema.prisma + seed.ts
scripts/             import-wxr.ts (WordPress importer)
public/assets/       Images + fonts carried over from the theme
```

The public pages read the database directly (fast SSR); **Express** serves the JSON API, the
contact form, and all admin mutations. Both share the same Prisma models and `JWT_SECRET`.

---

## Deployment

You can ship this two ways — the code supports both.

### Option A — everything on Vercel (simplest)

1. Create a Postgres database (**Vercel Postgres** or **Neon**) and copy its connection string.
2. Push this repo to GitHub and **import it into Vercel** (framework auto-detects as Next.js).
3. Set the environment variables in Vercel (`DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD`, and optionally `CONTACT_TO` + `SMTP_*`).
4. The included **`vercel.json`** routes `/api/*` to the Express serverless function (`api/index.ts`).
5. Deploy. Then, once, point at the production database and set it up:
   ```bash
   DATABASE_URL="<prod-connection-string>" npm run db:deploy   # (or db:push)
   DATABASE_URL="<prod-connection-string>" npm run db:seed
   ```
6. **Images:** Vercel's filesystem is read-only, so *Upload* won't persist there — paste image
   URLs in the admin, or add a cloud adapter (see *Image uploads* below).

### Option B — Next.js on Vercel + Express on a Node host

1. Postgres on Neon/Supabase.
2. Deploy the Express server to **Render / Railway / Fly** (start command `npm run start:api`,
   entry `server/standalone.ts`). Set its env (`DATABASE_URL`, `JWT_SECRET`, `ADMIN_*`).
   Note the URL, e.g. `https://gmr-api.onrender.com`.
3. On Vercel (the Next app) set **`API_ORIGIN=https://gmr-api.onrender.com`** so `/api/*` proxies
   there, and remove the `/api` rewrite from `vercel.json` (that one is only for Option A).
4. Run the migrate + seed step against the database (as above).

Both halves share the same database and `JWT_SECRET`, so admin sessions validate everywhere.

---

## Image uploads

- **Local / Node hosts:** files are written to `public/uploads` and served at `/uploads/...`.
- **Serverless (Vercel):** the filesystem is read-only. Either paste image URLs in the admin, or
  add a cloud-storage adapter (Vercel Blob, S3, or Cloudinary) in `server/lib/storage.ts`.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Next.js + Express together (local development) |
| `npm run dev:web` / `npm run dev:api` | Run just one side |
| `npm run build` | `prisma generate` + `next build` |
| `npm run start` | Start the built Next.js app |
| `npm run start:api` | Start the standalone Express API |
| `npm run db:push` | Create/update tables from the schema (no migration history) |
| `npm run db:migrate` / `npm run db:deploy` | Create / apply SQL migrations |
| `npm run db:seed` | Seed content + admin user |
| `npm run db:studio` | Open Prisma Studio (visual DB browser) |
| `npm run import:wxr -- <file.xml>` | Import posts from a WordPress export |
| `npm run typecheck` | TypeScript check |

---

## Notes

- Design and content match the original site 1:1. `app/globals.css` is the theme's original stylesheet.
- The previous WordPress theme and static mirrors remain under `GMR Website/` for reference and are
  **not** part of the build.
