import { fireEvent, render, screen, within } from "@testing-library/react";
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

  it("replaces the signal map with an editorial project index", () => {
    const { container } = render(<ProjectGrid projects={FEATURED_PROJECTS} />);

    expect(container.querySelector(".signal-field")).toBeNull();
    expect(container.querySelector(".signal-node")).toBeNull();
    expect(
      screen.queryByRole("img", { name: /project signal map/i }),
    ).not.toBeInTheDocument();

    const overview = container.querySelector(".project-overview");
    expect(overview).not.toBeNull();

    const items = Array.from(
      container.querySelectorAll(".project-overview-item[data-project-id]"),
    );
    expect(items).toHaveLength(FEATURED_PROJECTS.length);
    expect(items.map((item) => item.getAttribute("data-project-id"))).toEqual(
      FEATURED_PROJECTS.map((project) => project.id),
    );
    expect(
      within(overview as HTMLElement).getAllByRole("button"),
    ).toHaveLength(FEATURED_PROJECTS.length);

    const firstItem = items[0] as HTMLElement;
    expect(firstItem).toHaveTextContent("01");
    expect(firstItem).toHaveTextContent("Jellybean Parliament");
    const lastItem = items.at(-1) as HTMLElement;
    expect(lastItem).toHaveTextContent("11");
    expect(lastItem).toHaveTextContent("Don't Switch Mics");
  });

  it("mirrors the active project between the index and the cards", () => {
    const { container } = render(<ProjectGrid projects={FEATURED_PROJECTS} />);
    const target = FEATURED_PROJECTS[2];
    const item = container.querySelector(
      `.project-overview-item[data-project-id="${target.id}"]`,
    ) as HTMLElement;
    const button = within(item).getByRole("button");

    fireEvent.mouseEnter(button);
    expect(item).toHaveAttribute("data-active", "true");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(
      container.querySelector(
        `.project-card-shell[data-project-id="${target.id}"] .project-card`,
      ),
    ).toHaveAttribute("data-active", "true");

    fireEvent.mouseLeave(button);
    expect(item).toHaveAttribute("data-active", "false");
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
