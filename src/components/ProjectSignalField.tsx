"use client";

import type { KeyboardEvent } from "react";
import type { Project } from "@/data/projects";

const POINTS = [
  { x: 28, y: 40 },
  { x: 86, y: 70 },
  { x: 144, y: 42 },
  { x: 202, y: 76 },
  { x: 260, y: 46 },
  { x: 326, y: 84 },
  { x: 62, y: 150 },
  { x: 128, y: 118 },
  { x: 194, y: 150 },
  { x: 260, y: 120 },
  { x: 326, y: 154 },
] as const;

const SIGNAL_PATH =
  "M28 40 L86 70 L144 42 L202 76 L260 46 L326 84 L62 150 L128 118 L194 150 L260 120 L326 154";

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
        viewBox="0 0 360 190"
        role="img"
        aria-labelledby="signal-title signal-description"
      >
        <title id="signal-title">Project signal map</title>
        <desc id="signal-description">
          Eleven keyboard-focusable project nodes mirror the selected project cards.
        </desc>
        <path className="signal-grid-line" d="M24 40H336" />
        <path className="signal-grid-line" d="M24 96H336" />
        <path className="signal-grid-line" d="M24 154H336" />
        <path className="signal-curve" d={SIGNAL_PATH} />
        {projects.map((project, index) => {
          const point = POINTS[index];

          if (!point) {
            return null;
          }

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
