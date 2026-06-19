import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

  it("uses larger offsets for repeat reveals", () => {
    render(
      <ScrollReveal direction="left" repeat>
        repeat child
      </ScrollReveal>,
    );

    const wrapper = getRevealWrapper("repeat child");

    expect(wrapper).toHaveAttribute("data-reveal-repeat", "true");
    expect(wrapper?.style.getPropertyValue("--reveal-x")).toBe("-110px");
    expect(wrapper?.style.getPropertyValue("--reveal-y")).toBe("0px");
  });

  it("marks default reveals as non-repeat", () => {
    render(<ScrollReveal>non-repeat child</ScrollReveal>);

    const wrapper = getRevealWrapper("non-repeat child");

    expect(wrapper).toHaveAttribute("data-reveal-repeat", "false");
  });

  it("toggles visibility on re-entry when repeat is set", () => {
    let trigger: (entries: { isIntersecting: boolean }[]) => void = () => {};
    const disconnectObserver = vi.fn();

    class MockObserver {
      constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        trigger = callback;
      }

      observe = vi.fn();
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
      disconnect = disconnectObserver;
    }

    vi.stubGlobal("IntersectionObserver", MockObserver);

    render(
      <ScrollReveal direction="left" repeat>
        observed child
      </ScrollReveal>,
    );
    const wrapper = getRevealWrapper("observed child");

    expect(wrapper.dataset.visible).toBe("false");
    act(() => trigger([{ isIntersecting: true }]));
    expect(wrapper.dataset.visible).toBe("true");
    act(() => trigger([{ isIntersecting: false }]));
    expect(wrapper.dataset.visible).toBe("false");

    vi.unstubAllGlobals();
  });

  it("defaults to an upward reveal offset", () => {
    render(<ScrollReveal>default child</ScrollReveal>);

    const wrapper = getRevealWrapper("default child");

    expect(wrapper).toHaveAttribute("data-reveal-direction", "up");
    expect(wrapper?.style.getPropertyValue("--reveal-x")).toBe("0px");
    expect(wrapper?.style.getPropertyValue("--reveal-y")).toBe("24px");
  });
});
