import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Schedule a tour, request a brochure, or ask us anything about Redwood Utopia.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <nav className="breadcrumb">
              <Link href="/">Home</Link> / <span>Contact</span>
            </nav>
            <h1>Get in Touch</h1>
            <p>
              Schedule a tour, request a brochure, or ask us anything about Redwood Utopia. We&apos;d
              love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid contact-grid">
            <div className="reveal">
              <span className="eyebrow">Contact Details</span>
              <h2 className="h-md" style={{ marginBottom: "1.5rem" }}>
                We&apos;re here to help you find home
              </h2>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-item__icon">
                    <Icon name="pin" size={20} />
                  </div>
                  <div>
                    <h4>Office Address</h4>
                    <p>{site.address}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item__icon">
                    <Icon name="phone" size={20} />
                  </div>
                  <div>
                    <h4>Call Us</h4>
                    <a href={`tel:${site.phoneLink}`}>{site.phone}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item__icon">
                    <Icon name="mail" size={20} />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item__icon">
                    <Icon name="download" size={20} />
                  </div>
                  <div>
                    <h4>Brochure</h4>
                    <a href={site.brochure} target="_blank" rel="noopener noreferrer">
                      Download project brochure
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal" data-delay="1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="map-frame reveal">
            <iframe
              title="GMR Buildcon — Jagatpura, Jaipur"
              src="https://www.google.com/maps?q=Jagatpura,+Jaipur,+Rajasthan&output=embed"
              width="100%"
              height={380}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
