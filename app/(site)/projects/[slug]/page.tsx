import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import AmenityGroup from "@/components/AmenityGroup";
import { site } from "@/lib/config";
import { getProjectBySlug, asListItems, asStrings, asPlaces } from "@/lib/data";
import { guessPlaceIcon } from "@/lib/icon-map";
import { renderContentHtml } from "@/lib/format";
import { hasImage } from "@/lib/images";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.tagline || project.excerpt || undefined,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const brochure = project.brochure?.trim() || site.brochure;
  const hero = project.heroImage;
  const floorplan = project.floorplanImage;
  const fpFeats = asStrings(project.floorplanFeatures);
  const configs = asListItems(project.configs);
  const places = asPlaces(project.places);
  const gallery = asStrings(project.gallery);
  const amCommunity = asListItems(project.amCommunity);
  const amInfra = asListItems(project.amInfra);
  const amLifestyle = asListItems(project.amLifestyle);

  const hasAmenities = amCommunity.length > 0 || amInfra.length > 0 || amLifestyle.length > 0;
  const hasLocation = places.length > 0 || !!project.transit || !!project.map;
  const specs = (
    [
      [project.units, "building", "Total Units"],
      [project.config, "home", "Configuration"],
      [project.ptype, "layers", "Project Type"],
      [project.parking, "car", "Parking Slots"],
    ] as [string | null, string, string][]
  ).filter(([v]) => !!v);

  return (
    <article>
      {/* Hero */}
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <nav className="breadcrumb">
              <Link href="/">Home</Link> / <Link href="/projects">Projects</Link> /{" "}
              <span>{project.title}</span>
            </nav>
            <h1>{project.title}</h1>
            {project.tagline ? <p>{project.tagline}</p> : null}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__body reveal">
              <span className="eyebrow">Project Overview</span>
              <h2 className="h-lg">{project.overviewHeading || project.title}</h2>
              {project.overviewLead ? <p className="lead">{project.overviewLead}</p> : null}
              {project.content ? (
                <div
                  className="entry-content"
                  dangerouslySetInnerHTML={{ __html: renderContentHtml(project.content) }}
                />
              ) : null}
              {brochure ? (
                <p style={{ marginTop: "1.5rem" }}>
                  <a
                    className="btn btn--gold"
                    href={brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Brochure <Icon name="download" size={16} />
                  </a>
                </p>
              ) : null}
            </div>
            {hasImage(hero) ? (
              <div className="split__media reveal" data-delay="1">
                <div className="framed framed--wide">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={hero as string} alt={project.title} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Specs */}
      {specs.length > 0 && (
        <section className="section section--cream">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">At a Glance</span>
              <h2 className="h-lg">Project specifications</h2>
            </div>
            <div className="grid spec-grid">
              {specs.map(([val, icon, key], i) => (
                <div className="spec-item reveal" data-delay={i + 1} key={key}>
                  <div className="icon">
                    <Icon name={icon} size={32} />
                  </div>
                  <div className="val">{val}</div>
                  <div className="key">{key}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Configurations */}
      {configs.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">Configurations</span>
              <h2 className="h-lg">Homes designed for real family living</h2>
              <p className="lead">
                Smart layouts that maximize space, ventilation, and natural light.
              </p>
            </div>
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${configs.length > 1 ? 2 : 1},1fr)` }}
            >
              {configs.map((cfg, i) => (
                <div
                  className="amenity-card reveal"
                  data-delay={i + 1}
                  key={i}
                  style={{ padding: "clamp(2rem,4vw,3rem)" }}
                >
                  <div className="amenity-card__icon">
                    <Icon name={(i + 1) % 2 === 0 ? "building" : "home"} size={28} />
                  </div>
                  <h3 className="h-md" style={{ marginBottom: ".75rem" }}>
                    {cfg.title}
                  </h3>
                  {cfg.description ? <p>{cfg.description}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floor plan */}
      {(hasImage(floorplan) || fpFeats.length > 0) && (
        <section className="section section--cream">
          <div className="container">
            <div className="split">
              {hasImage(floorplan) ? (
                <div className="split__media reveal">
                  <div className="framed framed--wide" style={{ background: "#fff" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={floorplan as string}
                      alt={`${project.title} — floor plan`}
                      style={{ objectFit: "contain", padding: "1rem" }}
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : null}
              <div className="split__body reveal" data-delay="1">
                <span className="eyebrow">Floor Plan Highlights</span>
                <h2 className="h-lg">Designed for light, airflow &amp; privacy</h2>
                {fpFeats.length > 0 && (
                  <ul className="feature-cols" style={{ marginTop: "1.5rem" }}>
                    {fpFeats.map((feat, i) => (
                      <li key={i}>
                        <span className="tick">
                          <Icon name="check" size={16} />
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Amenities */}
      {hasAmenities && (
        <section className="section" id="amenities">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">Amenities &amp; Features</span>
              <h2 className="h-lg">Thoughtfully designed for everyday living</h2>
              <p className="lead">
                A comfortable, functional environment for relaxation and interaction — built with a
                focus on practicality.
              </p>
            </div>
            <AmenityGroup label="Community Spaces" items={amCommunity} />
            <AmenityGroup label="Infrastructure" items={amInfra} />
            <AmenityGroup label="Lifestyle" items={amLifestyle} />
          </div>
        </section>
      )}

      {/* Location */}
      {hasLocation && (
        <section className="section section--cream" id="location">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">Location &amp; Connectivity</span>
              <h2 className="h-lg">Everything within easy reach</h2>
              {project.location ? (
                <p className="lead">{project.location} — daily necessities just minutes away.</p>
              ) : null}
            </div>

            {places.length > 0 && (
              <div className="grid loc-grid">
                {places.map((p, i) => (
                  <div className="loc-card reveal" data-delay={Math.min(i + 1, 4)} key={i}>
                    <div className="loc-card__icon">
                      <Icon name={guessPlaceIcon(p.place)} size={22} />
                    </div>
                    <div>
                      <div className="dist">{p.distance || p.place}</div>
                      {p.distance ? <div className="place">{p.place}</div> : null}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {project.transit ? (
              <div className="reveal" style={{ textAlign: "center" }}>
                <div className="transit-badge">
                  <span className="score">{project.transit}</span>
                  <span className="meta">
                    <strong>Transit Score</strong> Normal Transit
                  </span>
                </div>
              </div>
            ) : null}

            {project.map ? (
              <div className="map-frame reveal" style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
                <iframe
                  title={`${project.title} — ${project.map}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(project.map)}&output=embed`}
                  width="100%"
                  height={420}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            ) : null}

            <p
              className="reveal"
              style={{
                textAlign: "center",
                marginTop: "1.25rem",
                color: "var(--muted)",
                fontSize: ".9rem",
              }}
            >
              <Icon name="pin" size={16} /> {site.address}
            </p>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="section" id="gallery">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">Gallery</span>
              <h2 className="h-lg">A glimpse of {project.title}</h2>
            </div>
            <div className="grid gallery reveal">
              {gallery.map((url, i) => {
                const cls = i === 0 ? "wide tall" : i === 3 ? "wide" : "";
                return (
                  <div className={`gallery__item ${cls}`.trim()} key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={project.title} loading="lazy" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section section--tight">
        <div className="container">
          <div className="cta-banner reveal">
            {hasImage(hero) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="cta-banner__bg" src={hero as string} alt="" aria-hidden="true" loading="lazy" />
            ) : null}
            <h2>Book your visit to {project.title}</h2>
            <p>See the homes, the amenities, and the neighbourhood for yourself.</p>
            <div className="cta-banner__actions">
              <Link className="btn btn--gold" href="/contact">
                Schedule a Tour <Icon name="arrow" size={16} />
              </Link>
              {hasAmenities ? (
                <a className="btn btn--ghost-light" href="#amenities">
                  View Amenities
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
