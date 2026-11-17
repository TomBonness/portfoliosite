/** Path data from lucide (ISC), the one icon set used on the site. */
const PATHS = {
  "arrow-down": ["M12 5v14", "m19 12-7 7-7-7"],
  "arrow-up-right": ["M7 7h10v10", "M7 17 17 7"],
  check: ["M20 6 9 17l-5-5"],
  "chevron-down": ["m6 9 6 6 6-6"],
  replay: ["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", "M3 3v5h5"],
} as const;

/** A 16px line icon with a 1.5px stroke, in the color of the text around it. */
export function Icon({ name }: { name: keyof typeof PATHS }) {
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
