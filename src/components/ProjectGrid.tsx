"use client";

import { useState } from "react";
import {
  FEATURED_PROJECTS,
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

type ProjectGridProps = { projects?: readonly Project[] };

export function ProjectGrid({
  projects = FEATURED_PROJECTS,
}: ProjectGridProps) {
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const visibleProjects =
    category === "All"
      ? projects
      : projects.filter((project) => project.category === category);

  return (
    <div className="project-system">
      <div className="project-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {(["All", ...PROJECT_CATEGORIES] as const).map((filter) => (
            <button
              type="button"
              key={filter}
              aria-pressed={category === filter}
              aria-controls="project-list"
              onClick={() => setCategory(filter)}
            >
              {filter === "All" ? "Everything" : filter}
            </button>
          ))}
        </div>
        <p className="project-count mono" role="status">
          {visibleProjects.length} projects to explore
        </p>
      </div>
      <div className="project-grid" id="project-list">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
