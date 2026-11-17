import type { CSSProperties } from "react";
import { WEEK } from "@/data/projects";

/** Top of the chart's scale, in tokens per second. */
const SCALE = 1000;

/** One week of releases against the same benchmark, as block bars in a terminal. */
export function WeekChart() {
  return (
    <figure className="screen">
      <div className="screen-body">
        <p className="screen-comment">
          decode tok/s, 32K-token prompt, one RTX 5090
        </p>
        <ol className="bars">
          {WEEK.map((point) => (
            <li
              key={point.date}
              style={{ "--v": point.value / SCALE } as CSSProperties}
            >
              <span className="bar-date">{point.date}</span>
              <span className="bar-track" aria-hidden="true">
                <span className="bar-fill" />
              </span>
              <span className="bar-value">{Math.round(point.value)}</span>
              <span className="bar-label">{point.label}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption>
        One week of releases on the same benchmark. Its text repeats, which
        favors the last two steps.
      </figcaption>
    </figure>
  );
}
