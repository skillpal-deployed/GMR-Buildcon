import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { getPrimaryProjectUrl } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "GMR Buildcon — a symbol of trust, quality, and innovation in the real estate space.",
};

const IMG = "/assets/images/";

const values: [string, string, string][] = [
  ["clock", "Timely Delivery", "We respect your time and trust — projects delivered on schedule, without compromise."],
  ["shield", "Premium Quality", "Premium construction quality and materials built to stand the test of time."],
  ["star", "Customer-Centric", "A customer-first approach at every stage, from booking to possession and beyond."],
  ["leaf", "Sustainable Living", "Modern architecture paired with sustainable, future-ready living environments."],
];

export default async function AboutPage() {
  const projectUrl = await getPrimaryProjectUrl();

  return (
    <>
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <nav className="breadcrumb">
              <Link href="/">Home</Link> / <span>About</span>
            </nav>
            <h1>About GMR Buildcon</h1>
            <p>A symbol of trust, quality, and innovation in the real estate space.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__media reveal">
              <div className="framed">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${IMG}photo-1.jpg`}
                  alt="Interior of a GMR Buildcon home"
                  width={1280}
                  height={853}
                />
              </div>
              <div className="media-badge">
                <div className="num">Vision</div>
                <div className="txt">Behind every landmark development</div>
              </div>
            </div>
            <div className="split__body reveal" data-delay="1">
              <span className="eyebrow">Who We Are</span>
              <h2 className="h-lg">Building more than structures — building lifestyles</h2>
              <p className="lead">
                At the heart of every landmark development is a vision, and GMR Buildcon stands as a
                symbol of trust, quality, and innovation in the real estate space.
              </p>
              <p>
                With a strong track record of delivering thoughtfully designed residential and
                commercial projects, we bring precision and care to everything we build. Our
                developments are not just structures, but lifestyle experiences designed around the
                people who call them home.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-head center reveal">
            <span className="eyebrow">Our Commitment</span>
            <h2 className="h-lg">What drives every GMR development</h2>
          </div>
          <div className="grid amenity-grid">
            {values.map(([icon, title, desc], i) => (
              <div className="amenity-card reveal" data-delay={Math.min(i + 1, 4)} key={title}>
                <div className="amenity-card__icon">
                  <Icon name={icon} size={26} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="cta-banner reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cta-banner__bg" src={`${IMG}hero-render.png`} alt="" aria-hidden="true" loading="lazy" />
            <h2>Discover Redwood Utopia</h2>
            <p>
              Our signature residential development in Jagatpura, Jaipur — thoughtfully designed for
              modern families.
            </p>
            <div className="cta-banner__actions">
              <Link className="btn btn--gold" href={projectUrl}>
                View the Project <Icon name="arrow" size={16} />
              </Link>
              <Link className="btn btn--ghost-light" href="/contact">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
