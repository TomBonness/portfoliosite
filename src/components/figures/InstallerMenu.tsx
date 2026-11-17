import { Fragment } from "react";
import { INSTALLER } from "@/data/projects";

/** The menu a Fast Long Context installer opens with, as terminal text. */
export function InstallerMenu() {
  return (
    <figure className="screen">
      <div className="screen-body">
        <pre className="menu">
          <code>
            <span className="menu-title">{INSTALLER.title}</span>
            {"\n"}
            <span className="dim">{INSTALLER.subtitle}</span>
            {"\n\n"}
            {INSTALLER.options.map((option) => (
              <Fragment key={option.key}>
                <span className="menu-key">{`  ${option.key})`}</span>
                {` ${option.label}\n`}
              </Fragment>
            ))}
            {"\n"}
            <span className="dim">{INSTALLER.note}</span>
            {"\n\n"}
            {INSTALLER.prompt}
            <span className="block-cursor" aria-hidden="true" />
          </code>
        </pre>
      </div>
      <figcaption>The menu one installer opens with, in its own words</figcaption>
    </figure>
  );
}
