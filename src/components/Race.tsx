"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RACE_FILES, RACE_LANES, RACE_TEXT } from "@/data/race";
import { createRace } from "@/lib/race";
import { Icon } from "./Icon";

const race = createRace(RACE_TEXT, RACE_LANES);
const TAIL_LINES = 3;

/**
 * Three engines writing the same file at their measured speeds. The finished
 * race is what gets rendered on the server, so the comparison reads without
 * JavaScript; in the browser it replays once when it scrolls into view.
 */
export function Race() {
  const [elapsed, setElapsed] = useState(race.seconds);
  const figure = useRef<HTMLElement>(null);
  const frame = useRef(0);

  const play = useCallback(() => {
    cancelAnimationFrame(frame.current);
    let start: number | undefined;

    const tick = (now: number) => {
      start ??= now;
      const seconds = Math.min((now - start) / 1000, race.seconds);
      setElapsed(seconds);
      if (seconds < race.seconds) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const node = figure.current;
    if (
      !node ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let delay = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          delay = window.setTimeout(play, 600);
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(delay);
      cancelAnimationFrame(frame.current);
    };
  }, [play]);

  const frames = race.frame(elapsed);

  return (
    <figure className="race" ref={figure}>
      <div className="bench">
        <div className="bench-head">
          <span className="bench-file">{RACE_FILES}</span>
          <span className="bench-clock">{elapsed.toFixed(2)} s</span>
          <button
            className="bench-replay"
            type="button"
            onClick={play}
            disabled={elapsed < race.seconds}
            aria-label="Replay the race"
          >
            <Icon name="replay" />
          </button>
        </div>
        <ol className="lanes">
          {RACE_LANES.map((lane, index) => {
            const { fraction, written } = frames[index];

            return (
              <li className={index === 0 ? "lane is-lead" : "lane"} key={lane.name}>
                <div className="lane-head">
                  <span>{lane.name}</span>
                  <span className="lane-rate">{Math.round(lane.rate)} tok/s</span>
                </div>
                <div className="lane-tail" aria-hidden="true">
                  {written.split("\n").slice(-TAIL_LINES).join("\n")}
                  {fraction < 1 ? <span className="lane-cursor" /> : null}
                </div>
                <div className="lane-bar" aria-hidden="true">
                  <span style={{ transform: `scaleX(${fraction})` }} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption>
        Replayed at each engine’s measured rate on coding chats, one RTX 5090,
        and stopped when the first one finishes. llama.cpp ran without
        speculative decoding.
      </figcaption>
    </figure>
  );
}
