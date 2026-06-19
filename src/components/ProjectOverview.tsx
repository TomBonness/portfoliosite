"use client";

import type { Project } from "@/data/projects";

type ProjectOverviewProps = {
  projects: readonly Project[];
  activeProjectId: string | null;
  onActiveChange: (projectId: string | null) => void;
  onSelect: (projectId: string) => void;
};

export function ProjectOverview({
  projects,
  activeProjectId,
  onActiveChange,
  onSelect,
}: ProjectOverviewProps) {
  return (
    <nav className="project-overview" aria-label="Project index">
      <ol className="project-overview-list">
        {projects.map((project) => {
          const isActive = project.id === activeProjectId;

          return (
            <li
              className="project-overview-item"
              data-active={isActive ? "true" : "false"}
              data-category={project.category}
              data-project-id={project.id}
              key={project.id}
            >
              <button
                className="project-overview-link"
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(project.id)}
                onMouseEnter={() => onActiveChange(project.id)}
                onMouseLeave={() => onActiveChange(null)}
                onFocus={() => onActiveChange(project.id)}
                onBlur={() => onActiveChange(null)}
              >
                <span className="project-overview-index">{project.index}</span>
                <span className="project-overview-name">{project.title}</span>
                <span className="project-overview-tag">{project.category}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
