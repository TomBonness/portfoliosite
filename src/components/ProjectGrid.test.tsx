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

  it("keeps every signal node on the dotted path", () => {
    const { container } = render(<ProjectGrid projects={FEATURED_PROJECTS} />);
    const signalPath = container.querySelector(".signal-curve");
    const pathData = signalPath?.getAttribute("d") ?? "";
    const nodes = Array.from(container.querySelectorAll(".signal-node"));

    expect(signalPath).not.toBeNull();
    expect(nodes).toHaveLength(FEATURED_PROJECTS.length);

    for (const node of nodes) {
      const transform = node.getAttribute("transform") ?? "";
      const coordinate = transform.match(/^translate\((\d+) (\d+)\)$/);

      expect(coordinate).not.toBeNull();
      expect(pathData).toContain(`${coordinate?.[1]} ${coordinate?.[2]}`);
    }
  });
});
