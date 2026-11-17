export type RaceLane = {
  name: string;
  /** Measured tokens per second. */
  rate: number;
};

export type RaceFrame = {
  /** Share of the text this lane has written, from 0 to 1. */
  fraction: number;
  written: string;
};

/**
 * Rough token boundaries: a word with its leading space, a run of digits, a
 * run of whitespace, or a single symbol. Close enough to a real tokenizer for
 * a replay, where only the relative speed of the lanes is being shown.
 */
const TOKEN = / ?[A-Za-z]+|\d+|\s+|[^\sA-Za-z\d]/g;

/**
 * A replay of several engines writing the same text, each at its own rate.
 * The race ends when the fastest lane has written everything, so the last
 * frame shows how far the others got in that time.
 */
export function createRace(text: string, lanes: readonly RaceLane[]) {
  const tokenEnds: number[] = [];
  let end = 0;
  for (const [token] of text.matchAll(TOKEN)) {
    end += token.length;
    tokenEnds.push(end);
  }

  const total = tokenEnds.length;
  const seconds = total / Math.max(...lanes.map((lane) => lane.rate));

  return {
    seconds,
    frame(elapsed: number): RaceFrame[] {
      const time = Math.min(Math.max(elapsed, 0), seconds);

      return lanes.map((lane) => {
        // The epsilon keeps the fastest lane from landing one token short.
        const tokens = Math.min(total, Math.floor(lane.rate * time + 1e-6));

        return {
          fraction: tokens / total,
          written: text.slice(0, tokens === 0 ? 0 : tokenEnds[tokens - 1]),
        };
      });
    },
  };
}
