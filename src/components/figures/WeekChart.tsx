import type { CSSProperties } from "react";
import { WEEK } from "@/data/projects";

/** Top of the chart's scale, in tokens per second. */
const SCALE = 1000;

/** One week of releases against the same benchmark: columns with room, rows without. */
export function WeekChart() {
  return (
    <figure className="media">
      <div className="week">
        <p className="week-head">
          <span>One week on a fixed benchmark</span>
          <span>tok/s</span>
        </p>
        <ol>
          {WEEK.map((point) => (
            <li
              key={point.date}
              style={{ "--v": point.value / SCALE } as CSSProperties}
            >
              <div className="week-plot">
                <span className="week-value">{Math.round(point.value)}</span>
                <span className="week-bar" aria-hidden="true" />
              </div>
              <p className="week-caption">
                <span className="week-date">{point.date}</span>
                <span className="week-label">{point.label}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
      <figcaption>
        Decode speed after a 32K-token prompt on one RTX 5090. The benchmark
        text repeats, which favors the last two steps.
      </figcaption>
    </figure>
  );
}
