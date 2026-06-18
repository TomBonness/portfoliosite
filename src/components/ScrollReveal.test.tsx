import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollReveal } from "./ScrollReveal";

function getRevealWrapper(text: string) {
  const wrapper = screen.getByText(text).closest(".reveal");

  if (!(wrapper instanceof HTMLElement)) {
    throw new Error(`Missing reveal wrapper for ${text}`);
  }

  return wrapper;
}

describe("ScrollReveal", () => {
  it("emits custom properties for an explicit slide direction", () => {
    render(
      <ScrollReveal direction="left" delay={120}>
        slide child
      </ScrollReveal>,
    );

    const wrapper = getRevealWrapper("slide child");

    expect(wrapper).toHaveClass("reveal");
    expect(wrapper).toHaveAttribute("data-reveal-direction", "left");
    expect(wrapper?.style.getPropertyValue("--reveal-delay")).toBe("120ms");
    expect(wrapper?.style.getPropertyValue("--reveal-x")).toBe("-42px");
    expect(wrapper?.style.getPropertyValue("--reveal-y")).toBe("0px");
  });

  it("defaults to an upward reveal offset", () => {
    render(<ScrollReveal>default child</ScrollReveal>);

    const wrapper = getRevealWrapper("default child");

    expect(wrapper).toHaveAttribute("data-reveal-direction", "up");
    expect(wrapper?.style.getPropertyValue("--reveal-x")).toBe("0px");
    expect(wrapper?.style.getPropertyValue("--reveal-y")).toBe("24px");
  });
});
