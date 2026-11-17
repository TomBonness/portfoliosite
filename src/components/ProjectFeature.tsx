import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import { ProjectDetails, ProjectLinks, ProjectReadout } from "./ProjectParts";

/** The first project of a chapter, shown large beside the chapter's one visual. */
export function ProjectFeature({
  project,
  layout,
  children,
}: {
  project: Project;
  /** Copy beside the visual, the visual first, or copy above a wide visual. */
  layout: "split" | "flipped" | "stacked";
  children: ReactNode;
}) {
  const titleId = `${project.id}-title`;

  return (
    <article
      className={`feature is-${layout}`}
      id={project.id}
      aria-labelledby={titleId}
    >
      <div className="feature-copy">
        <div className="feature-intro">
          <h3 id={titleId}>{project.title}</h3>
          <p className="feature-summary">{project.summary}</p>
        </div>
        <div className="feature-facts">
          <ProjectReadout readout={project.readout} />
          <p className="stack">{project.stack}</p>
          <ProjectLinks
            title={project.title}
            links={project.links}
            note={project.note}
          />
          <ProjectDetails project={project} />
        </div>
      </div>
      <div className="feature-visual">{children}</div>
    </article>
  );
}
