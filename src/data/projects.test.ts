import { describe, expect, it } from "vitest";
import { ALSO, CHAPTERS, PROFILE } from "./projects";

const projects = CHAPTERS.flatMap((chapter) => [chapter.feature, ...chapter.rest]);
const hrefs = [
  ...Object.values(PROFILE).filter((value) => value.startsWith("http")),
  ...[...projects, ...ALSO].flatMap((project) =>
    project.links.map((link) => link.href),
  ),
];

describe("portfolio content", () => {
  it("gives every chapter and project a unique anchor id", () => {
    const ids = [
      ...CHAPTERS.map((chapter) => chapter.id),
      ...projects.map((project) => project.id),
      ...ALSO.map((project) => project.id),
    ];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("links out over https only", () => {
    for (const href of hrefs) {
      expect(new URL(href).protocol).toBe("https:");
    }
  });

  it("links GitHub repositories on the owner's account only", () => {
    const githubLinks = hrefs.filter(
      (href) => new URL(href).hostname === "github.com",
    );
    expect(githubLinks.length).toBeGreaterThan(0);
    for (const href of githubLinks) {
      expect(href).toMatch(/^https:\/\/github\.com\/TomBonness(\/|$)/);
    }
  });

  it("explains every project that has nothing to link to", () => {
    for (const project of projects) {
      if (project.links.length === 0) {
        expect(project.note, project.id).toBeTruthy();
      }
    }
  });
});
