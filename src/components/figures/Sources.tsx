import { SOURCES } from "@/data/projects";

/** Daish in the middle: what it reads on one side, what it drives on the other. */
export function Sources() {
  return (
    <figure className="media">
      <div className="sources">
        <ul className="sources-in" aria-label="Daish reads">
          {SOURCES.reads.map((source) => (
            <li key={source.name}>
              <span className="sources-name">{source.name}</span>
              <span className="sources-detail">{source.detail}</span>
            </li>
          ))}
        </ul>
        <p className="sources-node">Daish</p>
        <ul className="sources-out" aria-label="Daish drives">
          {SOURCES.writes.map((target) => (
            <li key={target.name}>
              <span className="sources-name">{target.name}</span>
              <span className="sources-detail">{target.detail}</span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption>What Daish reads, and what it drives</figcaption>
    </figure>
  );
}
