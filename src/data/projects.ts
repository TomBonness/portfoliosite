export const PROJECT_CATEGORIES = [
  "Interactive math",
  "Cloud & data",
  "Systems & tools",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type RepoLink = {
  label: string;
  href?: string;
  status: "confirmed" | "unverified";
};
export type Project = {
  id: string;
  index: string;
  title: string;
  category: ProjectCategory;
  liveUrl?: string;
  repoLinks: readonly RepoLink[];
  stack: readonly string[];
  summary: string;
  teachingAngle: string;
};

export const FEATURED_PROJECTS = [
  {
    id: "jellybean-parliament",
    index: "01",
    title: "Jellybean Parliament",
    category: "Interactive math",
    liveUrl: "https://jellybeanparliament.com/",
    repoLinks: [
      {
        label: "GitHub",
        href: "https://github.com/TomBonness/jellybeanparliament",
        status: "confirmed",
      },
    ],
    stack: ["Next.js", "TypeScript", "Three.js", "AWS Amplify", "DynamoDB"],
    summary:
      "A weekly wisdom-of-crowds estimation experiment where visitors inspect a generated jar, submit one anonymous guess, and compare the crowd median and mean.",
    teachingAngle:
      "Turns noisy individual estimates into an inspectable lesson about median, mean, and collective judgment.",
  },
  {
    id: "word-finder",
    index: "02",
    title: "Word Finder",
    category: "Interactive math",
    liveUrl: "https://main.d2dizamdm6z6mx.amplifyapp.com/#activity-heading",
    repoLinks: [
      {
        label: "GitHub",
        href: "https://github.com/TomBonness/wordfinder",
        status: "confirmed",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Amplify Gen 2",
      "DynamoDB",
      "Wiktionary corpus",
    ],
    summary:
      "A public word-rediscovery archive that records first finds and rediscoveries from a finite Roman-script dictionary corpus.",
    teachingAngle:
      "Lets the Zipf-like curve emerge from visitor searches instead of forcing the distribution.",
  },
  {
    id: "montys-ballroom",
    index: "03",
    title: "Monty's Ballroom",
    category: "Interactive math",
    liveUrl: "https://main.doypzbqgi42i5.amplifyapp.com/",
    repoLinks: [
      {
        label: "GitHub",
        href: "https://github.com/TomBonness/montysballroom",
        status: "confirmed",
      },
    ],
    stack: ["React", "TypeScript", "Vite", "AWS Amplify", "DynamoDB"],
    summary:
      "A Monty Hall probability explainer that shows why the first pick stays small and the unopened switch door inherits the skipped probability mass.",
    teachingAngle:
      "Uses a 1,000-door setup and a scaled visual to make conditional probability feel physical.",
  },
  {
    id: "galton-decision-tree",
    index: "04",
    title: "Galton Decision-Tree",
    category: "Interactive math",
    liveUrl: "https://main.d1widrree9o9pg.amplifyapp.com/",
    repoLinks: [
      {
        label: "GitHub",
        href: "https://github.com/TomBonness/galthingsthesame",
        status: "confirmed",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "AWS Lambda",
      "API Gateway",
      "DynamoDB",
      "Central Limit Theorem",
    ],
    summary:
      "A human-in-the-loop Galton board where subjective choices aggregate into a bell curve under the Lindeberg-Feller Central Limit Theorem.",
    teachingAngle:
      "Connects personal choices to group-level mathematical certainty without hiding the mechanism.",
  },
  {
    id: "phyllotaxis",
    index: "05",
    title: "Phyllotaxis",
    category: "Interactive math",
    liveUrl: "https://main.d31pi161pzjs90.amplifyapp.com/",
    repoLinks: [
      {
        label: "GitHub",
        href: "https://github.com/TomBonness/deathandphyllotaxis",
        status: "confirmed",
      },
    ],
    stack: ["Next.js", "TypeScript", "Golden angle", "Visualization"],
    summary:
      "An interactive sandbox showing why the golden angle around 137.508 degrees produces efficient seed packing.",
    teachingAngle:
      "Turns continued fractions, irrationality, and visible packing gaps into one adjustable visual model.",
  },
  {
    id: "quadsite",
    index: "06",
    title: "Quadsite",
    category: "Systems & tools",
    liveUrl: "https://main.d3taplnh1srb2x.amplifyapp.com/",
    repoLinks: [
      {
        label: "GitHub",
        href: "https://github.com/TomBonness/quadsite",
        status: "confirmed",
      },
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Three.js",
      "TailwindCSS",
      "FPV simulation",
    ],
    summary:
      "A grid-aligned FPV quadcopter simulator with keyboard/gamepad controls, rate curves, telemetry, and calibration panels.",
    teachingAngle:
      "Makes low-latency flight control parameters visible instead of burying them in a settings menu.",
  },
  {
    id: "benfords-ledger",
    index: "07",
    title: "Benford's Ledger",
    category: "Interactive math",
    liveUrl: "https://main.d3g5iw52cz2dgy.amplifyapp.com/",
    repoLinks: [
      {
        label: "Repo not public yet",
        status: "unverified",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "SVG",
      "Benford's Law",
      "Forensic statistics",
    ],
    summary:
      "A white-collar crime simulator where visitors alter ledger rows and try to keep first-digit frequencies inside a Benford chi-square audit threshold.",
    teachingAngle:
      "Lets fraud detection fail or pass in front of the user instead of describing Benford's Law abstractly.",
  },
  {
    id: "ompkickbacks",
    index: "08",
    title: "OmpKickbacks",
    category: "Systems & tools",
    liveUrl: "https://main.d1reuioo6kclr4.amplifyapp.com/",
    repoLinks: [
      {
        label: "Repo not public yet",
        status: "unverified",
      },
    ],
    stack: ["Terminal agents", "CLI", "Ad ledger", "Privacy constraints"],
    summary:
      "A sponsored wait-state product for terminal agents where ads render only while CLI work is pending.",
    teachingAngle:
      "Explains a developer-tool monetization system through install, wrap, paid-impression, and privacy-ledger steps.",
  },
  {
    id: "chipguard",
    index: "09",
    title: "ChipGuard",
    category: "Cloud & data",
    liveUrl: "https://chipguardai.com/",
    repoLinks: [
      {
        label: "GitHub",
        href: "https://github.com/TomBonness/semiguard",
        status: "confirmed",
      },
    ],
    stack: [
      "PyTorch",
      "Flask",
      "Angular",
      "SQLite",
      "AWS Amplify",
      "EC2",
      "ALB",
      "Drift detection",
    ],
    summary:
      "A semiconductor defect prediction dashboard for UCI SECOM wafer fabrication data with API-backed prediction, drift, and history views.",
    teachingAngle:
      "Shows model confidence, pass/fail rates, and drift as operational signals instead of hiding them behind a single prediction.",
  },
  {
    id: "cloudsprouts",
    index: "10",
    title: "CloudSprouts",
    category: "Cloud & data",
    liveUrl: "https://www.cloudsprouts.com/",
    repoLinks: [
      {
        label: "IoT device repo",
        href: "https://github.com/TomBonness/cloudsprouts-IoT-device",
        status: "confirmed",
      },
      {
        label: "Dashboard repo",
        href: "https://github.com/TomBonness/cloudsprouts-dashboard",
        status: "confirmed",
      },
    ],
    stack: [
      "ESP32",
      "C",
      "ESP-IDF",
      "MQTT",
      "AWS IoT Core",
      "Lambda",
      "DynamoDB",
      "React",
      "Recharts",
      "Amplify",
    ],
    summary:
      "A full-stack garden sensor pipeline from ESP32 firmware through AWS IoT Core and DynamoDB to a responsive real-time dashboard.",
    teachingAngle:
      "Makes the embedded-to-cloud path legible from physical sensor readings to frontend charts.",
  },
  {
    id: "dontswitchmics",
    index: "11",
    title: "Don't Switch Mics",
    category: "Systems & tools",
    repoLinks: [
      {
        label: "GitHub",
        href: "https://github.com/TomBonness/dontswitchmics",
        status: "confirmed",
      },
    ],
    stack: [
      "Swift",
      "SwiftUI",
      "CoreAudio HAL",
      "macOS menu bar",
      "SMAppService",
      "UserDefaults",
      "CLI",
    ],
    summary:
      "A tiny macOS menu bar utility that watches the system default input device and restores the user-selected microphone when macOS or conferencing apps switch away.",
    teachingAngle:
      "Makes CoreAudio device identity, persistence, and one-shot enforcement legible through a menu bar app and deterministic CLI checks.",
  },
] satisfies readonly Project[];
