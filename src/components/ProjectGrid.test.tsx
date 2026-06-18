import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FEATURED_PROJECTS } from "@/data/projects";
import { ProjectGrid } from "./ProjectGrid";

const filterButtonNames = [
  "Interactive math",
  "Cloud & data",
  "Systems & tools",
  "All",
] as const;

function getProjectCard(title: string) {
  const card = screen
    .getAllByTestId("project-card")
    .find((candidate) =>
      within(candidate).queryByRole("heading", { level: 3, name: title }),
    );

  if (!card) {
    throw new Error(`Missing project card: ${title}`);
  }

  return card;
}

describe("ProjectGrid", () => {
  it("renders every featured project without category filters", () => {
    render(<ProjectGrid projects={FEATURED_PROJECTS} />);

    for (const filterButtonName of filterButtonNames) {
      expect(
        screen.queryByRole("button", { name: filterButtonName }),
      ).not.toBeInTheDocument();
    }

    const cards = screen.getAllByTestId("project-card");
    expect(cards).toHaveLength(11);

    const visibleTitles = cards.map((card) =>
      within(card).getByRole("heading", { level: 3 }).textContent,
    );

    expect(visibleTitles).toEqual(
      FEATURED_PROJECTS.map((project) => project.title),
    );
    expect(visibleTitles.at(-1)).toBe("Don't Switch Mics");
  });

  it("renders dontswitchmics repo only and preserves private repo badges", () => {
    render(<ProjectGrid projects={FEATURED_PROJECTS} />);

    const dontSwitchMicsCard = getProjectCard("Don't Switch Mics");
    expect(
      within(dontSwitchMicsCard).getByRole("link", { name: "GitHub" }),
    ).toHaveAttribute("href", "https://github.com/TomBonness/dontswitchmics");
    expect(
      within(dontSwitchMicsCard).queryByRole("link", { name: "Live site" }),
    ).not.toBeInTheDocument();

    for (const privateProjectTitle of ["Benford's Ledger", "OmpKickbacks"]) {
      const privateProjectCard = getProjectCard(privateProjectTitle);

      expect(
        within(privateProjectCard).getByText("Repo not public yet"),
      ).toBeInTheDocument();
      expect(
        within(privateProjectCard).queryByRole("link", {
          name: "Repo not public yet",
        }),
      ).not.toBeInTheDocument();
    }
  });

  it("keeps signal nodes on a spacious three-row runway", () => {
    const { container } = render(<ProjectGrid projects={FEATURED_PROJECTS} />);
    const svg = container.querySelector("svg");
    const signalCurve = container.querySelector(".signal-curve");
    const signalConnector = container.querySelector(".signal-connector");
    const nodes = Array.from(container.querySelectorAll(".signal-node"));

    expect(svg?.getAttribute("viewBox")).toBe("0 0 420 270");
    expect(signalCurve?.getAttribute("d")).toBe(
      "M34 48 H316 M80 132 H362 M128 222 H316",
    );
    expect(signalConnector?.getAttribute("d")).toBe(
      "M316 48 V132 M80 132 V222",
    );
    expect(nodes).toHaveLength(FEATURED_PROJECTS.length);

    const centers = nodes.map((node) => {
      const transform = node.getAttribute("transform") ?? "";
      const match = transform.match(/^translate\((\d+) (\d+)\)$/);

      if (!match) {
        throw new Error(`Invalid signal node transform: ${transform}`);
      }

      return {
        transform,
        x: Number(match[1]),
        y: Number(match[2]),
      };
    });

    expect(new Set(centers.map(({ transform }) => transform)).size).toBe(11);
    expect(
      nodes
        .find((node) => node.getAttribute("aria-label") === "08 OmpKickbacks")
        ?.getAttribute("transform"),
    ).toBe("translate(362 132)");

    let minimumDistance = Number.POSITIVE_INFINITY;

    for (const [index, center] of centers.entries()) {
      for (const comparison of centers.slice(index + 1)) {
        minimumDistance = Math.min(
          minimumDistance,
          Math.hypot(center.x - comparison.x, center.y - comparison.y),
        );
      }
    }

    expect(minimumDistance).toBeGreaterThanOrEqual(90);
  });

  it("preserves project card layout hooks", () => {
    const { container } = render(<ProjectGrid projects={FEATURED_PROJECTS} />);
    const shells = Array.from(
      container.querySelectorAll(
        ".project-grid > .project-reveal > .project-card-shell[data-project-id]",
      ),
    );

    expect(shells).toHaveLength(FEATURED_PROJECTS.length);

    for (const shell of shells) {
      const cards = shell.querySelectorAll(
        '[data-testid="project-card"].project-card',
      );

      expect(cards).toHaveLength(1);
      expect(cards[0]?.querySelector(".project-index")).not.toBeNull();
      expect(cards[0]?.querySelector(".project-category")).not.toBeNull();
      expect(cards[0]?.querySelector(".teaching-angle")).not.toBeNull();
      expect(cards[0]?.querySelector(".stack-list")).not.toBeNull();
      expect(cards[0]?.querySelector(".project-links")).not.toBeNull();
    }
  });
});
