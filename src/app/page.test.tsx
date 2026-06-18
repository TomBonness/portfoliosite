import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

function expectRevealDirection(element: Element | null, direction: string) {
  expect(element).not.toBeNull();
  expect(element).toHaveAttribute("data-reveal-direction", direction);
}

describe("Home", () => {
  it("keeps the hero and applies lower-section reveal directions", () => {
    const { container } = render(<Home />);

    const heroTitle = container.querySelector("#hero-title");
    const heroText = Array.from(heroTitle?.querySelectorAll("span") ?? [])
      .map((span) => span.textContent)
      .join(" ");

    expect(heroText).toBe(
      "Systems, sensors, and mathematical worlds for the web.",
    );

    expectRevealDirection(
      screen
        .getByRole("heading", {
          level: 2,
          name: "Teaching through interfaces",
        })
        .closest(".reveal"),
      "left",
    );
    expectRevealDirection(
      screen.getByText("Crowd intelligence").closest(".reveal"),
      "left",
    );
    expectRevealDirection(
      screen.getByText("Mathematical intuition").closest(".reveal"),
      "right",
    );
    expectRevealDirection(
      screen.getByText("Cloud instrumentation").closest(".reveal"),
      "left",
    );

    expectRevealDirection(
      screen
        .getByRole("heading", { level: 2, name: "Stack" })
        .closest(".reveal"),
      "right",
    );
    expectRevealDirection(
      screen
        .getByRole("heading", { level: 3, name: "Frontend" })
        .closest(".reveal"),
      "right",
    );
    expectRevealDirection(
      screen
        .getByRole("heading", { level: 3, name: "Cloud / backend" })
        .closest(".reveal"),
      "left",
    );

    const footerLinks = container.querySelector(".reveal.footer-links");

    expectRevealDirection(footerLinks, "right");
  });
});
