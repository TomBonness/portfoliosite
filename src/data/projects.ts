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
  title: string;
  category: ProjectCategory;
  liveUrl?: string;
  repoLinks: readonly RepoLink[];
  stack: readonly string[];
  summary: string;
};

export const FEATURED_PROJECTS = [
  {
    id: "jellybean-parliament",
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
      "Guess how many jellybeans are in a generated jar, then see how your estimate compares with the crowd's mean and median.",
  },
  {
    id: "word-finder",
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
      "Search a finite dictionary and leave a record of the words you find, whether you're the first visitor or the hundredth.",
  },
  {
    id: "montys-ballroom",
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
      "Play Monty Hall with 1,000 doors and see why switching beats staying, even when your first choice feels like the right one.",
  },
  {
    id: "galton-decision-tree",
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
      "Make a series of choices on a human-powered Galton board and see how individual decisions add up to a bell curve.",
  },
  {
    id: "phyllotaxis",
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
      "Adjust the angle between seeds and watch spirals, gaps, and packing patterns emerge, including the familiar golden-angle arrangement found in plants.",
  },
  {
    id: "quadsite",
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
      "Fly an FPV quadcopter with a keyboard or gamepad, then adjust rate curves and calibration while keeping an eye on the flight telemetry.",
  },
  {
    id: "benfords-ledger",
    title: "Benford's Ledger",
    category: "Interactive math",
    liveUrl: "https://main.d3g5iw52cz2dgy.amplifyapp.com/",
    repoLinks: [
      {
        label: "Repo not public yet",
        status: "unverified",
      },
    ],
    stack: ["Next.js", "React", "SVG", "Benford's Law", "Forensic statistics"],
    summary:
      "Alter a ledger and try to slip past a statistical audit. Each change shifts the first-digit frequencies that Benford's Law helps examine.",
  },
  {
    id: "ompkickbacks",
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
      "A terminal-agent tool that shows sponsored messages only while CLI work is pending, with an ad ledger and explicit privacy constraints.",
  },
  {
    id: "chipguard",
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
      "Explore semiconductor defect predictions from the SECOM dataset, with dashboard views for model confidence, pass/fail rates, drift, and prediction history.",
  },
  {
    id: "cloudsprouts",
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
      "Follow garden sensor readings from an ESP32 through AWS IoT Core and DynamoDB to a live dashboard, connecting firmware, cloud services, and charts.",
  },
  {
    id: "dontswitchmics",
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
      "Choose your microphone once. This macOS menu bar utility restores it when the system or a conferencing app switches to another input.",
  },
] satisfies readonly Project[];

export const LAB_URL = "https://main.d1weoyfvphogxs.amplifyapp.com/";

export type LabProject = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  status: string;
  href: string;
  linkLabel: string;
};

export const LAB_PROJECTS = [
  {
    id: "open-micro",
    title: "Open Micro",
    summary:
      "A desktop controller concept for repeated actions: twelve keys, a dial, and touch, with planned lighting to show when background work needs your attention.",
    detail:
      "ZMK firmware and a local Rust bridge. Source available; hardware not ready to build.",
    status: "Concept in development",
    href: `${LAB_URL}products/open-micro`,
    linkLabel: "Explore the concept",
  },
  {
    id: "lavtype",
    title: "Lavtype",
    summary:
      "Hold a shortcut, speak, and release to type into the focused app. Speech recognition runs on your computer, without a cloud service or transcript history.",
    detail:
      "macOS 13+ and X11 Linux. Local Parakeet or supported on-device Apple Speech; MIT licensed.",
    status: "Available to download",
    href: `${LAB_URL}products/lavtype`,
    linkLabel: "Explore Lavtype",
  },
  {
    id: "inference",
    title: "1,000 TPS",
    summary:
      "Hosted GLM-5.3-Flash inference in development, aiming for 1,000 tokens per second. The access list is for invitations and launch updates, not immediate API access.",
    detail: "1,000 TPS is a target, not a measured serving result.",
    status: "In development · access list",
    href: `${LAB_URL}products/1000-tps`,
    linkLabel: "Explore the API plan",
  },
] satisfies readonly LabProject[];
