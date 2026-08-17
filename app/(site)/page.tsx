import Link from "next/link";
import Icon from "@/components/Icon";
import PostCard from "@/components/PostCard";
import { site } from "@/lib/config";
import { getPrimaryProjectUrl, getRecentPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

const IMG = "/assets/images/";

const homeAmenities: [string, string, string][] = [
  ["drop", "24x7 Water Supply", "Continuous and reliable water availability for a hassle-free lifestyle."],
  ["leaf", "Rainwater Harvesting", "Sustainable infrastructure designed for efficient water management."],
  ["flame", "Fire Safety Systems", "Equipped with essential fire protection measures ensuring resident safety."],
  ["waves", "Storm Water Drainage", "Proper drainage systems to maintain hygiene and prevent waterlogging."],
  ["road", "Internal Infrastructure", "Smooth internal planning for easy movement and daily convenience."],
  ["bolt", "Power Backup", "Uninterrupted functioning of essential services and common spaces."],
];

const homeChips: [string, string][] = [
  ["sparkle", "Clubhouse with recreational facilities"],
  ["tree", "Landscaped gardens & green spaces"],
  ["play", "Children's play zone"],
  ["run", "Jogging & walking tracks"],
  ["cctv", "24/7 security & surveillance"],
  ["star", "Common party / event area"],
];

const homePlaces: [string, string, string][] = [
  ["cap", "1.0 km", "University / College"],
  ["cross", "1.5 km", "Hospital"],
  ["train", "1.0 km", "Railway Station"],
  ["bus", "1.5 km", "Bus Station"],
  ["bank", "0.3 km", "Bank / ATM"],
  ["plane", "2.0 km", "Airport"],
  ["park", "0.3 km", "Children's Parks"],
  ["compass", "65", "Transit Score"],
];

export default async function HomePage() {
  const projectUrl = await getPrimaryProjectUrl();
  const recent = await getRecentPosts(3);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero" id="hero">
        <div className="hero__bg" aria-hidden="true"></div>
        <div className="container container--wide">
          <div className="hero__inner">
            <span className="hero__eyebrow">
              <Icon name="pin" size={16} /> Redwood Utopia &middot; Jagatpura, Jaipur
            </span>
            <h1>
              A Symbol of <em>Trust, Quality</em>
              <br />&amp; Innovation in Real Estate
            </h1>
            <p className="hero__text">
              At the heart of every landmark development is a vision. Our homes are not just
              structures, but lifestyle experiences crafted with precision and care.
            </p>
            <div className="hero__cta">
              <Link className="btn btn--gold" href={projectUrl}>
                Explore Redwood Utopia <Icon name="arrow" size={16} />
              </Link>
              <Link className="btn btn--outline" href="/contact">
                Schedule a Tour
              </Link>
            </div>
          </div>

          <div className="hero__showcase reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMG}hero-render.png`}
              alt="Redwood Utopia — low-rise residential development in Jagatpura, Jaipur"
              width={1916}
              height={739}
              fetchPriority="high"
            />
            <div className="hero__badge">
              <span className="icon">
                <Icon name="building" size={22} />
              </span>
              <span>
                <span className="b-num">48 Exclusive Units</span>
                <span className="b-txt">Low-density living &middot; 0.29 acres</span>
              </span>
            </div>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <div className="num">
                <span data-count="48">48</span>
              </div>
              <div className="label">Exclusive Units</div>
            </div>
            <div className="hero__stat">
              <div className="num">0.29</div>
              <div className="label">Acres Low-Density</div>
            </div>
            <div className="hero__stat">
              <div className="num">2 &amp; 3</div>
              <div className="label">BHK Apartments</div>
            </div>
            <div className="hero__stat">
              <div className="num">Low-Rise</div>
              <div className="label">Private Living</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="section" id="about">
        <div className="container">
          <div className="split">
            <div className="split__media reveal">
              <div className="framed">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${IMG}photo-1.jpg`}
                  alt="Interior of a Redwood Utopia home in Jagatpura, Jaipur"
                  width={1280}
                  height={853}
                  loading="lazy"
                />
              </div>
              <div className="media-badge">
                <div className="num">100%</div>
                <div className="txt">Customer-Centric Approach</div>
              </div>
            </div>
            <div className="split__body reveal" data-delay="1">
              <span className="eyebrow">About GMR Buildcon</span>
              <h2 className="h-lg">Crafting landmark living, built on a foundation of trust</h2>
              <p className="lead">
                GMR Buildcon stands as a symbol of trust, quality, and innovation in the real estate
                space.
              </p>
              <p>
                With a strong track record of delivering thoughtfully designed residential and
                commercial projects, we focus on what matters most to the families who live in our
                developments. Our buildings are more than addresses — they are lifestyle experiences
                crafted with precision and care.
              </p>
              <ul className="value-list">
                <li>
                  <span className="tick">
                    <Icon name="check" size={14} />
                  </span>{" "}
                  Timely delivery, every time
                </li>
                <li>
                  <span className="tick">
                    <Icon name="check" size={14} />
                  </span>{" "}
                  Premium construction quality
                </li>
                <li>
                  <span className="tick">
                    <Icon name="check" size={14} />
                  </span>{" "}
                  Customer-centric approach
                </li>
                <li>
                  <span className="tick">
                    <Icon name="check" size={14} />
                  </span>{" "}
                  Modern architecture &amp; sustainable living
                </li>
              </ul>
              <p style={{ marginTop: "1.75rem" }}>
                <Link className="btn btn--outline" href="/about">
                  More About Us <Icon name="arrow" size={16} />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROJECT HIGHLIGHT ============ */}
      <section className="section section--cream" id="project">
        <div className="container">
          <div className="section-head center reveal">
            <span className="eyebrow">Our Signature Project</span>
            <h2 className="h-lg">Redwood Utopia, Jagatpura</h2>
            <p className="lead">
              A thoughtfully planned residential development offering the perfect balance of comfort,
              connectivity, and practicality — an ideal choice for both homeowners and investors.
            </p>
          </div>

          <div className="grid spec-grid">
            <div className="spec-item reveal" data-delay="1">
              <div className="icon">
                <Icon name="building" size={32} />
              </div>
              <div className="val">48</div>
              <div className="key">Total Units</div>
            </div>
            <div className="spec-item reveal" data-delay="2">
              <div className="icon">
                <Icon name="home" size={32} />
              </div>
              <div className="val">2 &amp; 3 BHK</div>
              <div className="key">Configuration</div>
            </div>
            <div className="spec-item reveal" data-delay="3">
              <div className="icon">
                <Icon name="layers" size={32} />
              </div>
              <div className="val">Low-Rise</div>
              <div className="key">Apartments / Flats</div>
            </div>
            <div className="spec-item reveal" data-delay="4">
              <div className="icon">
                <Icon name="car" size={32} />
              </div>
              <div className="val">48</div>
              <div className="key">Parking Slots</div>
            </div>
          </div>

          <div className="split" style={{ marginTop: "clamp(2.5rem,6vw,4.5rem)" }}>
            <div className="split__body reveal">
              <h3 className="h-md">Designed for modern urban living</h3>
              <p>
                Spread across approximately <strong>0.29 acres</strong>, Redwood Utopia is a
                low-density project with just 48 exclusive units, ensuring a more private and
                peaceful living experience.
              </p>
              <p>
                The development features well-designed 2 &amp; 3 BHK apartments, with smart layouts
                that maximize space, ventilation, and natural light — homes built for the way real
                families live.
              </p>
              <p style={{ marginTop: "1.5rem" }}>
                <Link className="btn btn--gold" href={projectUrl}>
                  View Project Details <Icon name="arrow" size={16} />
                </Link>
              </p>
            </div>
            <div className="split__media reveal" data-delay="1">
              <div className="framed framed--wide">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${IMG}photo-2.jpg`}
                  alt="Spacious 2 &amp; 3 BHK living space at Redwood Utopia"
                  width={1280}
                  height={853}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ AMENITIES ============ */}
      <section className="section" id="amenities">
        <div className="container">
          <div className="section-head center reveal">
            <span className="eyebrow">Lifestyle &amp; Infrastructure</span>
            <h2 className="h-lg">Amenities crafted for everyday comfort</h2>
            <p className="lead">
              Thoughtfully designed common areas and reliable infrastructure that enhance everyday
              living — a serene atmosphere ideal for modern urban life.
            </p>
          </div>

          <div className="grid amenity-grid">
            {homeAmenities.map(([icon, title, desc], i) => (
              <div className="amenity-card reveal" data-delay={Math.min(i + 1, 3)} key={title}>
                <div className="amenity-card__icon">
                  <Icon name={icon} size={26} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: "clamp(2.5rem,5vw,3.5rem)", textAlign: "center" }}>
            <h3 className="h-md" style={{ marginBottom: "1.5rem" }}>
              Lifestyle Amenities
            </h3>
            <div className="chip-grid" style={{ justifyContent: "center" }}>
              {homeChips.map(([icon, label]) => (
                <span className="chip" key={label}>
                  <Icon name={icon} size={18} /> {label}
                </span>
              ))}
            </div>
            <p style={{ marginTop: "2rem" }}>
              <Link className="btn btn--outline" href={`${projectUrl}#amenities`}>
                See All Amenities <Icon name="arrow" size={16} />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ============ LOCATION ============ */}
      <section className="section section--sand" id="location">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Prime Connectivity</span>
            <h2 className="h-lg">Everything you need, minutes away</h2>
            <p className="lead">
              Located in the fast-growing locality of Jagatpura, Jaipur — surrounded by a calm,
              well-organized setting with seamless access to daily necessities.
            </p>
          </div>

          <div className="grid loc-grid">
            {homePlaces.map(([icon, dist, place], i) => (
              <div className="loc-card reveal" data-delay={Math.min(i + 1, 4)} key={place}>
                <div className="loc-card__icon">
                  <Icon name={icon} size={22} />
                </div>
                <div>
                  <div className="dist">{dist}</div>
                  <div className="place">{place}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: "center" }}>
            <Link className="btn btn--gold" href={`${projectUrl}#location`} style={{ marginTop: "2.5rem" }}>
              Explore the Location <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="section" id="gallery">
        <div className="container">
          <div className="section-head center reveal">
            <span className="eyebrow">Gallery</span>
            <h2 className="h-lg">A glimpse of Redwood Utopia</h2>
          </div>
          <div className="grid gallery reveal">
            <div className="gallery__item wide tall">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}hero-render.png`} alt="Redwood Utopia building exterior at golden hour" width={1916} height={739} loading="lazy" />
            </div>
            <div className="gallery__item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}photo-1.jpg`} alt="Living room interior at Redwood Utopia" width={1280} height={853} loading="lazy" />
            </div>
            <div className="gallery__item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}photo-2.jpg`} alt="Lounge and dining interior at Redwood Utopia" width={1280} height={853} loading="lazy" />
            </div>
            <div className="gallery__item wide">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}photo-3.jpg`} alt="Private balcony with neighbourhood views" width={1280} height={853} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section section--tight">
        <div className="container">
          <div className="cta-banner reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cta-banner__bg" src={`${IMG}hero-render.png`} alt="" aria-hidden="true" loading="lazy" />
            <span className="eyebrow">Your new home awaits</span>
            <h2>Ready to experience Redwood Utopia?</h2>
            <p>
              Book a site visit, download the brochure, or talk to our team — we&apos;ll help you
              find the home that fits your life.
            </p>
            <div className="cta-banner__actions">
              <Link className="btn btn--gold" href="/contact">
                Schedule a Tour <Icon name="arrow" size={16} />
              </Link>
              <a
                className="btn btn--ghost-light"
                href={site.brochure}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Brochure <Icon name="download" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INSIGHTS ============ */}
      {recent.length > 0 && (
        <section className="section section--cream" id="insights">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow">Insights</span>
              <h2 className="h-lg">From our blog</h2>
              <p className="lead">
                Market trends, buying guides, and the latest on Jagatpura real estate.
              </p>
            </div>
            <div className="grid post-grid">
              {recent.map((post, i) => (
                <PostCard key={post.id} post={post} delay={i + 1} />
              ))}
            </div>
            <div className="reveal" style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link className="btn btn--outline" href="/blog">
                View All Articles <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
