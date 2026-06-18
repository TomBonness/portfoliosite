"use client";

import { useEffect } from "react";

export function ScrollProgress() {
  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const root = document.documentElement;
      const scrollable = root.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      root.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span />
    </div>
  );
}
