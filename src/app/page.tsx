import Image from "next/image";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SeedStudy } from "@/components/SeedStudy";
import { FEATURED_PROJECTS, LAB_PROJECTS, LAB_URL } from "@/data/projects";

const disciplines = [
  {
    title: "On the screen",
    description: "Interfaces, experiments, and tools for getting things done.",
    tools: "TypeScript · React · Next.js · Swift",
  },
  {
    title: "Under the hood",
    description:
      "The data pipelines and services that keep everything talking.",
    tools: "AWS · Python · PyTorch · Rust",
  },
  {
    title: "Out in the world",
    description: "Firmware, sensors, and the occasional thing with propellers.",
    tools: "C / C++ · ESP32 · ESP-IDF · MQTT",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <ScrollProgress />
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="Tom Bonness home">
            <span>
              Tom Bonness<span className="wordmark-period">.</span>
            </span>
          </a>
          <nav className="site-nav" aria-label="Portfolio sections">
            <a href="#lab">The lab</a>
            <a href="#work">Projects</a>
            <a href="#about">About</a>
            <a className="nav-contact" href="#contact">
              Say hello <Arrow />
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
          <div className="hero-copy">
            <h1 id="hero-title">
              I learn by
              <br />
              <em>making things.</em>
            </h1>
            <p className="hero-body">
              I’m Tom. I build tools I want to use, hardware I can hold, and
              little experiments that make the math click.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#lab">
                Step inside <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href="https://github.com/TomBonness">
                Browse the code <Arrow />
              </a>
            </div>
            <p className="hero-footnote">
              Software, hardware, and the interesting bits in between.
            </p>
          </div>
          <div className="hero-study">
            <SeedStudy />
          </div>
          <div className="hero-baseline mono">
            <span>A notebook of things I’ve made</span>
            <a href="#lab">
              Scroll to explore <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="lab-section" id="lab" aria-labelledby="lab-title">
          <div className="page-width">
            <ScrollReveal className="section-heading lab-heading">
              <div>
                <h2 id="lab-title">
                  Kettle Moraine
                  <br />
                  <em>Research Labs.</em>
                </h2>
              </div>
              <div className="section-intro">
                <p>
                  A home for the bigger builds. Hardware, voice tools, and
                  inference services, with each product’s progress out in the
                  open.
                </p>
                <a className="text-link" href={LAB_URL}>
                  Visit the lab <Arrow />
                </a>
              </div>
            </ScrollReveal>
            <div className="lab-grid">
              {LAB_PROJECTS.map((project, index) => (
                <article
                  className={`lab-card lab-card-${index}`}
                  key={project.id}
                  aria-labelledby={`lab-${project.id}`}
                >
                  <a
                    className="lab-visual"
                    href={project.href}
                    aria-label={`Explore ${project.title}`}
                  >
                    {project.id === "open-micro" ? (
                      <Image
                        src="/projects/open-micro.webp"
                        alt="Open Micro desktop controller concept with twelve keys, a dial, and illuminated edges"
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 800px) 50vw, 40vw"
                      />
                    ) : project.id === "lavtype" ? (
                      <div className="voice-art" aria-hidden="true">
                        <div className="voice-bars">
                          {Array.from({ length: 29 }, (_, i) => (
                            <span
                              key={i}
                              style={{
                                height: `${12 + Math.pow(Math.sin(i * 1.7), 2) * (1 - Math.abs(i - 14) / 20) * 74}px`,
                              }}
                            />
                          ))}
                        </div>
                        <span className="voice-phrase">
                          A thought,
                          <br />
                          <em>put into words.</em>
                        </span>
                      </div>
                    ) : (
                      <div className="inference-art" aria-hidden="true">
                        <svg viewBox="0 0 360 210">
                          <g fill="none" stroke="currentColor" strokeWidth=".8">
                            {Array.from({ length: 8 }, (_, i) => (
                              <ellipse
                                key={i}
                                cx="180"
                                cy="105"
                                rx="95"
                                ry={18 + i * 10}
                                transform={`rotate(${i * 22.5} 180 105)`}
                              />
                            ))}
                          </g>
                          <circle cx="180" cy="105" r="7" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                    <span className="visual-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                  <h3 id={`lab-${project.id}`}>
                    <a href={project.href}>{project.title}</a>
                  </h3>
                  <p className="lab-status">{project.status}</p>
                  <p>{project.summary}</p>
                  <p className="lab-detail">{project.detail}</p>
                  <a className="text-link" href={project.href}>
                    {project.linkLabel} <Arrow />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="work-section page-width"
          id="work"
          aria-labelledby="work-title"
        >
          <ScrollReveal className="section-heading">
            <div>
              <h2 id="work-title">
                A few useful things.
                <br />
                <em>A few curious ones.</em>
              </h2>
            </div>
            <p className="section-intro">
              Guess the jellybeans. Fly a quadcopter. Follow a sensor reading
              from the soil to the cloud. These are better opened than
              explained.
            </p>
          </ScrollReveal>
          <ProjectGrid projects={FEATURED_PROJECTS} />
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="page-width about-layout">
            <ScrollReveal className="about-heading">
              <h2 id="about-title">
                Hi, I’m Tom<span className="accent">.</span>
              </h2>
              <div className="about-sketch" aria-hidden="true">
                <span>make</span>
                <svg viewBox="0 0 120 55">
                  <path
                    d="M4 30C30 2 88 2 113 25m-12-19 13 20-24 5M113 42C82 60 28 52 8 36m4 17L7 35l22-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <span>understand</span>
              </div>
            </ScrollReveal>
            <div className="about-copy">
              <p className="about-lead">
                Some days it’s a web app.
                <br />
                Some days it’s a circuit board.
              </p>
              <p>
                I’m a developer based in Austin, Texas. My projects range from
                tiny macOS utilities to cloud-connected gardens and interactive
                probability experiments.
              </p>
              <p>
                I like being able to follow the whole thing: what the sensor
                measured, where the data went, and what someone sees on the
                other end. The browser is also a pretty good place to turn a
                confusing idea into something you can play with.
              </p>
              <a
                className="text-link"
                href="https://www.linkedin.com/in/bonness/"
              >
                More about me on LinkedIn <Arrow />
              </a>
            </div>
            <div className="discipline-grid">
              {disciplines.map((discipline) => (
                <div className="discipline" key={discipline.title}>
                  <h3>{discipline.title}</h3>
                  <p>{discipline.description}</p>
                  <p className="mono discipline-tools">{discipline.tools}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="site-footer page-width"
        aria-labelledby="contact-title"
      >
        <div className="footer-top">
          <div>
            <h2 id="contact-title">
              What are you
              <br />
              <em>working on?</em>
            </h2>
          </div>
          <div className="footer-contact">
            <p>
              A project, a question, or something you think I’d find
              interesting. I’d like to hear it.
            </p>
            <a
              className="button button-primary"
              href="https://www.linkedin.com/in/bonness/"
            >
              Let’s talk on LinkedIn <Arrow />
            </a>
            <a className="text-link" href="https://github.com/TomBonness">
              Find me on GitHub <Arrow />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <a className="wordmark" href="#top">
            Tom Bonness.
          </a>
          <span className="mono">
            Made with care. And quite a few iterations.
          </span>
          <a className="mono back-top" href="#top">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
