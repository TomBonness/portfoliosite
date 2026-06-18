import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FEATURED_PROJECTS } from "@/data/projects";
import { ProjectGrid } from "./ProjectGrid";

const allProjectTitles = FEATURED_PROJECTS.map((project) => project.title);

const interactiveMathTitles = [
  "Jellybean Parliament",
  "Word Finder",
  "Monty's Ballroom",
  "Galton Decision-Tree",
  "Phyllotaxis",
  "Benford's Ledger",
] as const;

const cloudDataTitles = ["ChipGuard", "CloudSprouts"] as const;
const systemsToolsTitles = ["Quadsite", "OmpKickbacks"] as const;

function expectVisibleCards(titles: readonly string[]) {
  const cards = screen.getAllByTestId("project-card");
  expect(cards).toHaveLength(titles.length);

  const visibleTitles = cards.map((card) =>
    within(card).getByRole("heading", { level: 3 }).textContent,
  );

  expect(visibleTitles).toEqual([...titles]);

  for (const title of titles) {
    expect(screen.getByRole("heading", { level: 3, name: title })).toBeVisible();
  }
}

describe("ProjectGrid", () => {
  it("filters featured projects by category", async () => {
    const user = userEvent.setup();
    render(<ProjectGrid projects={FEATURED_PROJECTS} />);

    await user.click(screen.getByRole("button", { name: "Interactive math" }));
    expectVisibleCards(interactiveMathTitles);

    await user.click(screen.getByRole("button", { name: "Cloud & data" }));
    expectVisibleCards(cloudDataTitles);

    await user.click(screen.getByRole("button", { name: "Systems & tools" }));
    expectVisibleCards(systemsToolsTitles);

    await user.click(screen.getByRole("button", { name: "All" }));
    expectVisibleCards(allProjectTitles);
  });
});
