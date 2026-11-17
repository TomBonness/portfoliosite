import { DICTATION } from "@/data/projects";
import { Icon } from "../Icon";

/** Bar heights of the drawn waveform, out of 24. A shape, not a recording. */
const WAVE = [
  3, 6, 10, 7, 14, 20, 12, 8, 16, 22, 15, 9, 5, 11, 18, 13, 7, 4, 9, 15, 21,
  14, 8, 12, 17, 10, 6, 3,
];

/** Lavtype in one pass, as steps: hold, talk, release, and the text lands where the cursor is. */
export function Dictation() {
  return (
    <figure className="screen">
      <div className="screen-body">
        <ol className="steps">
          <li>
            <span className="step-name">hold</span>
            <span className="keycap">
              <Icon name="mic" />
              shortcut
            </span>
          </li>
          <li>
            <span className="step-name">talk</span>
            <svg
              className="wave"
              viewBox={`0 0 ${WAVE.length * 6 - 3} 24`}
              aria-hidden="true"
            >
              {WAVE.map((height, index) => (
                <rect
                  key={index}
                  x={index * 6}
                  y={(24 - height) / 2}
                  width="3"
                  height={height}
                  rx="1.5"
                />
              ))}
            </svg>
          </li>
          <li>
            <span className="step-name">release</span>
            <span>{DICTATION.model}</span>
          </li>
          <li>
            <span className="step-name">type</span>
            <span className="typed-text">
              {DICTATION.sentence}
              <span className="text-cursor" aria-hidden="true" />
            </span>
          </li>
        </ol>
      </div>
      <figcaption>
        Hold the shortcut and talk. On release, one transcript is typed into
        the focused app. The sentence is an example.
      </figcaption>
    </figure>
  );
}
