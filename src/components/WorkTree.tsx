import { ALSO, CHAPTERS } from "@/data/projects";
import { Icon } from "./Icon";
import { WindowBar } from "./Terminal";

const DIRECTORIES = [
  ...CHAPTERS.map((chapter) => ({
    id: chapter.id,
    scope: chapter.scope,
    projects: chapter.rows.flat(),
  })),
  { id: "also", scope: "earlier builds and small tools", projects: ALSO },
];

/** Every project on the page, as `tree` prints a directory: a map of the page and its numbers at a glance. */
export function WorkTree() {
  return (
    <nav className="wrap work" id="work" aria-label="Projects">
      <div className="window">
        <WindowBar title="~/work" />
        <div className="tree-body">
          <p className="command" aria-hidden="true">
            <Icon name="chevron-right" />
            tree ~/work
          </p>
          <ul className="tree">
            {DIRECTORIES.map((directory) => (
              <li className={`hue-${directory.id}`} key={directory.id}>
                <p className="tree-dir">
                  <a href={`#${directory.id}`}>{directory.id}/</a>
                  <span className="tree-comment"># {directory.scope}</span>
                </p>
                <ul>
                  {directory.projects.map((project) => (
                    <li key={project.id}>
                      <a href={`#${project.id}`}>{project.id}</a>
                      <span className="tree-tag">{project.tag}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
