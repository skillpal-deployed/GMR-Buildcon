import Link from "next/link";
import Icon from "./Icon";
import type { Project } from "@prisma/client";
import { hasImage } from "@/lib/images";

// Port of gmr_render_project_card().
export default function ProjectCard({
  project,
  statusSlug,
}: {
  project: Project;
  statusSlug: string;
}) {
  const isUpcoming = statusSlug === "upcoming";
  const href = isUpcoming && project.isSample ? "/contact" : `/projects/${project.slug}`;
  const ctaLabel = isUpcoming ? "Register interest" : "View project";
  const pillLabel = statusSlug.charAt(0).toUpperCase() + statusSlug.slice(1);

  return (
    <Link
      className={"project-card reveal" + (isUpcoming ? " project-card--upcoming" : "")}
      href={href}
    >
      <div className="project-card__media">
        <span className={`status-pill status-pill--${statusSlug}`}>{pillLabel}</span>
        {hasImage(project.heroImage) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.heroImage as string} alt={project.title} loading="lazy" />
        ) : null}
      </div>
      <div className="project-card__body">
        {project.location ? (
          <span className="project-card__loc">
            <Icon name="pin" size={16} /> {project.location}
          </span>
        ) : null}
        <h3 className="project-card__title">{project.title}</h3>
        <div className="project-card__meta">
          {project.units ? (
            <span>
              <Icon name="building" size={16} /> {project.units} Units
            </span>
          ) : null}
          {project.config ? (
            <span>
              <Icon name="home" size={16} /> {project.config}
            </span>
          ) : null}
          {isUpcoming && !project.units && !project.config ? (
            <span>
              <Icon name="clock" size={16} /> Launching soon
            </span>
          ) : null}
        </div>
        <span className="project-card__cta">
          {ctaLabel} <Icon name="arrow" size={15} />
        </span>
      </div>
    </Link>
  );
}
