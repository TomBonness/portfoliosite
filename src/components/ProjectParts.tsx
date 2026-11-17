import type { Project, ProjectLink, Readout } from "@/data/projects";
import { Icon } from "./Icon";

/** The signature of the site: one measured figure per project, in mono with its unit. */
export function ProjectReadout({ readout }: { readout: Readout }) {
  return (
    <p className="readout">
      <span className="readout-value">{readout.value}</span>
      <span className="readout-label">{readout.label}</span>
    </p>
  );
}

/** Outbound links for a project, or its note when it has none to offer. */
export function ProjectLinks({
  title,
  links,
  note,
}: {
  title: string;
  links: readonly ProjectLink[];
  note?: string;
}) {
  if (links.length === 0) {
    return note ? <p className="project-note">{note}</p> : null;
  }

  return (
    <ul className="project-links">
      {links.map((link) => (
        <li key={link.href}>
          <a className="link" href={link.href}>
            {link.label}
            <span className="sr-only"> for {title}</span>
            <Icon name="arrow-up-right" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <details className="details">
      <summary>
        How it works
        <span className="sr-only">: {project.title}</span>
        <Icon name="chevron-down" />
      </summary>
      <ul>
        {project.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </details>
  );
}
