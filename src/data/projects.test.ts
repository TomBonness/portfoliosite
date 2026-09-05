import { describe, expect, it } from "vitest";
import { FEATURED_PROJECTS } from "./projects";

describe("FEATURED_PROJECTS", () => {
  it("keeps project identifiers unique", () => {
    const ids = FEATURED_PROJECTS.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("links confirmed repositories to the owner's GitHub account", () => {
    const confirmedRepoLinks = FEATURED_PROJECTS.flatMap((project) =>
      project.repoLinks.filter((repoLink) => repoLink.status === "confirmed"),
    );

    for (const repoLink of confirmedRepoLinks) {
      expect(repoLink.href).toMatch(/^https:\/\/github\.com\/TomBonness\//);
    }
  });
});
