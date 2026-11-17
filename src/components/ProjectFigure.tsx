import Image from "next/image";
import type { Figure } from "@/data/projects";

function FigureBody({ figure }: { figure: Figure }) {
  switch (figure.kind) {
    case "flow":
      return (
        <ol className="flow">
          {figure.steps.map((step) => (
            <li key={step.label}>
              <b>{step.label}</b>
              <span>{step.detail}</span>
            </li>
          ))}
        </ol>
      );
    case "bars": {
      const max = Math.max(
        ...figure.groups.flatMap((group) => group.bars.map((bar) => bar.value)),
      );
      return (
        <div className="bars">
          {figure.groups.map((group) => (
            <div className="bars-group" key={group.title}>
              <p className="bars-title">{group.title}</p>
              <ul>
                {group.bars.map((bar) => (
                  <li
                    className={bar.highlight ? "bar-row is-highlight" : "bar-row"}
                    key={bar.label}
                  >
                    <span className="bar-label">{bar.label}</span>
                    <span className="bar-track" aria-hidden="true">
                      <span
                        className="bar-fill"
                        style={{ width: `${(bar.value / max) * 100}%` }}
                      />
                    </span>
                    <span className="bar-value">{bar.value.toFixed(1)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
    case "rows":
      return (
        <dl className="rows">
          {figure.rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.detail}</dd>
            </div>
          ))}
        </dl>
      );
    case "image":
      return (
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
        />
      );
  }
}

export function ProjectFigure({ figure }: { figure: Figure }) {
  return (
    <figure className={`figure figure-${figure.kind}`}>
      <FigureBody figure={figure} />
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
}
