import type { Project } from "@/data/projects";
import { ProjectArtwork } from "./ProjectArtwork";

type ProjectCardProps = { project: Project };

export function ProjectCard({ project }: ProjectCardProps) {
  const titleId = `${project.id}-title`;
  const destination =
    project.liveUrl ?? project.repoLinks.find((link) => link.href)?.href;

  return (
    <article
      className="project-card"
      aria-labelledby={titleId}
      data-category={project.category}
    >
      <a
        className="project-art-link"
        href={destination}
        aria-label={`Explore ${project.title}`}
      >
        <ProjectArtwork id={project.id} />
        <span className="visual-arrow" aria-hidden="true">
          ↗
        </span>
      </a>
      <h3 id={titleId}>
        <a href={destination}>{project.title}</a>
      </h3>
      <p>{project.summary}</p>
      <ul className="stack-list" aria-label={`${project.title} stack`}>
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="project-links" aria-label={`${project.title} links`}>
        {project.liveUrl && (
          <a href={project.liveUrl}>
            Live site <span aria-hidden="true">↗</span>
          </a>
        )}
        {project.repoLinks.map((link) =>
          link.href ? (
            <a key={link.href} href={link.href}>
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="repo-badge" key={link.label}>
              Source not public
            </span>
          ),
        )}
      </div>
    </article>
  );
}
