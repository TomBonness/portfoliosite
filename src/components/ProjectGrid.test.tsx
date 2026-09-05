import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProjectGrid } from "./ProjectGrid";

describe("ProjectGrid", () => {
  it("filters by category and restores excluded projects", async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);
    await user.click(screen.getByRole("button", { name: "Cloud & data" }));
    expect(
      screen.getByRole("article", { name: "CloudSprouts" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("article", { name: "ChipGuard" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("article", { name: "Jellybean Parliament" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("article", { name: "Don't Switch Mics" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cloud & data" }),
    ).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "Everything" }));
    expect(
      screen.getByRole("article", { name: "Jellybean Parliament" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("article", { name: "Don't Switch Mics" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cloud & data" }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("opens source-only projects without inventing live or private repository links", () => {
    render(<ProjectGrid />);
    const microphone = within(
      screen.getByRole("article", { name: "Don't Switch Mics" }),
    );
    expect(
      microphone.getByRole("link", { name: "Explore Don't Switch Mics" }),
    ).toHaveAttribute("href", "https://github.com/TomBonness/dontswitchmics");
    expect(
      microphone.queryByRole("link", { name: "Live site" }),
    ).not.toBeInTheDocument();
    for (const title of ["Benford's Ledger", "OmpKickbacks"]) {
      const project = within(screen.getByRole("article", { name: title }));
      expect(project.getByRole("link", { name: "Live site" })).toHaveAttribute(
        "href",
      );
      expect(
        project.queryByRole("link", { name: /source|github|repo/i }),
      ).not.toBeInTheDocument();
    }
  });
});
