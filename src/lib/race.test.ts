import { describe, expect, it } from "vitest";
import { createRace } from "./race";

const text = "name: ci\n\non:\n  push:\n    branches: [main]\n  pull_request:\n".repeat(20);
const lanes = [
  { name: "fast", rate: 290.3 },
  { name: "middle", rate: 201.8 },
  { name: "slow", rate: 73.1 },
];

describe("createRace", () => {
  it("ends when the fastest lane finishes, with the others at their share of its speed", () => {
    const race = createRace(text, lanes);
    const [fast, middle, slow] = race.frame(race.seconds);

    expect(fast.fraction).toBe(1);
    expect(fast.written).toBe(text);
    // Within two tokens of the exact ratio, whatever the text length.
    expect(middle.fraction).toBeCloseTo(201.8 / 290.3, 2);
    expect(slow.fraction).toBeCloseTo(73.1 / 290.3, 2);
    expect(text.startsWith(slow.written)).toBe(true);
  });

  it("clamps time to the race, so a late frame never runs past the finish", () => {
    const race = createRace(text, lanes);

    expect(race.frame(-1).map((lane) => lane.written)).toEqual(["", "", ""]);
    expect(race.frame(race.seconds * 10)).toEqual(race.frame(race.seconds));
  });

  it("writes whole tokens, in order, as time passes", () => {
    const race = createRace("alpha beta gamma", [{ name: "only", rate: 1 }]);
    const written = [0.5, 1, 2.5, 5].map((seconds) => race.frame(seconds)[0].written);

    expect(written).toEqual(["", "alpha", "alpha beta", "alpha beta gamma"]);
  });
});
