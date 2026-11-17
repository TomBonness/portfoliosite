import { Icon } from "@/components/Icon";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectLinks } from "@/components/ProjectParts";
import { ALSO, CHAPTERS, PROFILE, TOOLBOX } from "@/data/projects";

const ALSO_CARDS = ALSO.filter((project) => project.figure);
const ALSO_ROWS = ALSO.filter((project) => !project.figure);

/** Where "work" starts: the first chapter. */
const WORK = `#${CHAPTERS[0].id}`;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap header-row">
          <a className="wordmark" href="#top">
            {PROFILE.name}
          </a>
          <p className="availability">Open to new roles</p>
          <nav className="site-nav" aria-label="Primary">
            <ul>
              <li>
                <a href={WORK}>Work</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a className="button button-small" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="wrap intro">
          <h1 id="content" tabIndex={-1}>
            I make systems <span className="word-fast">fast</span>,
            <br /> then make them{" "}
            <span className="word-run">boring to run</span>
          </h1>
          <p className="lede">
            I’m Tom Bonness, a software engineer in Austin. I write
            performance-critical software, then pin, package and deploy it so
            it runs the same way twice.
          </p>
          <div className="actions">
            <a className="button button-primary" href={WORK}>
              See the work
              <Icon name="arrow-down" />
            </a>
            <a className="button" href={PROFILE.github}>
              GitHub
              <Icon name="arrow-up-right" />
            </a>
          </div>
          <nav className="index" aria-label="Work">
            <ul>
              {CHAPTERS.map((chapter) => (
                <li className={`hue-${chapter.id}`} key={chapter.id}>
                  <a className="index-chapter" href={`#${chapter.id}`}>
                    {chapter.title}
                    <Icon name="arrow-down" />
                  </a>
                  <p>{chapter.scope}</p>
                  <ul>
                    {chapter.rows.flat().map((project) => (
                      <li key={project.id}>
                        <a href={`#${project.id}`}>{project.title}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {CHAPTERS.map((chapter) => (
          <section
            className={`wrap chapter hue-${chapter.id}`}
            id={chapter.id}
            key={chapter.id}
          >
            <header className="chapter-head">
              <h2>{chapter.title}</h2>
              <p>{chapter.intro}</p>
            </header>
            <div className="chapter-rows">
              {chapter.rows.map((row) =>
                row.length === 1 ? (
                  <ProjectCard key={row[0].id} project={row[0]} />
                ) : (
                  <div className="pair" key={row[0].id}>
                    {row.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ),
              )}
            </div>
          </section>
        ))}

        <section className="wrap chapter" id="also">
          <header className="chapter-head">
            <h2>Also</h2>
            <p>Earlier end-to-end builds and small tools</p>
          </header>
          <div className="chapter-rows">
            <div className="pair">
              {ALSO_CARDS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <ul>
              {ALSO_ROWS.map((project) => (
                <li className="row" id={project.id} key={project.id}>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <p className="stack">{project.stack}</p>
                  <ProjectLinks title={project.title} links={project.links} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="wrap chapter" id="about">
          <header className="chapter-head">
            <h2>About</h2>
          </header>
          <div className="about">
            <div className="about-copy">
              <p>
                I’m a software engineer in {PROFILE.location}. Most of my work
                sits where a fast program becomes a dependable service: I
                write the engine, then pin it, package it, deploy it and
                measure it.
              </p>
              <p>
                The larger builds are published through Kettle Moraine
                Research Labs, my own lab.
              </p>
              <ul className="links">
                <li>
                  <a className="link" href={PROFILE.lab}>
                    Kettle Moraine Research Labs
                    <Icon name="arrow-up-right" />
                  </a>
                </li>
                <li>
                  <a className="link" href={PROFILE.linkedin}>
                    LinkedIn
                    <Icon name="arrow-up-right" />
                  </a>
                </li>
              </ul>
            </div>
            <dl className="toolbox">
              {TOOLBOX.map((group) => (
                <div key={group.label}>
                  <dt>{group.label}</dt>
                  <dd>{group.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="contact" id="contact">
            <div className="strip" aria-hidden="true">
              {CHAPTERS.map((chapter) => (
                <span className={`hue-${chapter.id}`} key={chapter.id} />
              ))}
            </div>
            <h2>
              Got a system that should be faster, or quieter at 3&nbsp;a.m.?
            </h2>
            <p>
              I’m open to site reliability, DevOps and software engineering
              roles
            </p>
            <div className="actions">
              <a className="button button-primary" href={PROFILE.linkedin}>
                Message me on LinkedIn
                <Icon name="arrow-up-right" />
              </a>
              <a className="button" href={PROFILE.github}>
                GitHub
                <Icon name="arrow-up-right" />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              {PROFILE.name}, {PROFILE.location}
            </p>
            <a className="link" href={PROFILE.siteSource}>
              Source for this site
              <Icon name="arrow-up-right" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
