import type { Project } from "@/data/projects";
import { ProjectFigure } from "./ProjectFigure";
import { ProjectLinks, StackList } from "./ProjectMeta";

export function ProjectEntry({
  project,
  number,
}: {
  project: Project;
  number: string;
}) {
  const titleId = `${project.id}-title`;

  return (
    <article className="entry" id={project.id} aria-labelledby={titleId}>
      <p className="entry-kind">
        <span className="entry-number">{number}</span>
        {project.kind}
      </p>
      <h3 id={titleId}>{project.title}</h3>
      <p className="entry-summary">{project.summary}</p>

      {project.metrics ? (
        <dl className="metrics">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div
        className={
          project.figure?.kind === "image" && project.figure.wide
            ? "entry-main is-stacked"
            : "entry-main"
        }
      >
        <ul className="highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        {project.figure ? <ProjectFigure figure={project.figure} /> : null}
      </div>

      <div className="entry-foot">
        <StackList stack={project.stack} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
