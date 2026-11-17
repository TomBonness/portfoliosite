/** Path data from lucide (ISC), the one icon set used on the site. */
const PATHS = {
  activity: [
    "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
  ],
  "arrow-down": ["M12 5v14", "m19 12-7 7-7-7"],
  "arrow-up-right": ["M7 7h10v10", "M7 17 17 7"],
  check: ["M20 6 9 17l-5-5"],
  "cloud-upload": [
    "M12 13v8",
    "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
    "m8 17 4-4 4 4",
  ],
  "key-round": [
    "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
    "M16.5 7.5h.01",
  ],
  "list-checks": [
    "M13 5h8",
    "M13 12h8",
    "M13 19h8",
    "m3 17 2 2 4-4",
    "m3 7 2 2 4-4",
  ],
  mic: [
    "M12 19v3",
    "M19 10v2a7 7 0 0 1-14 0v-2",
    "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3",
  ],
} as const;

export type IconName = keyof typeof PATHS;

/** A line icon with a 1.5px stroke, in the color of the text around it. */
export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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
