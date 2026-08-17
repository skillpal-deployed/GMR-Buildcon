import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import ProjectCard from "@/components/ProjectCard";
import { site } from "@/lib/config";
import { getProjectsGrouped } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Thoughtfully planned developments across Jaipur — completed, ongoing, and upcoming.",
};

export default async function ProjectsPage() {
  const groups = await getProjectsGrouped();
  const withProjects = groups.filter((g) => g.projects.length > 0);

  return (
    <>
      <section className="page-hero">
        <div className="container container--wide">
          <div className="page-hero__inner">
            <nav className="breadcrumb">
              <Link href="/">Home</Link> / <span>Projects</span>
            </nav>
            <h1>Our Projects</h1>
            <p>
              Thoughtfully planned developments across Jaipur — explore what we&apos;ve completed,
              what&apos;s underway now, and what&apos;s coming next.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {withProjects.length > 0 ? (
            withProjects.map((group) => (
              <div className="project-section" key={group.slug}>
                <div className="project-section__head reveal">
                  <h2 className="h-lg">{group.label}</h2>
                  <span className="count">{group.tag}</span>
                  <span className="rule"></span>
                </div>

                {group.hasSample && (
                  <p className="sample-note reveal">
                    <Icon name="info" size={16} /> Example entries — edit or replace these in your
                    dashboard.
                  </p>
                )}

                <div className="project-grid">
                  {group.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} statusSlug={group.slug} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="section-head center reveal">
              <h2 className="h-md">No projects yet</h2>
              <p className="lead">Add your first project from the admin dashboard.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="cta-banner reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="cta-banner__bg"
              src="/assets/images/hero-render.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <span className="eyebrow">Find your next home</span>
            <h2>Interested in a GMR Buildcon project?</h2>
            <p>
              Book a site visit, download a brochure, or talk to our team — we&apos;ll help you find
              the home that fits your life.
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
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
