import { describe, expect, it } from "vitest";
import { FEATURED_PROJECTS } from "./projects";

const expectedLiveUrls = [
  "https://jellybeanparliament.com/",
  "https://main.d2dizamdm6z6mx.amplifyapp.com/#activity-heading",
  "https://main.doypzbqgi42i5.amplifyapp.com/",
  "https://main.d1widrree9o9pg.amplifyapp.com/",
  "https://main.d31pi161pzjs90.amplifyapp.com/",
  "https://main.d3taplnh1srb2x.amplifyapp.com/",
  "https://main.d3g5iw52cz2dgy.amplifyapp.com/",
  "https://main.d1reuioo6kclr4.amplifyapp.com/",
  "https://chipguardai.com/",
  "https://www.cloudsprouts.com/",
] as const;

describe("FEATURED_PROJECTS", () => {
  it("contains exactly the requested featured projects", () => {
    expect(FEATURED_PROJECTS).toHaveLength(10);

    const ids = FEATURED_PROJECTS.map((project) => project.id);
    expect(ids.every((id, index) => ids.indexOf(id) === index)).toBe(true);
  });

  it("includes every provided live URL exactly once", () => {
    const liveUrls = FEATURED_PROJECTS.map((project) => project.liveUrl);

    for (const expectedLiveUrl of expectedLiveUrls) {
      expect(liveUrls.filter((liveUrl) => liveUrl === expectedLiveUrl)).toHaveLength(
        1,
      );
    }
  });

  it("keeps repository verification states precise", () => {
    const cloudSprouts = FEATURED_PROJECTS.find(
      (project) => project.id === "cloudsprouts",
    );
    expect(cloudSprouts?.repoLinks).toHaveLength(2);
    expect(
      cloudSprouts?.repoLinks.every((repoLink) => repoLink.status === "confirmed"),
    ).toBe(true);

    const unverifiedProjectIds = FEATURED_PROJECTS.filter((project) =>
      project.repoLinks.some((repoLink) => repoLink.status === "unverified"),
    ).map((project) => project.id);
    expect(unverifiedProjectIds).toEqual(["benfords-ledger", "ompkickbacks"]);

    const confirmedRepoLinks = FEATURED_PROJECTS.flatMap((project) =>
      project.repoLinks.filter((repoLink) => repoLink.status === "confirmed"),
    );
    expect(confirmedRepoLinks).toHaveLength(9);

    for (const repoLink of confirmedRepoLinks) {
      expect(repoLink.href).toMatch(/^https:\/\/github\.com\/TomBonness\//);
    }
  });
});
