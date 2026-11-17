import type { Project } from "@/data/projects";

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function StackList({ stack }: { stack: Project["stack"] }) {
  return (
    <ul className="stack" aria-label="Stack">
      {stack.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** Links for a project, or its note when it has none to offer. */
export function ProjectLinks({ project }: { project: Project }) {
  if (project.links.length === 0) {
    return project.note ? <p className="entry-note">{project.note}</p> : null;
  }

  return (
    <ul className="links">
      {project.links.map((link) => (
        <li key={link.href}>
          <a href={link.href}>
            {link.label}
            <span className="sr-only"> for {project.title}</span> <Arrow />
          </a>
        </li>
      ))}
    </ul>
  );
}
