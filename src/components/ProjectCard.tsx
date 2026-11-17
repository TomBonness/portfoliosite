import type { Project, SmallProject } from "@/data/projects";
import { FIGURES } from "./figures";
import { ProjectDetails, ProjectLinks, ProjectReadout } from "./ProjectParts";

/**
 * A project as a card with up to four regions, in reading order: its picture,
 * its name, what it is, and where to go next. The stylesheet sets the picture
 * beside the rest when the card is wide enough.
 *
 * "How it works" sits in the last region, so opening it lengthens only this
 * card and never pushes a neighbor's rows out of line.
 */
export function ProjectCard({ project }: { project: Project | SmallProject }) {
  const titleId = `${project.id}-title`;

  return (
    <article className="card" id={project.id} aria-labelledby={titleId}>
      {project.figure ? FIGURES[project.figure] : null}
      <h3 id={titleId}>{project.title}</h3>
      <div className="card-body">
        <p>{project.summary}</p>
        {"readout" in project ? (
          <ProjectReadout readout={project.readout} />
        ) : null}
        <p className="stack">{project.stack}</p>
      </div>
      <footer>
        {"details" in project ? (
          <ProjectDetails title={project.title} details={project.details} />
        ) : null}
        <ProjectLinks
          title={project.title}
          links={project.links}
          note={project.note}
        />
      </footer>
    </article>
  );
}
