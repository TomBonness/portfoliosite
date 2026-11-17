import { NEOFETCH } from "@/data/projects";

/** "TB" as a 5×7 bitmap font, two letters with one column between them. */
const LOGO = [
  "11111011110",
  "00100010001",
  "00100010001",
  "00100011110",
  "00100010001",
  "00100010001",
  "00100011110",
];

/** Side of one lit pixel, out of a pitch of 1. */
const PIXEL = 0.84;

/** One path per row, so each row can take its own color. */
function rowPath(row: string, y: number): string {
  let d = "";
  for (let x = 0; x < row.length; x += 1) {
    if (row[x] === "1") {
      d += `M${x} ${y}h${PIXEL}v${PIXEL}h-${PIXEL}z`;
    }
  }
  return d;
}

/** The terminal palette, as neofetch prints it under the facts. */
const SWATCHES = ["red", "peach", "yellow", "green", "teal", "blue", "mauve", "pink"];

/** Who, where and what with, in the shape of `neofetch` output. */
export function Neofetch() {
  return (
    <div className="neofetch">
      <svg
        className="logo"
        viewBox={`0 0 ${LOGO[0].length - 1 + PIXEL} ${LOGO.length - 1 + PIXEL}`}
        aria-hidden="true"
      >
        {LOGO.map((row, y) => (
          <path key={y} d={rowPath(row, y)} />
        ))}
      </svg>
      <div className="facts">
        <p className="facts-title">
          <span className="user">tom</span>@<span className="host">bonness</span>
        </p>
        <dl>
          {NEOFETCH.map((fact) => (
            <div key={fact.key}>
              <dt>{fact.key}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className="swatches" aria-hidden="true">
          {SWATCHES.map((color) => (
            <i key={color} data-color={color} />
          ))}
        </p>
      </div>
    </div>
  );
}
