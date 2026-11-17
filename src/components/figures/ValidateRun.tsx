import { VALIDATE } from "@/data/projects";

/** The opening lines of the deployment bundle's validator, as it prints them. */
export function ValidateRun() {
  return (
    <figure className="screen">
      <div className="screen-body">
        <p className="screen-command">
          <span className="sigil" aria-hidden="true">
            $
          </span>{" "}
          {VALIDATE.command}
        </p>
        <ol className="log">
          {VALIDATE.lines.map((line) => (
            <li key={line}>
              <span className="pass">PASS:</span> {line}
            </li>
          ))}
        </ol>
      </div>
      <figcaption>
        The first lines of the bundle’s static validator: the profile, the
        patch hashes, then the pinned checkpoint
      </figcaption>
    </figure>
  );
}
