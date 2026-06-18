"use client";

import { useMemo, useState } from "react";
import {
  FEATURED_PROJECTS,
  PROJECT_FILTERS,
  type Project,
  type ProjectFilter,
} from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectSignalField } from "./ProjectSignalField";

type ProjectGridProps = {
  projects?: readonly Project[];
};

export function ProjectGrid({ projects = FEATURED_PROJECTS }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  const updateFilter = (filter: ProjectFilter) => {
    setActiveFilter(filter);
    setActiveProjectId(null);
  };

  return (
    <div className="project-system">
      <div className="filter-row" aria-label="Project filters">
        {PROJECT_FILTERS.map((filter) => (
          <button
            aria-controls="project-list"
            aria-pressed={activeFilter === filter}
            className="filter-button"
            key={filter}
            onClick={() => updateFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="project-count" aria-live="polite">
        Showing {filteredProjects.length} of {projects.length} projects
      </p>

      <ProjectSignalField
        projects={projects}
        activeProjectId={activeProjectId}
        onActiveChange={setActiveProjectId}
      />

      <div className="project-grid" id="project-list">
        {filteredProjects.map((project) => (
          <ProjectCard
            isActive={project.id === activeProjectId}
            key={project.id}
            onActiveChange={setActiveProjectId}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}
