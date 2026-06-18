"use client";

import type { FocusEvent } from "react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  isActive: boolean;
  onActiveChange: (projectId: string | null) => void;
};

export function ProjectCard({
  project,
  isActive,
  onActiveChange,
}: ProjectCardProps) {
  const titleId = `${project.id}-title`;

  const clearWhenFocusLeaves = (event: FocusEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget;

    if (!(nextTarget instanceof Node)) {
      onActiveChange(null);
      return;
    }

    if (!event.currentTarget.contains(nextTarget)) {
      onActiveChange(null);
    }
  };

  return (
    <article
      className="project-card"
      aria-labelledby={titleId}
      data-active={isActive ? "true" : "false"}
      data-category={project.category}
      data-testid="project-card"
      onMouseEnter={() => onActiveChange(project.id)}
      onMouseLeave={() => onActiveChange(null)}
      onFocus={() => onActiveChange(project.id)}
      onBlur={clearWhenFocusLeaves}
    >
      <div className="project-card-header">
        <span className="project-index">{project.index}</span>
        <span className="project-category">{project.category}</span>
      </div>

      <h3 id={titleId}>{project.title}</h3>
      <p>{project.summary}</p>
      <p className="teaching-angle">{project.teachingAngle}</p>

      <ul className="stack-list" aria-label={`${project.title} stack`}>
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="project-links" aria-label={`${project.title} links`}>
        {project.liveUrl ? <a href={project.liveUrl}>Live site</a> : null}
        {project.repoLinks.map((repoLink) =>
          repoLink.href ? (
            <a href={repoLink.href} key={repoLink.href}>
              {repoLink.label}
            </a>
          ) : (
            <span className="repo-badge" key={repoLink.label}>
              Repo not public yet
            </span>
          ),
        )}
      </div>
    </article>
  );
}
