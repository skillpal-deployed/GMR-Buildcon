import Link from "next/link";
import Icon from "./Icon";
import { site, socialLinks, PRIMARY_PROJECT_SLUG } from "@/lib/config";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container container--wide">
        <div className="footer-top">
          <div className="footer-col footer-brand">
            <Link className="brand" href="/">
              <span className="brand__mark" aria-hidden="true">
                G
              </span>
              <span className="brand__text">
                <span className="brand__name">GMR Buildcon</span>
                <span className="brand__tag">Real Estate</span>
              </span>
            </Link>
            <p className="footer-about">{site.about}</p>
            <div className="footer-social">
              {socialLinks.map((s) => (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <Icon name={s.key} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href={`/projects/${PRIMARY_PROJECT_SLUG}`}>Redwood Utopia</Link>
              </li>
              <li>
                <Link href="/projects">All Projects</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li>
                <Link href="/blog">Blog &amp; Insights</Link>
              </li>
              <li>
                <a href={site.brochure} target="_blank" rel="noopener noreferrer">
                  Download Brochure
                </a>
              </li>
              <li>
                <Link href="/contact">Schedule a Tour</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get in Touch</h4>
            <ul className="footer-contact">
              <li>
                <Icon name="pin" size={18} />
                <span>{site.address}</span>
              </li>
              <li>
                <Icon name="phone" size={18} />
                <a href={`tel:${site.phoneLink}`}>{site.phone}</a>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {year} GMR Buildcon. All Rights Reserved.
          </p>
          <nav aria-label="Footer">
            <span>Symbol of trust, quality &amp; innovation in real estate.</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
