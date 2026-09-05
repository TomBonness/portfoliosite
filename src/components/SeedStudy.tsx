"use client";

import { useId, useMemo, useState } from "react";
import styles from "./SeedStudy.module.css";

const DEFAULT_ANGLE = 137.5;
const SEED_COUNT = 420;
const SEED_COLORS = [
  "#34392d",
  "#4d533b",
  "#666c46",
  "#828058",
  "#a18a5b",
  "#b8784b",
  "#c45132",
];

const SEEDS = Array.from({ length: SEED_COUNT }, (_, index) => {
  const growth = Math.sqrt((index + 0.5) / SEED_COUNT);

  return {
    radius: 185 * growth,
    scale: 0.64 + 0.4 * growth,
    color: SEED_COLORS[Math.min(6, Math.floor(growth * 7))],
  };
});

const MEASUREMENT_TICKS = Array.from({ length: 72 }, (_, index) => (
  <line
    key={index}
    x1="250"
    y1="32"
    x2="250"
    y2={index % 6 === 0 ? 23 : 28}
    transform={`rotate(${index * 5} 250 250)`}
  />
));

export function SeedStudy() {
  const [angle, setAngle] = useState(DEFAULT_ANGLE);
  const id = useId();
  const seedId = `${id}-seed`;
  const inputId = `${id}-angle`;
  const noteId = `${id}-note`;
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  const seedElements = useMemo(
    () =>
      SEEDS.map((seed, index) => {
        const rotation = (index * angle - 90) % 360;
        const radians = (rotation * Math.PI) / 180;
        const x = 250 + seed.radius * Math.cos(radians);
        const y = 250 + seed.radius * Math.sin(radians);

        return (
          <use
            key={index}
            href={`#${seedId}`}
            color={seed.color}
            transform={`translate(${x.toFixed(3)} ${y.toFixed(3)}) rotate(${rotation + 32}) scale(${seed.scale.toFixed(3)})`}
          />
        );
      }),
    [angle, seedId],
  );

  return (
    <figure className={styles.study}>
      <svg
        className={styles.specimen}
        viewBox="0 0 500 500"
        width="500"
        height="500"
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <title id={titleId}>A sunflower-like spiral of 420 seeds</title>
        <desc id={descriptionId}>
          Each seed grows outward at the same divergence angle. Dark olive seeds
          at the center become warm vermilion at the edge. Adjust the angle
          below to explore how a small change transforms the packing pattern.
        </desc>
        <defs>
          <g id={seedId}>
            <path
              d="M -7 0 C -4.8 -4.3 3.7 -5.4 7.2 -0.5 C 4.6 4.7 -3.2 5.4 -7 0 Z"
              fill="currentColor"
            />
            <path
              d="M -4.4 0.5 Q 0 -1.2 4.9 -0.5"
              fill="none"
              stroke="#f4f1e9"
              strokeWidth="0.65"
              strokeLinecap="round"
              opacity="0.4"
            />
          </g>
        </defs>

        <g className={styles.measurements} fill="none" aria-hidden="true">
          <circle cx="250" cy="250" r="218" />
          {MEASUREMENT_TICKS}
          <circle
            className={styles.orbit}
            cx="250"
            cy="250"
            r="198"
            strokeDasharray="1 5"
            strokeLinecap="round"
          />
          <path d="M 245 250 H 255 M 250 245 V 255" />
        </g>

        <g aria-hidden="true">{seedElements}</g>

        <g className={styles.annotation} aria-hidden="true">
          <text x="24" y="490">
            PHYLLOTAXIS
          </text>
          <text x="476" y="490" textAnchor="end">
            n = 420
          </text>
        </g>
      </svg>

      <figcaption className={styles.caption}>
        <div className={styles.controlHeading}>
          <label htmlFor={inputId}>Divergence angle</label>
          <output htmlFor={inputId} className={styles.angle} aria-live="off">
            {angle.toFixed(1)}
            <span className={styles.degree}>°</span>
          </output>
        </div>
        <div className={styles.controlRow}>
          <div className={styles.rangeControl}>
            <input
              id={inputId}
              className={styles.range}
              type="range"
              min="130"
              max="145"
              step="0.1"
              value={angle}
              aria-valuetext={`${angle.toFixed(1)} degrees`}
              aria-describedby={noteId}
              onChange={(event) => setAngle(event.currentTarget.valueAsNumber)}
            />
            <div className={styles.rangeLimits} aria-hidden="true">
              <span>130°</span>
              <span>145°</span>
            </div>
          </div>
          <button
            className={styles.reset}
            type="button"
            onClick={() => setAngle(DEFAULT_ANGLE)}
            aria-label="Reset divergence angle to 137.5 degrees"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 3 6 A 5 5 0 1 1 3 10 M 3 2 V 6 H 7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Reset
          </button>
        </div>
        <p className={styles.note} id={noteId}>
          A small change. A different pattern.
        </p>
      </figcaption>
    </figure>
  );
}
