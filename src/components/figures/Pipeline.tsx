import { PIPELINE } from "@/data/projects";
import { Icon } from "../Icon";

/** distributr's deploy workflow as the four steps it runs. */
export function Pipeline() {
  return (
    <figure className="media">
      <ol className="pipeline">
        {PIPELINE.map((step) => (
          <li key={step.label}>
            <span className="pipeline-node">
              <Icon name={step.icon} />
            </span>
            <p>
              <span className="pipeline-label">{step.label}</span>
              <span className="pipeline-detail">{step.detail}</span>
            </p>
          </li>
        ))}
      </ol>
      <figcaption>What a push to main runs, in order</figcaption>
    </figure>
  );
}
