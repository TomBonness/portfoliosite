import { Fragment, type ReactNode } from "react";
import { WORKFLOW } from "@/data/projects";

/** Quoted strings and `${{ }}` expressions inside a YAML value. */
const VALUE_TOKENS = /(\$\{\{[^}]*\}\}|"[^"]*"|'[^']*')/;

/** Colors one line of YAML: the key, then any strings and expressions in its value. */
function highlight(text: string): ReactNode {
  const match = /^(\s*)(- )?([\w-]+)(:)(.*)$/.exec(text);
  if (!match) {
    return text;
  }

  const [, indent, dash, key, colon, value] = match;

  return (
    <>
      {indent}
      {dash ? <span className="tok-punct">{dash}</span> : null}
      <span className="tok-key">{key}</span>
      <span className="tok-punct">{colon}</span>
      {value.split(VALUE_TOKENS).map((part, index) => {
        if (part.startsWith("${{")) {
          return (
            <span className="tok-expr" key={index}>
              {part}
            </span>
          );
        }
        if (part.startsWith('"') || part.startsWith("'")) {
          return (
            <span className="tok-string" key={index}>
              {part}
            </span>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

/** distributr's deploy job as it appears in the repository, with skipped lines marked. */
export function Workflow() {
  return (
    <figure className="screen">
      <div className="screen-body">
        <p className="screen-file">{WORKFLOW.file}</p>
        <pre className="code">
          <code>
            {WORKFLOW.lines.map((line, index) => {
              const skipped =
                index > 0 && line.n !== WORKFLOW.lines[index - 1].n + 1;

              return (
                <Fragment key={line.n}>
                  {skipped ? (
                    <span className="line line-skip" aria-hidden="true" />
                  ) : null}
                  <span
                    className="line"
                    data-mark={"mark" in line ? "" : undefined}
                  >
                    <span className="ln" aria-hidden="true">
                      {line.n}
                    </span>
                    <span className="lc">{highlight(line.text)}</span>
                  </span>
                </Fragment>
              );
            })}
          </code>
        </pre>
      </div>
      <figcaption>
        The deploy job: a role assumed over OIDC for this run only, then a smoke
        check against /healthz
      </figcaption>
    </figure>
  );
}
