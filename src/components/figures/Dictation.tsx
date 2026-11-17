import { DICTATION } from "@/data/projects";
import { Icon } from "../Icon";

/** Bar heights of the drawn waveform, out of 24. A shape, not a recording. */
const WAVE = [
  3, 6, 10, 7, 14, 20, 12, 8, 16, 22, 15, 9, 5, 11, 18, 13, 7, 4, 9, 15, 21,
  14, 8, 12, 17, 10, 6, 3,
];

/** Lavtype in one pass: a held key, speech, a local model, text where the cursor is. */
export function Dictation() {
  return (
    <figure className="media">
      <div className="dictation">
        <div className="dictation-voice">
          <span className="keycap">
            <Icon name="mic" />
          </span>
          <svg viewBox={`0 0 ${WAVE.length * 6 - 3} 24`} aria-hidden="true">
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
        </div>
        <p className="dictation-model">{DICTATION.model}</p>
        <div className="panel dictation-field">
          <p className="panel-head">
            <span>The focused app</span>
          </p>
          <p className="dictation-text">
            {DICTATION.sentence}
            <span className="dictation-caret" aria-hidden="true" />
          </p>
        </div>
      </div>
      <figcaption>
        Hold the shortcut and talk, and the words are typed where the cursor
        is. The sentence is an example.
      </figcaption>
    </figure>
  );
}
