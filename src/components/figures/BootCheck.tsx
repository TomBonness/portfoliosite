import { PREFLIGHT } from "@/data/projects";
import { Icon } from "../Icon";

/** What the deployment bundle checks before it starts the server. */
export function BootCheck() {
  return (
    <figure className="media">
      <div className="panel bootcheck">
        <p className="panel-head">
          <span>Boot check</span>
          <span>
            {PREFLIGHT.checks.length} of {PREFLIGHT.checks.length}
          </span>
        </p>
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
        <p className="bootcheck-foot">
          <Icon name="check" />
          {PREFLIGHT.service} started
        </p>
      </div>
      <figcaption>The pins are the bundle’s real ones, shortened</figcaption>
    </figure>
  );
}
