import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { Preflight } from "@/components/Preflight";
import { ProjectFeature } from "@/components/ProjectFeature";
import { ProjectLinks } from "@/components/ProjectParts";
import { ProjectRow } from "@/components/ProjectRow";
import { Race } from "@/components/Race";
import { WeekChart } from "@/components/WeekChart";
import {
  ALSO,
  CHAPTERS,
  type Chapter,
  PROFILE,
  SCREENSHOT,
  TOOLBOX,
} from "@/data/projects";

/** Each chapter has one visual, and the visual decides how its feature is laid out. */
const VISUALS: Record<
  Chapter["visual"],
  { layout: "split" | "flipped" | "stacked"; node: ReactNode }
> = {
  preflight: { layout: "split", node: <Preflight /> },
  week: { layout: "flipped", node: <WeekChart /> },
  screenshot: {
    layout: "stacked",
    node: (
      <figure className="visual shot">
        <Image
          src={SCREENSHOT.src}
          alt={SCREENSHOT.alt}
          width={SCREENSHOT.width}
          height={SCREENSHOT.height}
        />
        <figcaption>
          The Linux app, where each tab on the left is a live tmux session
        </figcaption>
      </figure>
    ),
  },
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="wordmark" href="#top">
            {PROFILE.name}
          </a>
          <nav className="site-nav" aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#about">About</a>
          </nav>
          <span className="availability">Open to new roles</span>
          <a className="button button-small" href="#contact">
            Contact
          </a>
        </div>
      </header>

      <main id="main">
        <section className="wrap hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              I make systems fast,
              <br className="wide-only" /> then make them
              <br className="wide-only" /> boring to run
            </h1>
            <p className="lede">
              I’m Tom Bonness, a software engineer in Austin. I write
              performance-critical software, then pin, package and deploy it
              so it runs the same way twice.
            </p>
            <div className="actions">
              <a className="button button-primary" href="#work">
                See the work
                <Icon name="arrow-down" />
              </a>
              <a className="button" href={PROFILE.github}>
                GitHub
                <Icon name="arrow-up-right" />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <Race />
          </div>
        </section>

        <div id="work">
          {CHAPTERS.map((chapter) => {
            const visual = VISUALS[chapter.visual];

            return (
              <section
                className="wrap"
                key={chapter.id}
                aria-labelledby={`${chapter.id}-title`}
              >
                <div className="chapter">
                  <header className="chapter-head">
                    <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
                    <p>{chapter.intro}</p>
                  </header>
                  <ProjectFeature project={chapter.feature} layout={visual.layout}>
                    {visual.node}
                  </ProjectFeature>
                  <ul className="rows">
                    {chapter.rest.map((project) => (
                      <ProjectRow key={project.id} project={project} />
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}

          <section className="wrap" aria-labelledby="also-title">
            <div className="chapter">
              <header className="chapter-head">
                <h2 id="also-title">Also</h2>
                <p>Earlier end-to-end builds and small tools</p>
              </header>
              <ul className="rows">
                {ALSO.map((project) => (
                  <li className="row" id={project.id} key={project.id}>
                    <h3>{project.title}</h3>
                    <p className="row-body row-summary">{project.summary}</p>
                    <p className="stack">{project.stack}</p>
                    <ProjectLinks title={project.title} links={project.links} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section className="wrap" id="about" aria-labelledby="about-title">
          <div className="chapter">
            <header className="chapter-head">
              <h2 id="about-title">About</h2>
            </header>
            <div className="about">
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
                <ul className="project-links">
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
          </div>
        </section>
      </main>

      <footer className="wrap" id="contact" aria-labelledby="contact-title">
        <div className="chapter contact">
          <h2 id="contact-title">
            Got a system that should be faster, or quieter at 3&nbsp;a.m.?
          </h2>
          <p>
            I’m open to site reliability, DevOps and software engineering roles
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
          <span>
            {PROFILE.name}, {PROFILE.location}
          </span>
          <a className="link" href={PROFILE.siteSource}>
            Source for this site
            <Icon name="arrow-up-right" />
          </a>
        </div>
      </footer>
    </>
  );
}
