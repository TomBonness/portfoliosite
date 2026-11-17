import type { Project, SmallProject } from "@/data/projects";
import { FIGURES } from "./figures";
import {
  ProjectDetails,
  ProjectLinks,
  ProjectReadout,
  Stack,
} from "./ProjectParts";
import { WindowBar } from "./Terminal";

/**
 * A project as a terminal window. Its screen comes first, then the name, what
 * it is, and where to go next, in that order on every screen size: below the
 * screen when the window is narrow, beside it when there is room.
 */
export function ProjectCard({
  project,
  dir,
}: {
  project: Project | SmallProject;
  /** The directory the project sits in, for the window's title. */
  dir: string;
}) {
  const titleId = `${project.id}-title`;

  return (
    <article className="window project" id={project.id} aria-labelledby={titleId}>
      <WindowBar title={`~/${dir}/${project.id}`} />
      <div className="project-body">
        {project.figure ? FIGURES[project.figure] : null}
        <div className="project-text">
          <h3 id={titleId}>{project.title}</h3>
          <p className="summary">{project.summary}</p>
          {"readout" in project ? (
            <ProjectReadout readout={project.readout} />
          ) : null}
          <Stack items={project.stack} />
          {"details" in project ? (
            <ProjectDetails title={project.title} details={project.details} />
          ) : null}
          <ProjectLinks
            title={project.title}
            links={project.links}
            note={project.note}
          />
        </div>
      </div>
    </article>
  );
}
