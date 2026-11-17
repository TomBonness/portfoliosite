import type { Project } from "@/data/projects";
import { ProjectDetails, ProjectLinks, ProjectReadout } from "./ProjectParts";

/** A project in a chapter's index: name, one line, its readout and its links. */
export function ProjectRow({ project }: { project: Project }) {
  const titleId = `${project.id}-title`;

  return (
    <li className="row" id={project.id} aria-labelledby={titleId}>
      <h3 id={titleId}>{project.title}</h3>
      <div className="row-body">
        <p className="row-summary">{project.summary}</p>
        <p className="stack">{project.stack}</p>
        <ProjectDetails project={project} />
      </div>
      <ProjectReadout readout={project.readout} />
      <ProjectLinks
        title={project.title}
        links={project.links}
        note={project.note}
      />
    </li>
  );
}
