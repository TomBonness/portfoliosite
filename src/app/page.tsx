import { Icon } from "@/components/Icon";
import { Neofetch } from "@/components/Neofetch";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectLinks, Stack } from "@/components/ProjectParts";
import { Prompt, WindowBar } from "@/components/Terminal";
import { WorkTree } from "@/components/WorkTree";
import { ALSO, CHAPTERS, PROFILE, TOOLBOX } from "@/data/projects";

const ALSO_CARDS = ALSO.filter((project) => project.figure);
const ALSO_ROWS = ALSO.filter((project) => !project.figure);

/** The header's tabs, numbered like tmux windows. */
const TABS = [
  ...CHAPTERS.map((chapter) => ({ id: chapter.id, label: chapter.id })),
  { id: "about", label: "about" },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap header-row">
          <a className="wordmark" href="#top">
            <span className="user">tom</span>
            <span className="at">@</span>
            <span className="host">bonness</span>
          </a>
          <nav className="site-nav" aria-label="Primary">
            <ul>
              {TABS.map((tab, index) => (
                <li key={tab.id}>
                  <a href={`#${tab.id}`}>
                    <span className="tab-index" aria-hidden="true">
                      {index}:
                    </span>
                    {tab.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="button button-small" href="#contact">
            Contact
          </a>
        </div>
      </header>

      <main id="top">
        <section className="wrap hero">
          <div className="window hero-window">
            <WindowBar title="tom@bonness: ~/portfolio" />
            <div className="hero-body">
              <div className="hero-main">
                <p className="powerline" aria-hidden="true">
                  <span className="segment">tom</span>
                  <span className="segment">~/portfolio</span>
                  <span className="segment">main</span>
                </p>
                <p className="command" aria-hidden="true">
                  <Icon name="chevron-right" />
                  <span className="typed">whoami</span>
                  <span className="caret" />
                </p>
                <h1 id="content" tabIndex={-1}>
                  I make systems <span className="hl-fast">fast</span>,
                  <br /> then <span className="hl-run">boring to run</span>.
                </h1>
                <p className="lede">
                  I’m Tom Bonness, a software engineer in Austin. I write the
                  fast part, then pin it, package it, deploy it and measure it,
                  so it runs the same way every time.
                </p>
                <div className="actions">
                  <a className="button button-primary" href="#work">
                    <Icon name="corner-down-left" />
                    See the work
                  </a>
                  <a className="button" href={PROFILE.github}>
                    GitHub
                    <Icon name="arrow-up-right" />
                  </a>
                  <a className="button" href={PROFILE.linkedin}>
                    LinkedIn
                    <Icon name="arrow-up-right" />
                  </a>
                </div>
              </div>
              <div className="hero-side">
                <p className="command" aria-hidden="true">
                  <Icon name="chevron-right" />
                  neofetch
                </p>
                <Neofetch />
              </div>
            </div>
          </div>
        </section>

        <WorkTree />

        {CHAPTERS.map((chapter) => (
          <section
            className={`wrap chapter hue-${chapter.id}`}
            id={chapter.id}
            key={chapter.id}
          >
            <header className="chapter-head">
              <Prompt path={`~/${chapter.id}`} command="ls" />
              <h2>{chapter.title}</h2>
              <p>{chapter.intro}</p>
            </header>
            <div className="chapter-rows">
              {chapter.rows.map((row) =>
                row.length === 1 ? (
                  <ProjectCard key={row[0].id} project={row[0]} dir={chapter.id} />
                ) : (
                  <div className="pair" key={row[0].id}>
                    {row.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        dir={chapter.id}
                      />
                    ))}
                  </div>
                ),
              )}
            </div>
          </section>
        ))}

        <section className="wrap chapter hue-also" id="also">
          <header className="chapter-head">
            <Prompt path="~/also" command="ls" />
            <h2>Also</h2>
            <p>Earlier end-to-end builds and small tools</p>
          </header>
          <div className="chapter-rows">
            <div className="pair">
              {ALSO_CARDS.map((project) => (
                <ProjectCard key={project.id} project={project} dir="also" />
              ))}
            </div>
            <div className="window">
              <WindowBar title="~/also/tools" />
              <ul>
                {ALSO_ROWS.map((project) => (
                  <li className="listing-row" id={project.id} key={project.id}>
                    <h3>{project.title}</h3>
                    <p className="summary">{project.summary}</p>
                    <Stack items={project.stack} />
                    <ProjectLinks title={project.title} links={project.links} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="wrap chapter hue-about" id="about">
          <header className="chapter-head">
            <Prompt path="~/about" command="cat about.md" />
            <h2>About</h2>
          </header>
          <div className="window">
            <WindowBar title="~/about/about.md" />
            <div className="about-body">
              <div className="about-copy">
                <p>
                  I’m a software engineer in {PROFILE.location}. Most of my
                  work sits where a fast program becomes a dependable service:
                  I write the engine, then pin it, package it, deploy it and
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
              <div className="toolbox">
                <p className="command" aria-hidden="true">
                  <Icon name="chevron-right" />
                  ls ~/toolbox
                </p>
                <dl>
                  {TOOLBOX.map((group) => (
                    <div key={group.label} data-group={group.label}>
                      <dt>{group.label}/</dt>
                      <dd>
                        <ul>
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap site-footer">
        <div className="window contact" id="contact">
          <WindowBar title="~/contact" />
          <div className="contact-body">
            <p className="command" aria-hidden="true">
              <Icon name="chevron-right" />
              echo $MESSAGE
            </p>
            <h2>
              Got a system that should be faster, or quieter at 3&nbsp;a.m.?
            </h2>
            <p className="lede">
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
        </div>
        <div className="statusbar">
          <p>
            <span className="session">tom@bonness</span>
            {PROFILE.location}
          </p>
          <a className="link" href={PROFILE.siteSource}>
            Source for this site
            <Icon name="arrow-up-right" />
          </a>
        </div>
      </footer>
    </>
  );
}
