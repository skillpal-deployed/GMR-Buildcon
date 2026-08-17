import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <div className="section-head center reveal" style={{ marginInline: "auto" }}>
          <span className="eyebrow">404</span>
          <h1 className="h-lg">Page not found</h1>
          <p className="lead">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link className="btn btn--gold" href="/">
              Back to Home <Icon name="arrow" size={16} />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
