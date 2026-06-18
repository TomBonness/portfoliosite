"use client";

import type React from "react";
import { useEffect, useRef } from "react";

type RevealDirection = "up" | "left" | "right";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
};

const revealOffsets: Record<RevealDirection, { x: string; y: string }> = {
  up: { x: "0px", y: "24px" },
  left: { x: "-42px", y: "0px" },
  right: { x: "42px", y: "0px" },
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  const offset = revealOffsets[direction];
  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-x": offset.x,
    "--reveal-y": offset.y,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={style}
      data-reveal-direction={direction}
    >
      {children}
    </div>
  );
}
