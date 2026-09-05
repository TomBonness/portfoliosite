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
});
