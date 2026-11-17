import { Fragment } from "react";
import { INSTALLER } from "@/data/projects";

/** The menu a Fast Long Context installer opens with, as terminal text. */
export function InstallerMenu() {
  return (
    <figure className="media">
      <div className="terminal">
        <div className="terminal-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <pre>
          <code>
            <span className="terminal-strong">{INSTALLER.title}</span>
            {"\n"}
            <span className="terminal-dim">{INSTALLER.subtitle}</span>
            {"\n\n"}
            {INSTALLER.options.map((option) => (
              <Fragment key={option.key}>
                <span className="terminal-key">{`  ${option.key})`}</span>
                {` ${option.label}\n`}
              </Fragment>
            ))}
            {"\n"}
            <span className="terminal-dim">{INSTALLER.note}</span>
            {"\n\n"}
            {INSTALLER.prompt}
            <span className="terminal-caret" aria-hidden="true" />
          </code>
        </pre>
      </div>
      <figcaption>The menu one installer opens with, in its own words</figcaption>
    </figure>
  );
}
