"use client";

import type { KeyboardEvent } from "react";
import type { Project } from "@/data/projects";

const POINTS = [
  { x: 30, y: 34 },
  { x: 96, y: 66 },
  { x: 160, y: 36 },
  { x: 224, y: 76 },
  { x: 310, y: 44 },
  { x: 58, y: 132 },
  { x: 130, y: 112 },
  { x: 202, y: 142 },
  { x: 264, y: 108 },
  { x: 328, y: 134 },
] as const;

type ProjectSignalFieldProps = {
  projects: readonly Project[];
  activeProjectId: string | null;
  onActiveChange: (projectId: string | null) => void;
};

export function ProjectSignalField({
  projects,
  activeProjectId,
  onActiveChange,
}: ProjectSignalFieldProps) {
  const handleKeyDown = (
    event: KeyboardEvent<SVGGElement>,
    projectId: string,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    onActiveChange(projectId);
  };

  return (
    <div className="signal-field" aria-label="Project signal map">
      <svg
        viewBox="0 0 360 180"
        role="img"
        aria-labelledby="signal-title signal-description"
      >
        <title id="signal-title">Project signal map</title>
        <desc id="signal-description">
          Ten keyboard-focusable project nodes mirror the selected project cards.
        </desc>
        <path className="signal-grid-line" d="M24 34H336" />
        <path className="signal-grid-line" d="M24 92H336" />
        <path className="signal-grid-line" d="M24 150H336" />
        <path
          className="signal-curve"
          d="M30 34 C 96 66, 96 66, 160 36 S 224 76, 310 44 M58 132 C 130 112, 130 112, 202 142 S 264 108, 328 134"
        />
        {projects.map((project, index) => {
          const point = POINTS[index % POINTS.length];
          const isActive = project.id === activeProjectId;

          return (
            <g
              className="signal-node"
              data-active={isActive ? "true" : "false"}
              data-category={project.category}
              key={project.id}
              role="button"
              tabIndex={0}
              aria-label={`${project.index} ${project.title}`}
              aria-pressed={isActive}
              transform={`translate(${point.x} ${point.y})`}
              onClick={() => onActiveChange(project.id)}
              onFocus={() => onActiveChange(project.id)}
              onBlur={() => onActiveChange(null)}
              onMouseEnter={() => onActiveChange(project.id)}
              onMouseLeave={() => onActiveChange(null)}
              onKeyDown={(event) => handleKeyDown(event, project.id)}
            >
              <circle r="13" />
              <text y="4" textAnchor="middle">
                {project.index}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
