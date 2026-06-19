"use client";

import { useEffect, useRef, useState } from "react";
import { FEATURED_PROJECTS, type Project } from "@/data/projects";
import { ScrollReveal } from "./ScrollReveal";
import { ProjectCard } from "./ProjectCard";
import { ProjectOverview } from "./ProjectOverview";

type ProjectGridProps = {
  projects?: readonly Project[];
};

export function ProjectGrid({ projects = FEATURED_PROJECTS }: ProjectGridProps) {
  const cardShells = useRef<Record<string, HTMLDivElement | null>>({});
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [scrollProjectId, setScrollProjectId] = useState<string | null>(
    projects[0]?.id ?? null,
  );
  const activeProjectId =
    hoveredProjectId ?? scrollProjectId ?? projects[0]?.id ?? null;

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setScrollProjectId(
              (entry.target as HTMLElement).dataset.projectId ?? null,
            );
          }
        }
      },
      { threshold: 0.42, rootMargin: "-20% 0px -35% 0px" },
    );

    for (const project of projects) {
      const shell = cardShells.current[project.id];

      if (shell) {
        observer.observe(shell);
      }
    }

    return () => observer.disconnect();
  }, [projects]);

  const handleSelectProject = (projectId: string) => {
    setHoveredProjectId(projectId);
    const shell = cardShells.current[projectId];

    if (!shell) {
      return;
    }

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    shell.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <div className="project-system">
      <ProjectOverview
        projects={projects}
        activeProjectId={activeProjectId}
        onActiveChange={setHoveredProjectId}
        onSelect={handleSelectProject}
      />

      <div className="project-grid" id="project-list">
        {projects.map((project, index) => (
          <ScrollReveal
            className="project-reveal"
            delay={(index % 3) * 70}
            key={project.id}
          >
            <div
              className="project-card-shell"
              data-project-id={project.id}
              ref={(node) => {
                cardShells.current[project.id] = node;
              }}
            >
              <ProjectCard
                isActive={project.id === activeProjectId}
                onActiveChange={setHoveredProjectId}
                project={project}
              />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
