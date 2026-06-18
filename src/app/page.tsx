import { ProjectGrid } from "@/components/ProjectGrid";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FEATURED_PROJECTS } from "@/data/projects";

const teachingCards = [
  {
    title: "Crowd intelligence",
    body: "Jellybean Parliament and Word Finder turn anonymous visitor behavior into visible aggregate patterns, making distribution, rediscovery, and collective judgment easier to inspect.",
  },
  {
    title: "Mathematical intuition",
    body: "Monty's Ballroom, Galton Decision-Tree, Phyllotaxis, and Benford's Ledger expose the mechanism behind probability, convergence, packing, and forensic statistics instead of hiding it behind formulas.",
  },
  {
    title: "Cloud instrumentation",
    body: "ChipGuard and CloudSprouts make telemetry, drift, sensor readings, and API-backed system state readable from the browser so the data path stays explainable.",
  },
] as const;

const stackGroups = [
  {
    title: "Frontend",
    skills: ["TypeScript", "React", "Next.js", "Vite", "TailwindCSS/CSS"],
  },
  {
    title: "Cloud / backend",
    skills: [
      "AWS Amplify",
      "Lambda",
      "DynamoDB",
      "API Gateway",
      "AWS IoT Core",
    ],
  },
  {
    title: "ML / data",
    skills: ["PyTorch", "Flask", "SQLite", "drift detection"],
  },
  {
    title: "Embedded / low-level",
    skills: ["C", "C++", "Rust", "ESP32", "ESP-IDF", "MQTT"],
  },
] as const;

export default function Home() {
  return (
    <>
      <header className="site-header" aria-label="Primary navigation">
        <ScrollProgress />
        <a className="wordmark" href="#top" aria-label="Tom Bonness home">
          TB
        </a>
        <nav className="site-nav" aria-label="Portfolio sections">
          <a href="#work">Work</a>
          <a href="#teaching">Teaching</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/TomBonness">GitHub</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-grid" aria-labelledby="hero-title">
          <ScrollReveal className="hero-copy">
            <p className="eyebrow">TOM BONNESS — DEVELOPER PORTFOLIO</p>
            <h1 id="hero-title" className="hero-title">
              <span>Systems,</span>
              <span>sensors,</span>
              <span>and mathematical</span>
              <span>worlds for the web.</span>
            </h1>
            <p className="hero-body">
              I build full-stack experiments and developer tools: AWS-backed
              visualizations, embedded sensor pipelines, and interfaces that
              make hard ideas inspectable.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-primary" href="#work">
                View selected work
              </a>
              <a className="button button-secondary" href="https://github.com/TomBonness">
                GitHub
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal className="hero-specimen" delay={100}>
            <p className="specimen-kicker">Austin, TX // 11 featured systems</p>
            <div className="specimen-stack" aria-hidden="true">
              <span>BUILD</span>
              <span>MEASURE</span>
              <span>EXPLAIN</span>
              <span>SHIP</span>
            </div>
            <ul className="specimen-list" aria-label="Portfolio focus areas">
              <li>terminal tools</li>
              <li>embedded sensors</li>
              <li>AI harnesses</li>
              <li>cloud pipelines</li>
            </ul>
          </ScrollReveal>
        </section>

        <section
          id="work"
          className="page-section work-section"
          aria-labelledby="work-title"
        >
          <ScrollReveal className="section-heading">
            <p className="eyebrow">01 // SELECTED WORK</p>
            <h2 id="work-title">Selected work</h2>
            <p>
              Eleven public experiments, cloud dashboards, native utilities,
              and tools with a bias toward making the system visible.
            </p>
          </ScrollReveal>
          <ProjectGrid projects={FEATURED_PROJECTS} />
        </section>

        <section
          id="teaching"
          className="page-section teaching-section"
          aria-labelledby="teaching-title"
        >
          <ScrollReveal className="section-heading" direction="left">
            <p className="eyebrow">02 // TEACHING SURFACE</p>
            <h2 id="teaching-title">Teaching through interfaces</h2>
            <p>
              The math and systems projects are framed as developer work, but
              they also use the browser as a teaching surface: users can guess,
              perturb, audit, fly, and inspect instead of just reading.
            </p>
          </ScrollReveal>

          <div className="teaching-grid">
            {teachingCards.map((card, index) => (
              <ScrollReveal
                className="teaching-card"
                delay={index * 90}
                direction={index % 2 === 0 ? "left" : "right"}
                key={card.title}
              >
                <span className="card-index">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section
          id="stack"
          className="page-section stack-section"
          aria-labelledby="stack-title"
        >
          <ScrollReveal className="section-heading" direction="right">
            <p className="eyebrow">03 // STACK</p>
            <h2 id="stack-title">Stack</h2>
            <p>
              Tools used across terminal tools, embedded sensors, AI harnesses,
              cloud pipelines, and fun math stuff.
            </p>
          </ScrollReveal>

          <div className="stack-grid">
            {stackGroups.map((group, index) => (
              <ScrollReveal
                className="stack-card"
                delay={index * 80}
                direction={index % 2 === 0 ? "right" : "left"}
                key={group.title}
              >
                <h3>{group.title}</h3>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="page-section site-footer"
        aria-labelledby="contact-title"
      >
        <ScrollReveal className="section-heading" direction="left">
          <p className="eyebrow">04 // CONTACT</p>
          <h2 id="contact-title">Contact</h2>
          <p>
            Find Tom Bonness on GitHub and LinkedIn. No contact forms, runtime
            data fetches, or server endpoints on this static portfolio.
          </p>
        </ScrollReveal>
        <ScrollReveal className="footer-links" delay={120} direction="right">
          <a href="https://github.com/TomBonness">GitHub</a>
          <a href="https://www.linkedin.com/in/bonness/">LinkedIn</a>
        </ScrollReveal>
      </footer>
    </>
  );
}
