import { ProjectCard } from "@/components/ProjectCard";
import { ProjectEntry } from "@/components/ProjectEntry";
import { Arrow } from "@/components/ProjectMeta";
import {
  PROFILE,
  PROOF,
  SMALL_TOOLS,
  TOOLBOX,
  WORK_SECTIONS,
} from "@/data/projects";

/** Projects are numbered once, across every section. */
const NUMBERED_SECTIONS = WORK_SECTIONS.map((section, index) => {
  const offset = WORK_SECTIONS.slice(0, index).reduce(
    (count, earlier) => count + earlier.projects.length,
    0,
  );

  return {
    ...section,
    projects: section.projects.map((project, position) => ({
      project,
      number: String(offset + position + 1).padStart(2, "0"),
    })),
  };
});

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner page-width">
          <a className="wordmark" href="#top">
            {PROFILE.name}
          </a>
          <nav className="site-nav" aria-label="Sections">
            <a href="#work">Work</a>
            <a className="nav-optional" href="#toolbox">
              Toolbox
            </a>
            <a className="nav-optional" href="#about">
              About
            </a>
            <a className="nav-cta" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section
          className="hero page-width"
          id="top"
          aria-labelledby="hero-title"
        >
          <p className="eyebrow">
            <span>Software engineer · {PROFILE.location}</span>
            <span className="status">
              <i className="status-dot" aria-hidden="true" />
              Open to new roles
            </span>
          </p>
          <h1 id="hero-title">
            I make systems fast,
            <br />
            then make them <em>boring to run.</em>
          </h1>
          <p className="hero-lede">
            I build performance-critical software and the infrastructure around
            it: deployments pinned to a hash, pipelines that ship without stored
            keys, and engines measured before and after every change.
          </p>
          <div className="hero-actions">
            <a className="button" href="#work">
              See the work <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href={PROFILE.github}>
              GitHub <Arrow />
            </a>
            <a className="text-link" href={PROFILE.linkedin}>
              LinkedIn <Arrow />
            </a>
          </div>
          <dl className="proof">
            {PROOF.map((metric) => (
              <div key={metric.value}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div id="work">
          {NUMBERED_SECTIONS.map((section) => (
            <section
              className="band page-width"
              key={section.id}
              aria-labelledby={`${section.id}-title`}
            >
              <div className="band-inner">
                <div className="rail">
                  <h2 id={`${section.id}-title`}>{section.title}</h2>
                  <p>{section.intro}</p>
                </div>
                {section.layout === "full" ? (
                  <div className="entries">
                    {section.projects.map(({ project, number }) => (
                      <ProjectEntry
                        key={project.id}
                        project={project}
                        number={number}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="cards">
                    {section.projects.map(({ project, number }) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        number={number}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

          <section className="band page-width" aria-labelledby="tools-title">
            <div className="band-inner">
              <div className="rail">
                <h2 id="tools-title">Small tools</h2>
                <p>Finished utilities that each fix one annoyance.</p>
              </div>
              <ul className="tools">
                {SMALL_TOOLS.map((tool) => (
                  <li className="tool" key={tool.id}>
                    <h3>
                      <a href={tool.href}>
                        {tool.title} <Arrow />
                      </a>
                    </h3>
                    <p className="tool-language">{tool.language}</p>
                    <p className="tool-summary">{tool.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section
          className="band page-width"
          id="toolbox"
          aria-labelledby="toolbox-title"
        >
          <div className="band-inner">
            <div className="rail">
              <h2 id="toolbox-title">Toolbox</h2>
              <p>Only what the work above actually uses.</p>
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

        <section
          className="band page-width"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="band-inner">
            <div className="rail">
              <h2 id="about-title">About</h2>
            </div>
            <div className="about">
              <p className="about-lede">
                Most of my work sits where a fast program becomes a dependable
                service.
              </p>
              <p>
                I’m a software engineer in {PROFILE.location}. I write the
                engine, then pin it, package it, deploy it and measure it,
                because a speedup that can’t be reproduced or rolled out safely
                isn’t finished.
              </p>
              <p>
                The larger builds are published through Kettle Moraine Research
                Labs, my own lab. The smaller ones live on GitHub.
              </p>
              <div className="about-links">
                <a className="text-link" href={PROFILE.lab}>
                  Kettle Moraine Research Labs <Arrow />
                </a>
                <a className="text-link" href={PROFILE.linkedin}>
                  LinkedIn <Arrow />
                </a>
                <a className="text-link" href={PROFILE.github}>
                  GitHub <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="site-footer page-width"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="contact">
          <h2 id="contact-title">
            Got a system that should be faster, or{" "}
            <em>quieter at 3&nbsp;a.m.?</em>
          </h2>
          <div className="contact-body">
            <p>
              I’m open to site reliability, DevOps and software engineering
              roles. LinkedIn is the quickest way to reach me.
            </p>
            <div className="contact-actions">
              <a className="button" href={PROFILE.linkedin}>
                Message me on LinkedIn <Arrow />
              </a>
              <a className="text-link" href={PROFILE.github}>
                GitHub <Arrow />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            {PROFILE.name} · {PROFILE.location}
          </span>
          <span>
            A static export on AWS Amplify. Tests, typecheck and lint gate every
            deploy. <a href={PROFILE.siteSource}>Source</a>
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
