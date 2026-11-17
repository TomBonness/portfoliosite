/** Path data from lucide (ISC), the one icon set used on the site. */
const PATHS = {
  "arrow-down": ["M12 5v14", "m19 12-7 7-7-7"],
  "arrow-up-right": ["M7 7h10v10", "M7 17 17 7"],
  check: ["M20 6 9 17l-5-5"],
  "chevron-right": ["m9 18 6-6-6-6"],
  "corner-down-left": ["M20 4v7a4 4 0 0 1-4 4H4", "m9 10-5 5 5 5"],
  mic: [
    "M12 19v3",
    "M19 10v2a7 7 0 0 1-14 0v-2",
    "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3",
  ],
} as const;

export type IconName = keyof typeof PATHS;

/** A line icon with a 1.75px stroke, in the color of the text around it. */
export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
