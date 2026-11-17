import type { ProjectLink, Readout } from "@/data/projects";
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

/** The technologies a project is built with, as tags. */
export function Stack({ items }: { items: readonly string[] }) {
  return (
    <ul className="tags" aria-label="Built with">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** A project's outbound links, or its note when it has none to offer. */
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
    return note ? <p className="note">{note}</p> : null;
  }

  return (
    <ul className="links">
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

/** The longer explanation, closed until asked for. Its marker is drawn in CSS. */
export function ProjectDetails({
  title,
  details,
}: {
  title: string;
  details: readonly string[];
}) {
  return (
    <details className="details">
      <summary>
        How it works
        <span className="sr-only">: {title}</span>
      </summary>
      <ul>
        {details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </details>
  );
}
