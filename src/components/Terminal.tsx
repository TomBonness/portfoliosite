import type { ReactNode } from "react";
import { Icon } from "./Icon";

/**
 * The title bar of a terminal window: three lights and the window's path.
 * It repeats what the window's heading says, so assistive tech skips it.
 */
export function WindowBar({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="window-bar" aria-hidden="true">
      <span className="lights">
        <i />
        <i />
        <i />
      </span>
      <span className="window-title">{title}</span>
      {children}
    </div>
  );
}

/** A shell prompt and the command typed at it. Decoration: the heading next to it says the same. */
export function Prompt({ path, command }: { path: string; command: string }) {
  return (
    <p className="prompt" aria-hidden="true">
      <span className="prompt-path">{path}</span>
      <Icon name="chevron-right" />
      <span>{command}</span>
    </p>
  );
}
