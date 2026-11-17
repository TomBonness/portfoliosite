import type { Project } from "@/data/projects";
import { ProjectLinks, StackList } from "./ProjectMeta";

export function ProjectCard({
  project,
  number,
}: {
  project: Project;
  number: string;
}) {
  const titleId = `${project.id}-title`;

  return (
    <article className="card" id={project.id} aria-labelledby={titleId}>
      <p className="entry-kind">
        <span className="entry-number">{number}</span>
        {project.kind}
      </p>
      <h3 id={titleId}>{project.title}</h3>
      <p className="card-summary">{project.summary}</p>
      <ul className="highlights">
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="card-foot">
        <StackList stack={project.stack} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
