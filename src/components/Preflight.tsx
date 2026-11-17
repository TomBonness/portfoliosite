import { PREFLIGHT } from "@/data/projects";
import { Icon } from "./Icon";

/** What the deployment bundle checks before it starts the server. */
export function Preflight() {
  return (
    <figure className="visual">
      <div className="preflight">
        <div className="preflight-head">
          <span>Boot check</span>
          <span>
            {PREFLIGHT.checks.length} of {PREFLIGHT.checks.length}
          </span>
        </div>
        <ul>
          {PREFLIGHT.checks.map((check) => (
            <li key={check.label}>
              <span>{check.label}</span>
              <code>{check.value}</code>
              <Icon name="check" />
              <span className="sr-only">verified</span>
            </li>
          ))}
        </ul>
        <p className="preflight-foot">
          <Icon name="check" />
          {PREFLIGHT.service} started
        </p>
      </div>
      <figcaption>The pins are the bundle’s real ones, shortened</figcaption>
    </figure>
  );
}
