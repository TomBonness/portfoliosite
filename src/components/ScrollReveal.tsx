"use client";

import type React from "react";
import { useEffect, useRef } from "react";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      node.dataset.visible = "true";
      return;
    }

    node.dataset.visible = "false";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        node.dataset.visible = "true";
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const style = { "--reveal-delay": `${delay}ms` } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
