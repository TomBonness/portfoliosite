"use client";

import type { KeyboardEvent } from "react";
import type { Project } from "@/data/projects";

const POINTS = [
  { x: 34, y: 48 },
  { x: 128, y: 48 },
  { x: 222, y: 48 },
  { x: 316, y: 48 },
  { x: 80, y: 132 },
  { x: 174, y: 132 },
  { x: 268, y: 132 },
  { x: 362, y: 132 },
  { x: 128, y: 222 },
  { x: 222, y: 222 },
  { x: 316, y: 222 },
] as const;

const SIGNAL_PATH = "M34 48 H316 M80 132 H362 M128 222 H316";
const SIGNAL_CONNECTORS = "M316 48 V132 M80 132 V222";

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
        viewBox="0 0 420 270"
        role="img"
        aria-labelledby="signal-title signal-description"
      >
        <title id="signal-title">Project signal map</title>
        <desc id="signal-description">
          Eleven keyboard-focusable project nodes mirror the selected project cards.
        </desc>
        <path className="signal-grid-line" d="M24 48H396" />
        <path className="signal-grid-line" d="M24 132H396" />
        <path className="signal-grid-line" d="M24 222H396" />
        <path className="signal-curve" d={SIGNAL_PATH} />
        <path className="signal-connector" d={SIGNAL_CONNECTORS} />
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
              <circle r="11" />
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
