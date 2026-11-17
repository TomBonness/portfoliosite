import { SOURCES } from "@/data/projects";

/** Daish in the middle of what it reads and what it drives, drawn as terminal boxes. */
export function Sources() {
  return (
    <figure className="screen">
      <div className="screen-body tui">
        <div className="tui-box">
          <p className="tui-title">reads</p>
          <ul>
            {SOURCES.reads.map((source) => (
              <li key={source.name}>
                <span className="tui-name">{source.name}</span>
                <span className="tui-detail">{source.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="tui-core">
          <span className="tui-core-name">daish</span>
          <span className="tui-detail">samples at 1 Hz</span>
        </p>
        <div className="tui-box">
          <p className="tui-title">drives</p>
          <ul>
            {SOURCES.writes.map((target) => (
              <li key={target.name}>
                <span className="tui-name">{target.name}</span>
                <span className="tui-detail">{target.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption>What Daish reads, and what it drives</figcaption>
    </figure>
  );
}
